const express = require('express');
const Report = require('../models/Report');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { validateReportUpdate } = require('../middleware/validation');

const router = express.Router();

// Get all user reports
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      page = 1, 
      limit = 10, 
      status, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      search
    } = req.query;

    // Build query
    const query = { userId };
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { reportId: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [reports, totalCount] = await Promise.all([
      Report.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('reportId title description reportDate status aiAnalysis.overallScore aiAnalysis.riskLevel uploadedFiles createdAt'),
      Report.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.json({
      success: true,
      data: {
        reports,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get reports',
      error: error.message
    });
  }
});

// Get specific report
router.get('/:reportId', authenticateToken, async (req, res) => {
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

    res.json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get report',
      error: error.message
    });
  }
});

// Update report metadata
router.put('/:reportId', authenticateToken, validateReportUpdate, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.userId;
    delete updateData.reportId;
    delete updateData.uploadedFiles;
    delete updateData.aiAnalysis;
    delete updateData.status;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const report = await Report.findOneAndUpdate(
      { reportId, userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: report
    });

  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: error.message
    });
  }
});

// Delete report
router.delete('/:reportId', authenticateToken, async (req, res) => {
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

    // Delete uploaded files
    const fs = require('fs');
    report.uploadedFiles.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      if (file.thumbnailPath && fs.existsSync(file.thumbnailPath)) {
        fs.unlinkSync(file.thumbnailPath);
      }
    });

    // Delete report from database
    await Report.findByIdAndDelete(report._id);

    res.json({
      success: true,
      message: 'Report deleted successfully'
    });

  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete report',
      error: error.message
    });
  }
});

// Get report statistics
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '6months' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '1month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case '3months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case '6months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case '1year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    }

    const stats = await Report.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalReports: { $sum: 1 },
          analyzedReports: {
            $sum: { $cond: [{ $eq: ['$status', 'analyzed'] }, 1, 0] }
          },
          avgScore: {
            $avg: {
              $cond: [
                { $eq: ['$status', 'analyzed'] },
                '$aiAnalysis.overallScore',
                null
              ]
            }
          },
          riskLevels: {
            $push: {
              $cond: [
                { $eq: ['$status', 'analyzed'] },
                '$aiAnalysis.riskLevel',
                null
              ]
            }
          },
          monthlyData: {
            $push: {
              month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
              score: {
                $cond: [
                  { $eq: ['$status', 'analyzed'] },
                  '$aiAnalysis.overallScore',
                  null
                ]
              }
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalReports: 0,
      analyzedReports: 0,
      avgScore: 0,
      riskLevels: [],
      monthlyData: []
    };

    // Process risk level distribution
    const riskDistribution = result.riskLevels
      .filter(level => level !== null)
      .reduce((acc, level) => {
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      }, {});

    // Process monthly trends
    const monthlyTrends = result.monthlyData
      .filter(item => item.score !== null)
      .reduce((acc, item) => {
        if (!acc[item.month]) {
          acc[item.month] = { scores: [], count: 0 };
        }
        acc[item.month].scores.push(item.score);
        acc[item.month].count++;
        return acc;
      }, {});

    const monthlyAvgScores = Object.entries(monthlyTrends).map(([month, data]) => ({
      month,
      avgScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
      reportCount: data.count
    }));

    res.json({
      success: true,
      data: {
        period,
        totalReports: result.totalReports,
        analyzedReports: result.analyzedReports,
        avgHealthScore: Math.round(result.avgScore || 0),
        riskDistribution,
        monthlyTrends: monthlyAvgScores.sort((a, b) => a.month.localeCompare(b.month))
      }
    });

  } catch (error) {
    console.error('Get report stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get report statistics',
      error: error.message
    });
  }
});

// Compare reports
router.post('/compare', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { reportIds } = req.body;

    if (!Array.isArray(reportIds) || reportIds.length < 2 || reportIds.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide 2-5 report IDs for comparison'
      });
    }

    const reports = await Report.find({
      reportId: { $in: reportIds },
      userId,
      status: 'analyzed'
    })
    .sort({ reportDate: 1 })
    .select('reportId title reportDate hormoneData aiAnalysis.overallScore aiAnalysis.riskLevel');

    if (reports.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'At least 2 analyzed reports are required for comparison'
      });
    }

    // Process comparison data
    const comparison = {
      reports: reports.map(report => ({
        reportId: report.reportId,
        title: report.title,
        reportDate: report.reportDate,
        overallScore: report.aiAnalysis.overallScore,
        riskLevel: report.aiAnalysis.riskLevel
      })),
      hormoneComparison: {},
      trends: {}
    };

    // Get all unique hormones across reports
    const allHormones = [...new Set(
      reports.flatMap(report => report.hormoneData.map(h => h.name))
    )];

    // Compare hormone values
    allHormones.forEach(hormoneName => {
      const hormoneData = reports.map(report => {
        const hormone = report.hormoneData.find(h => h.name === hormoneName);
        return {
          reportId: report.reportId,
          reportDate: report.reportDate,
          value: hormone ? hormone.value : null,
          status: hormone ? hormone.status : null,
          unit: hormone ? hormone.unit : null
        };
      }).filter(data => data.value !== null);

      if (hormoneData.length > 1) {
        const values = hormoneData.map(d => d.value);
        const firstValue = values[0];
        const lastValue = values[values.length - 1];
        const change = lastValue - firstValue;
        const percentChange = (change / firstValue) * 100;

        comparison.hormoneComparison[hormoneName] = {
          data: hormoneData,
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
          change: Math.round(change * 100) / 100,
          percentChange: Math.round(percentChange * 100) / 100,
          min: Math.min(...values),
          max: Math.max(...values)
        };
      }
    });

    // Calculate overall trends
    const scores = reports.map(r => r.aiAnalysis.overallScore);
    const scoreChange = scores[scores.length - 1] - scores[0];
    
    comparison.trends.overallScore = {
      trend: scoreChange > 0 ? 'improving' : scoreChange < 0 ? 'declining' : 'stable',
      change: scoreChange,
      percentChange: Math.round((scoreChange / scores[0]) * 100 * 100) / 100
    };

    res.json({
      success: true,
      data: comparison
    });

  } catch (error) {
    console.error('Compare reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to compare reports',
      error: error.message
    });
  }
});

// Export report data
router.get('/:reportId/export', authenticateToken, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;
    const { format = 'json' } = req.query;

    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const exportData = {
      reportInfo: {
        reportId: report.reportId,
        title: report.title,
        description: report.description,
        reportDate: report.reportDate,
        status: report.status
      },
      hormoneData: report.hormoneData,
      aiAnalysis: report.aiAnalysis,
      exportedAt: new Date(),
      exportedBy: userId
    };

    if (format === 'csv') {
      // Convert to CSV format
      const csvData = convertToCSV(exportData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${reportId}_export.csv"`);
      res.send(csvData);
    } else {
      // JSON format (default)
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${reportId}_export.json"`);
      res.json(exportData);
    }

  } catch (error) {
    console.error('Export report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export report',
      error: error.message
    });
  }
});

// Helper function to convert data to CSV
function convertToCSV(data) {
  const headers = ['Hormone', 'Value', 'Unit', 'Status', 'Reference Range'];
  const rows = data.hormoneData.map(hormone => [
    hormone.fullName,
    hormone.value,
    hormone.unit,
    hormone.status,
    hormone.referenceRange?.text || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  return csvContent;
}

module.exports = router;