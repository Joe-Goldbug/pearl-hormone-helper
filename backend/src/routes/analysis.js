const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Report = require('../models/Report');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { extractTextFromImage, extractTextFromPDF } = require('../services/textExtraction');
const { parseHormoneData } = require('../services/hormoneParser');
const { generateCharts } = require('../services/chartGenerator');

const router = express.Router();

// DeepSeek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

// Analyze uploaded report
router.post('/analyze/:reportId', authenticateToken, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;
    const startTime = Date.now();

    // Find the report
    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    if (report.status === 'processing') {
      return res.status(409).json({
        success: false,
        message: 'Report is already being processed'
      });
    }

    // Update status to processing
    report.status = 'processing';
    await report.save();

    try {
      // Step 1: Extract text from uploaded files
      let extractedText = '';
      
      for (const file of report.uploadedFiles) {
        try {
          let fileText = '';
          
          if (file.mimetype.startsWith('image/')) {
            fileText = await extractTextFromImage(file.path);
          } else if (file.mimetype === 'application/pdf') {
            fileText = await extractTextFromPDF(file.path);
          }
          
          extractedText += fileText + '\n\n';
        } catch (error) {
          console.error(`Error extracting text from ${file.originalName}:`, error);
          report.processingErrors.push({
            step: 'text_extraction',
            error: `Failed to extract text from ${file.originalName}: ${error.message}`
          });
        }
      }

      report.extractedText = extractedText;
      await report.save();

      // Step 2: Parse hormone data from extracted text
      const hormoneData = await parseHormoneData(extractedText);
      report.hormoneData = hormoneData;
      await report.save();

      // Step 3: Get AI analysis from DeepSeek
      const aiAnalysis = await getAIAnalysis(extractedText, hormoneData);
      
      // Step 4: Generate charts
      const charts = await generateCharts(hormoneData, userId);
      
      // Update report with analysis results
      report.aiAnalysis = {
        ...aiAnalysis,
        processedAt: new Date(),
        processingTime: Date.now() - startTime,
        aiModel: 'deepseek'
      };
      report.charts = charts;
      report.status = 'analyzed';
      
      await report.save();

      res.json({
        success: true,
        message: 'Analysis completed successfully',
        data: {
          reportId: report.reportId,
          status: report.status,
          hormoneData: report.hormoneData,
          aiAnalysis: report.aiAnalysis,
          charts: report.charts,
          processingTime: report.aiAnalysis.processingTime
        }
      });

    } catch (error) {
      console.error('Analysis error:', error);
      
      // Update report with error status
      report.status = 'error';
      report.processingErrors.push({
        step: 'analysis',
        error: error.message
      });
      await report.save();

      throw error;
    }

  } catch (error) {
    console.error('Analysis route error:', error);
    res.status(500).json({
      success: false,
      message: 'Analysis failed',
      error: error.message
    });
  }
});

// Get analysis results
router.get('/results/:reportId', authenticateToken, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;

    const report = await Report.findOne({ reportId, userId })
      .select('reportId status hormoneData aiAnalysis charts createdAt processingErrors');
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get analysis results',
      error: error.message
    });
  }
});

// Re-analyze report
router.post('/reanalyze/:reportId', authenticateToken, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;

    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Reset analysis data
    report.aiAnalysis = {
      overallScore: 0,
      riskLevel: 'low',
      summary: '',
      insights: [],
      confidence: 0
    };
    report.charts = {};
    report.status = 'uploaded';
    report.processingErrors = [];
    
    await report.save();

    // Redirect to analyze endpoint
    req.params.reportId = reportId;
    return router.handle(req, res);

  } catch (error) {
    console.error('Re-analyze error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to re-analyze report',
      error: error.message
    });
  }
});

// Get AI insights for specific hormone
router.get('/insights/:reportId/:hormoneName', authenticateToken, async (req, res) => {
  try {
    const { reportId, hormoneName } = req.params;
    const userId = req.user.id;

    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const hormone = report.getHormone(hormoneName);
    if (!hormone) {
      return res.status(404).json({
        success: false,
        message: 'Hormone not found in report'
      });
    }

    // Get specific insights for this hormone
    const hormoneInsights = await getHormoneSpecificInsights(hormone, report.aiAnalysis.insights);

    res.json({
      success: true,
      data: {
        hormone,
        insights: hormoneInsights,
        recommendations: hormoneInsights.flatMap(insight => insight.recommendations || [])
      }
    });

  } catch (error) {
    console.error('Hormone insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get hormone insights',
      error: error.message
    });
  }
});

// Helper function to get AI analysis from DeepSeek
async function getAIAnalysis(extractedText, hormoneData) {
  try {
    const prompt = createAnalysisPrompt(extractedText, hormoneData);
    
    const response = await axios.post(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a medical AI assistant specializing in hormone analysis. Provide professional, accurate, and helpful insights based on hormone test results. Always include disclaimers about consulting healthcare professionals.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content;
    return parseAIResponse(aiResponse, hormoneData);

  } catch (error) {
    console.error('DeepSeek API error:', error);
    
    // Fallback analysis if AI fails
    return {
      overallScore: calculateBasicScore(hormoneData),
      riskLevel: 'moderate',
      summary: 'Basic analysis completed. AI analysis temporarily unavailable.',
      insights: generateBasicInsights(hormoneData),
      confidence: 0.5
    };
  }
}

// Helper function to create analysis prompt
function createAnalysisPrompt(extractedText, hormoneData) {
  return `
Please analyze the following hormone test results and provide insights:

Extracted Text from Medical Report:
${extractedText}

Parsed Hormone Data:
${JSON.stringify(hormoneData, null, 2)}

Please provide:
1. Overall health score (0-100)
2. Risk level (low/moderate/high/critical)
3. Summary of findings
4. Specific insights and recommendations
5. Lifestyle suggestions

Format your response as JSON with the following structure:
{
  "overallScore": number,
  "riskLevel": "low|moderate|high|critical",
  "summary": "string",
  "insights": [
    {
      "type": "positive|warning|suggestion|lifestyle|medical",
      "title": "string",
      "description": "string",
      "severity": "low|medium|high|critical",
      "category": "hormone_balance|lifestyle|nutrition|exercise|medical_attention",
      "recommendations": [
        {
          "action": "string",
          "priority": "low|medium|high",
          "timeframe": "string"
        }
      ]
    }
  ],
  "confidence": number (0-1)
}

IMPORTANT: Always include a disclaimer that this is for informational purposes only and users should consult healthcare professionals.
  `;
}

// Helper function to parse AI response
function parseAIResponse(aiResponse, hormoneData) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        overallScore: Math.min(100, Math.max(0, parsed.overallScore || 50)),
        riskLevel: ['low', 'moderate', 'high', 'critical'].includes(parsed.riskLevel) ? parsed.riskLevel : 'moderate',
        summary: parsed.summary || 'Analysis completed',
        insights: Array.isArray(parsed.insights) ? parsed.insights : [],
        confidence: Math.min(1, Math.max(0, parsed.confidence || 0.7))
      };
    }
  } catch (error) {
    console.error('Error parsing AI response:', error);
  }
  
  // Fallback if parsing fails
  return {
    overallScore: calculateBasicScore(hormoneData),
    riskLevel: 'moderate',
    summary: aiResponse.substring(0, 500) + '...',
    insights: generateBasicInsights(hormoneData),
    confidence: 0.6
  };
}

// Helper function to calculate basic score
function calculateBasicScore(hormoneData) {
  if (!hormoneData || hormoneData.length === 0) return 50;
  
  const normalCount = hormoneData.filter(h => h.status === 'normal').length;
  return Math.round((normalCount / hormoneData.length) * 100);
}

// Helper function to generate basic insights
function generateBasicInsights(hormoneData) {
  const insights = [];
  
  const abnormalHormones = hormoneData.filter(h => h.status !== 'normal');
  
  if (abnormalHormones.length === 0) {
    insights.push({
      type: 'positive',
      title: 'Hormone Levels Normal',
      description: 'All tested hormone levels are within normal ranges.',
      severity: 'low',
      category: 'hormone_balance',
      recommendations: [{
        action: 'Continue current lifestyle and regular monitoring',
        priority: 'low',
        timeframe: 'ongoing'
      }]
    });
  } else {
    abnormalHormones.forEach(hormone => {
      insights.push({
        type: 'warning',
        title: `${hormone.fullName} ${hormone.status}`,
        description: `${hormone.fullName} level is ${hormone.status}. Consider consulting with a healthcare provider.`,
        severity: hormone.status === 'critical' ? 'high' : 'medium',
        category: 'medical_attention',
        recommendations: [{
          action: 'Consult with healthcare provider',
          priority: 'high',
          timeframe: 'within 1-2 weeks'
        }]
      });
    });
  }
  
  return insights;
}

// Helper function to get hormone-specific insights
function getHormoneSpecificInsights(hormone, allInsights) {
  return allInsights.filter(insight => 
    insight.title.toLowerCase().includes(hormone.name.toLowerCase()) ||
    insight.title.toLowerCase().includes(hormone.fullName.toLowerCase()) ||
    insight.description.toLowerCase().includes(hormone.name.toLowerCase()) ||
    insight.description.toLowerCase().includes(hormone.fullName.toLowerCase())
  );
}

module.exports = router;