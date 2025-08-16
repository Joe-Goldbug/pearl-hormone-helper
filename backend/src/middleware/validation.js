const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// User profile validation
const validateUserProfile = [
  body('name')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid date')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        throw new Error('Age must be between 13 and 120 years');
      }
      return true;
    }),
  
  body('profile.height')
    .optional()
    .isFloat({ min: 50, max: 300 })
    .withMessage('Height must be between 50 and 300 cm'),
  
  body('profile.weight')
    .optional()
    .isFloat({ min: 20, max: 500 })
    .withMessage('Weight must be between 20 and 500 kg'),
  
  body('profile.medicalHistory')
    .optional()
    .isArray()
    .withMessage('Medical history must be an array'),
  
  body('profile.medicalHistory.*')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Each medical history item must be between 1 and 200 characters'),
  
  body('profile.currentMedications')
    .optional()
    .isArray()
    .withMessage('Current medications must be an array'),
  
  body('profile.allergies')
    .optional()
    .isArray()
    .withMessage('Allergies must be an array'),
  
  body('profile.lifestyle.smokingStatus')
    .optional()
    .isIn(['never', 'former', 'current'])
    .withMessage('Smoking status must be never, former, or current'),
  
  body('profile.lifestyle.alcoholConsumption')
    .optional()
    .isIn(['none', 'light', 'moderate', 'heavy'])
    .withMessage('Alcohol consumption must be none, light, moderate, or heavy'),
  
  body('profile.lifestyle.exerciseFrequency')
    .optional()
    .isIn(['none', 'light', 'moderate', 'heavy'])
    .withMessage('Exercise frequency must be none, light, moderate, or heavy'),
  
  body('profile.lifestyle.sleepHours')
    .optional()
    .isFloat({ min: 0, max: 24 })
    .withMessage('Sleep hours must be between 0 and 24'),
  
  handleValidationErrors
];

// Report update validation
const validateReportUpdate = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  
  body('reportDate')
    .optional()
    .isISO8601()
    .withMessage('Report date must be a valid date')
    .custom((value) => {
      const reportDate = new Date(value);
      const today = new Date();
      if (reportDate > today) {
        throw new Error('Report date cannot be in the future');
      }
      return true;
    }),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each tag must be between 1 and 50 characters'),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean'),
  
  handleValidationErrors
];

// User preferences validation
const validateUserPreferences = [
  body('notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notifications must be a boolean'),
  
  body('notifications.push')
    .optional()
    .isBoolean()
    .withMessage('Push notifications must be a boolean'),
  
  body('notifications.reportReady')
    .optional()
    .isBoolean()
    .withMessage('Report ready notifications must be a boolean'),
  
  body('notifications.weeklyDigest')
    .optional()
    .isBoolean()
    .withMessage('Weekly digest notifications must be a boolean'),
  
  body('privacy.shareAnonymousData')
    .optional()
    .isBoolean()
    .withMessage('Share anonymous data must be a boolean'),
  
  body('privacy.allowResearchParticipation')
    .optional()
    .isBoolean()
    .withMessage('Allow research participation must be a boolean'),
  
  body('language')
    .optional()
    .isIn(['en', 'zh', 'es', 'fr', 'de', 'ja'])
    .withMessage('Language must be a supported language code'),
  
  body('timezone')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Timezone must be a valid timezone string'),
  
  handleValidationErrors
];

// File upload validation
const validateFileUpload = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }

  // Check file types and sizes
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxTotalSize = 50 * 1024 * 1024; // 50MB

  let totalSize = 0;
  const invalidFiles = [];

  for (const file of req.files) {
    totalSize += file.size;

    if (!allowedTypes.includes(file.mimetype)) {
      invalidFiles.push({
        filename: file.originalname,
        error: 'Invalid file type'
      });
    }

    if (file.size > maxFileSize) {
      invalidFiles.push({
        filename: file.originalname,
        error: 'File too large (max 10MB)'
      });
    }
  }

  if (totalSize > maxTotalSize) {
    return res.status(400).json({
      success: false,
      message: 'Total file size exceeds limit (max 50MB)'
    });
  }

  if (invalidFiles.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid files detected',
      invalidFiles
    });
  }

  next();
};

// Report ID validation
const validateReportId = [
  param('reportId')
    .isLength({ min: 1 })
    .withMessage('Report ID is required')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Report ID contains invalid characters'),
  
  handleValidationErrors
];

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'reportDate', 'title', 'status'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  handleValidationErrors
];

// Search validation
const validateSearch = [
  query('search')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
    .escape(), // Sanitize search input
  
  handleValidationErrors
];

// Date range validation
const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (req.query.startDate && value) {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(value);
        if (endDate <= startDate) {
          throw new Error('End date must be after start date');
        }
      }
      return true;
    }),
  
  handleValidationErrors
];

// Analysis request validation
const validateAnalysisRequest = [
  body('reportId')
    .isLength({ min: 1 })
    .withMessage('Report ID is required'),
  
  body('options.includeCharts')
    .optional()
    .isBoolean()
    .withMessage('Include charts must be a boolean'),
  
  body('options.detailedAnalysis')
    .optional()
    .isBoolean()
    .withMessage('Detailed analysis must be a boolean'),
  
  body('options.compareWithPrevious')
    .optional()
    .isBoolean()
    .withMessage('Compare with previous must be a boolean'),
  
  handleValidationErrors
];

// Report comparison validation
const validateReportComparison = [
  body('reportIds')
    .isArray({ min: 2, max: 5 })
    .withMessage('Must provide 2-5 report IDs for comparison'),
  
  body('reportIds.*')
    .isLength({ min: 1 })
    .withMessage('Each report ID must be valid'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserProfile,
  validateReportUpdate,
  validateUserPreferences,
  validateFileUpload,
  validateReportId,
  validatePagination,
  validateSearch,
  validateDateRange,
  validateAnalysisRequest,
  validateReportComparison
};