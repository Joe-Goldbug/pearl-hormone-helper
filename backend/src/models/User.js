const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  profile: {
    height: {
      type: Number, // in cm
      default: null
    },
    weight: {
      type: Number, // in kg
      default: null
    },
    medicalHistory: {
      type: String,
      default: ''
    },
    currentMedications: [{
      name: String,
      dosage: String,
      frequency: String
    }],
    allergies: [String],
    lifestyle: {
      exerciseFrequency: {
        type: String,
        enum: ['none', 'light', 'moderate', 'intense'],
        default: 'moderate'
      },
      sleepHours: {
        type: Number,
        default: 8
      },
      stressLevel: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        default: 'moderate'
      },
      smokingStatus: {
        type: String,
        enum: ['never', 'former', 'current'],
        default: 'never'
      },
      alcoholConsumption: {
        type: String,
        enum: ['none', 'occasional', 'moderate', 'frequent'],
        default: 'none'
      }
    }
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      reportReminders: {
        type: Boolean,
        default: true
      },
      aiInsights: {
        type: Boolean,
        default: true
      }
    },
    privacy: {
      shareDataForResearch: {
        type: Boolean,
        default: false
      },
      allowDataAnalytics: {
        type: Boolean,
        default: true
      }
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium', 'professional'],
      default: 'free'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for membership duration
userSchema.virtual('membershipDuration').get(function() {
  const now = new Date();
  const memberSince = new Date(this.memberSince);
  const diffTime = Math.abs(now - memberSince);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Method to get user's latest hormone report
userSchema.methods.getLatestReport = async function() {
  const Report = mongoose.model('Report');
  return await Report.findOne({ userId: this._id }).sort({ createdAt: -1 });
};

// Method to get user's report count
userSchema.methods.getReportCount = async function() {
  const Report = mongoose.model('Report');
  return await Report.countDocuments({ userId: this._id });
};

// Method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);