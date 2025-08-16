const mongoose = require('mongoose');

const hormoneDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  referenceRange: {
    min: Number,
    max: Number,
    text: String // e.g., "5.0-25.0"
  },
  status: {
    type: String,
    enum: ['normal', 'high', 'low', 'critical'],
    required: true
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
    default: 'stable'
  },
  change: {
    type: Number,
    default: 0
  }
});

const aiInsightSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['positive', 'warning', 'suggestion', 'lifestyle', 'medical'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['hormone_balance', 'lifestyle', 'nutrition', 'exercise', 'medical_attention'],
    required: true
  },
  recommendations: [{
    action: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    timeframe: String // e.g., "within 1 week", "ongoing"
  }]
});

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  reportDate: {
    type: Date,
    required: true
  },
  uploadedFiles: [{
    originalName: String,
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  extractedText: {
    type: String,
    default: ''
  },
  hormoneData: [hormoneDataSchema],
  aiAnalysis: {
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    riskLevel: {
      type: String,
      enum: ['low', 'moderate', 'high', 'critical'],
      default: 'low'
    },
    summary: {
      type: String,
      default: ''
    },
    insights: [aiInsightSchema],
    processedAt: {
      type: Date,
      default: Date.now
    },
    processingTime: {
      type: Number, // in milliseconds
      default: 0
    },
    aiModel: {
      type: String,
      default: 'deepseek'
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0
    }
  },
  charts: {
    trendChart: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    comparisonChart: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    distributionChart: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'analyzed', 'error'],
    default: 'uploaded'
  },
  processingErrors: [{
    step: String,
    error: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    labName: String,
    doctorName: String,
    testType: String,
    fastingStatus: Boolean,
    menstrualCycleDay: Number,
    notes: String
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String],
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Indexes for better query performance
reportSchema.index({ userId: 1, createdAt: -1 });
reportSchema.index({ reportId: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ reportDate: -1 });
reportSchema.index({ 'aiAnalysis.overallScore': -1 });

// Virtual for report age
reportSchema.virtual('age').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Method to get hormone by name
reportSchema.methods.getHormone = function(hormoneName) {
  return this.hormoneData.find(h => h.name === hormoneName || h.fullName === hormoneName);
};

// Method to get insights by category
reportSchema.methods.getInsightsByCategory = function(category) {
  return this.aiAnalysis.insights.filter(insight => insight.category === category);
};

// Method to get high priority recommendations
reportSchema.methods.getHighPriorityRecommendations = function() {
  const recommendations = [];
  this.aiAnalysis.insights.forEach(insight => {
    insight.recommendations.forEach(rec => {
      if (rec.priority === 'high') {
        recommendations.push({
          ...rec,
          insightTitle: insight.title,
          category: insight.category
        });
      }
    });
  });
  return recommendations;
};

// Static method to get user's report statistics
reportSchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalReports: { $sum: 1 },
        avgScore: { $avg: '$aiAnalysis.overallScore' },
        latestReport: { $max: '$createdAt' },
        statusCounts: {
          $push: '$status'
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalReports: 0,
    avgScore: 0,
    latestReport: null,
    statusCounts: []
  };
};

// Pre-save middleware to generate reportId
reportSchema.pre('save', function(next) {
  if (!this.reportId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.reportId = `RPT-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Report', reportSchema);