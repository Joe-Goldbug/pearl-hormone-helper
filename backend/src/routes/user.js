const express = require('express');
const User = require('../models/User');
const Report = require('../models/Report');
const { authenticateToken } = require('../middleware/auth');
const { validateUserUpdate } = require('../middleware/validation');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user statistics
    const stats = await Report.getUserStats(userId);
    
    res.json({
      success: true,
      data: {
        ...user.toObject(),
        age: user.age,
        membershipDuration: user.membershipDuration,
        stats
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateUserUpdate, async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.googleId;
    delete updateData.email;
    delete updateData.memberSince;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user basic info
    const user = await User.findById(userId).select('name email avatar memberSince subscription');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get recent reports
    const recentReports = await Report.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('reportId title reportDate status aiAnalysis.overallScore createdAt');

    // Get latest hormone data
    const latestReport = await Report.findOne({ userId, status: 'analyzed' })
      .sort({ createdAt: -1 })
      .select('hormoneData aiAnalysis reportDate');

    // Calculate statistics
    const totalReports = await Report.countDocuments({ userId });
    const analyzedReports = await Report.countDocuments({ userId, status: 'analyzed' });
    
    // Calculate average health score
    const scoreAggregation = await Report.aggregate([
      { $match: { userId: user._id, status: 'analyzed' } },
      { $group: { _id: null, avgScore: { $avg: '$aiAnalysis.overallScore' } } }
    ]);
    const avgHealthScore = scoreAggregation.length > 0 ? Math.round(scoreAggregation[0].avgScore) : 0;

    // Get trend data for charts
    const trendData = await Report.find({ userId, status: 'analyzed' })
      .sort({ reportDate: 1 })
      .select('reportDate hormoneData aiAnalysis.overallScore')
      .limit(12); // Last 12 reports for trend

    res.json({
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          memberSince: user.memberSince,
          subscription: user.subscription
        },
        statistics: {
          totalReports,
          analyzedReports,
          avgHealthScore,
          lastUpdate: latestReport ? latestReport.reportDate : null
        },
        recentReports,
        latestHormoneData: latestReport ? latestReport.hormoneData : [],
        latestInsights: latestReport ? latestReport.aiAnalysis.insights : [],
        trendData: trendData.map(report => ({
          date: report.reportDate,
          score: report.aiAnalysis.overallScore,
          hormones: report.hormoneData.reduce((acc, hormone) => {
            acc[hormone.name] = hormone.value;
            return acc;
          }, {})
        }))
      }
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard data',
      error: error.message
    });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { preferences } },
      { new: true, runValidators: true }
    ).select('preferences');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: user.preferences
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: error.message
    });
  }
});

// Get user's hormone trends
router.get('/trends', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '6months', hormone } = req.query;

    // Calculate date range based on period
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

    const reports = await Report.find({
      userId,
      status: 'analyzed',
      reportDate: { $gte: startDate }
    })
    .sort({ reportDate: 1 })
    .select('reportDate hormoneData aiAnalysis.overallScore');

    // Process trend data
    const trendData = reports.map(report => {
      const dataPoint = {
        date: report.reportDate,
        overallScore: report.aiAnalysis.overallScore
      };

      // Add hormone values
      report.hormoneData.forEach(h => {
        dataPoint[h.name] = h.value;
      });

      return dataPoint;
    });

    // Calculate trends for each hormone
    const hormoneStats = {};
    if (reports.length > 1) {
      const allHormones = [...new Set(reports.flatMap(r => r.hormoneData.map(h => h.name)))];
      
      allHormones.forEach(hormoneName => {
        const values = reports
          .map(r => r.hormoneData.find(h => h.name === hormoneName)?.value)
          .filter(v => v !== undefined);
        
        if (values.length > 1) {
          const firstValue = values[0];
          const lastValue = values[values.length - 1];
          const change = lastValue - firstValue;
          const percentChange = (change / firstValue) * 100;
          
          hormoneStats[hormoneName] = {
            trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
            change: change,
            percentChange: Math.round(percentChange * 100) / 100,
            min: Math.min(...values),
            max: Math.max(...values),
            avg: Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100
          };
        }
      });
    }

    res.json({
      success: true,
      data: {
        period,
        startDate,
        endDate: now,
        trendData,
        hormoneStats,
        totalReports: reports.length
      }
    });

  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trend data',
      error: error.message
    });
  }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { confirmEmail } = req.body;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify email confirmation
    if (confirmEmail !== user.email) {
      return res.status(400).json({
        success: false,
        message: 'Email confirmation does not match'
      });
    }

    // Soft delete - mark as inactive instead of hard delete
    await User.findByIdAndUpdate(userId, { 
      isActive: false,
      email: `deleted_${Date.now()}_${user.email}` // Prevent email conflicts
    });

    // Also mark all reports as inactive
    await Report.updateMany(
      { userId },
      { $set: { isPublic: false } }
    );

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account',
      error: error.message
    });
  }
});

// Export user data (GDPR compliance)
router.get('/export', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    const reports = await Report.find({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const exportData = {
      user: user.toObject(),
      reports: reports.map(report => report.toObject()),
      exportedAt: new Date(),
      version: '1.0'
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="pearl_data_export_${userId}_${Date.now()}.json"`);
    
    res.json(exportData);

  } catch (error) {
    console.error('Export data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export data',
      error: error.message
    });
  }
});

module.exports = router;