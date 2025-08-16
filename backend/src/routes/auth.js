const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { generateToken, generateRefreshToken, verifyRefreshToken, authenticateToken } = require('../middleware/auth');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth login
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const {
      sub: googleId,
      email,
      name,
      picture: avatar,
      email_verified
    } = payload;

    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: 'Email not verified with Google'
      });
    }

    // Find or create user
    let user = await User.findOne({ 
      $or: [
        { googleId },
        { email }
      ]
    });

    if (user) {
      // Update existing user
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (user.avatar !== avatar) {
        user.avatar = avatar;
      }
      if (user.name !== name) {
        user.name = name;
      }
      user.updateLastLogin();
      await user.save();
    } else {
      // Create new user
      user = new User({
        googleId,
        email,
        name,
        avatar,
        membership: {
          type: 'free',
          startDate: new Date()
        },
        preferences: {
          notifications: {
            email: true,
            push: true,
            reportReady: true,
            weeklyDigest: false
          },
          privacy: {
            shareAnonymousData: false,
            allowResearchParticipation: false
          },
          language: 'en',
          timezone: 'UTC'
        }
      });
      await user.save();
    }

    // Generate tokens
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Return user data and tokens
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          googleId: user.googleId,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          dateOfBirth: user.dateOfBirth,
          membership: user.membership,
          preferences: user.preferences,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: '7d'
        }
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    
    if (error.message.includes('Token used too late')) {
      return res.status(400).json({
        success: false,
        message: 'Google token has expired, please try again'
      });
    }
    
    if (error.message.includes('Invalid token')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google token'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
});

// Refresh access token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Check if user still exists
    const user = await User.findById(decoded.userId);
    if (!user || user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: 'User not found or account deactivated'
      });
    }

    // Generate new access token
    const newAccessToken = generateToken(user._id);
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        expiresIn: '7d'
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Token refresh failed',
      error: error.message
    });
  }
});

// Logout (invalidate tokens)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a production app, you might want to maintain a blacklist of invalidated tokens
    // For now, we'll just return success as the client should discard the tokens
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
});

// Verify token (check if current token is valid)
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-__v');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Token is valid',
      data: {
        user: {
          id: user._id,
          googleId: user.googleId,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          dateOfBirth: user.dateOfBirth,
          membership: user.membership,
          preferences: user.preferences,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        }
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Token verification failed',
      error: error.message
    });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-__v')
      .populate('recentReports', 'reportId title reportDate status aiAnalysis.overallScore');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user statistics
    const Report = require('../models/Report');
    const stats = await Report.aggregate([
      { $match: { userId: user._id } },
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
          }
        }
      }
    ]);

    const userStats = stats[0] || {
      totalReports: 0,
      analyzedReports: 0,
      avgScore: 0
    };

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          googleId: user.googleId,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          dateOfBirth: user.dateOfBirth,
          profile: user.profile,
          membership: user.membership,
          preferences: user.preferences,
          subscription: user.subscription,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt,
          age: user.age,
          membershipDuration: user.membershipDuration
        },
        stats: userStats
      }
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message
    });
  }
});

// Delete account (soft delete)
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const { confirmPassword } = req.body;
    
    // In a real app, you might want to verify password or require additional confirmation
    // For Google OAuth users, we'll just require explicit confirmation
    
    if (confirmPassword !== 'DELETE_MY_ACCOUNT') {
      return res.status(400).json({
        success: false,
        message: 'Please type "DELETE_MY_ACCOUNT" to confirm account deletion'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete - mark as deleted but keep data for potential recovery
    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();

    // You might also want to anonymize or delete user reports here
    // For now, we'll keep them for data integrity

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

module.exports = router;