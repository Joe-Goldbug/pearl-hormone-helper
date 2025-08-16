const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

// Generate unique file ID
const generateFileId = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Generate report ID
const generateReportId = () => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `RPT_${timestamp}_${random}`.toUpperCase();
};

// Ensure directory exists
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Get file extension
const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

// Get MIME type from extension
const getMimeType = (extension) => {
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  return mimeTypes[extension] || 'application/octet-stream';
};

// Check if file is an image
const isImageFile = (mimetype) => {
  return mimetype.startsWith('image/');
};

// Check if file is a document
const isDocumentFile = (mimetype) => {
  const documentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  return documentTypes.includes(mimetype);
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Generate thumbnail for images
const generateThumbnail = async (inputPath, outputPath, options = {}) => {
  try {
    const { width = 300, height = 300, quality = 80 } = options;
    
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality })
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('Thumbnail generation failed:', error);
    throw new Error('Failed to generate thumbnail');
  }
};

// Extract text from PDF
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF text extraction failed:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

// Extract text from Word document
const extractTextFromWord = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error('Word text extraction failed:', error);
    throw new Error('Failed to extract text from Word document');
  }
};

// Extract text from file based on type
const extractTextFromFile = async (filePath, mimetype) => {
  try {
    switch (mimetype) {
      case 'application/pdf':
        return await extractTextFromPDF(filePath);
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return await extractTextFromWord(filePath);
      default:
        throw new Error(`Text extraction not supported for ${mimetype}`);
    }
  } catch (error) {
    console.error('Text extraction failed:', error);
    return null;
  }
};

// Clean up temporary files
const cleanupFiles = (filePaths) => {
  filePaths.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error(`Failed to delete file ${filePath}:`, error);
    }
  });
};

// Validate hormone data
const validateHormoneData = (hormoneData) => {
  if (!Array.isArray(hormoneData)) {
    return { valid: false, error: 'Hormone data must be an array' };
  }

  for (const hormone of hormoneData) {
    if (!hormone.name || typeof hormone.name !== 'string') {
      return { valid: false, error: 'Each hormone must have a valid name' };
    }
    
    if (hormone.value === undefined || hormone.value === null) {
      return { valid: false, error: `Hormone ${hormone.name} must have a value` };
    }
    
    if (typeof hormone.value !== 'number' || isNaN(hormone.value)) {
      return { valid: false, error: `Hormone ${hormone.name} value must be a valid number` };
    }
    
    if (!hormone.unit || typeof hormone.unit !== 'string') {
      return { valid: false, error: `Hormone ${hormone.name} must have a valid unit` };
    }
  }

  return { valid: true };
};

// Normalize hormone name
const normalizeHormoneName = (name) => {
  const hormoneMap = {
    'estradiol': 'E2',
    'e2': 'E2',
    'estrogen': 'E2',
    'testosterone': 'Testosterone',
    'test': 'Testosterone',
    'testo': 'Testosterone',
    'progesterone': 'Progesterone',
    'prog': 'Progesterone',
    'lh': 'LH',
    'luteinizing hormone': 'LH',
    'fsh': 'FSH',
    'follicle stimulating hormone': 'FSH',
    'prolactin': 'Prolactin',
    'prl': 'Prolactin',
    'thyroid stimulating hormone': 'TSH',
    'tsh': 'TSH',
    'free t4': 'Free T4',
    'ft4': 'Free T4',
    'free t3': 'Free T3',
    'ft3': 'Free T3',
    'cortisol': 'Cortisol',
    'dhea-s': 'DHEA-S',
    'dheas': 'DHEA-S',
    'insulin': 'Insulin',
    'glucose': 'Glucose',
    'hba1c': 'HbA1c',
    'vitamin d': 'Vitamin D',
    'vit d': 'Vitamin D',
    '25-oh vitamin d': 'Vitamin D'
  };
  
  const normalized = name.toLowerCase().trim();
  return hormoneMap[normalized] || name;
};

// Calculate hormone status
const calculateHormoneStatus = (value, referenceRange) => {
  if (!referenceRange || !referenceRange.min || !referenceRange.max) {
    return 'unknown';
  }
  
  if (value < referenceRange.min) {
    return 'low';
  } else if (value > referenceRange.max) {
    return 'high';
  } else {
    return 'normal';
  }
};

// Get hormone reference ranges (basic implementation)
const getHormoneReferenceRange = (hormoneName, unit, gender = 'female', age = 30) => {
  // This is a simplified implementation
  // In a real application, you'd have a comprehensive database of reference ranges
  const ranges = {
    'E2': {
      'pg/mL': { min: 30, max: 400 },
      'pmol/L': { min: 110, max: 1468 }
    },
    'Testosterone': {
      'ng/dL': gender === 'female' ? { min: 15, max: 70 } : { min: 300, max: 1000 },
      'nmol/L': gender === 'female' ? { min: 0.5, max: 2.4 } : { min: 10.4, max: 34.7 }
    },
    'Progesterone': {
      'ng/mL': { min: 0.2, max: 25 },
      'nmol/L': { min: 0.6, max: 79.5 }
    },
    'LH': {
      'mIU/mL': { min: 2.4, max: 12.6 },
      'IU/L': { min: 2.4, max: 12.6 }
    },
    'FSH': {
      'mIU/mL': { min: 3.5, max: 12.5 },
      'IU/L': { min: 3.5, max: 12.5 }
    },
    'TSH': {
      'mIU/L': { min: 0.27, max: 4.2 },
      'μIU/mL': { min: 0.27, max: 4.2 }
    },
    'Free T4': {
      'ng/dL': { min: 0.93, max: 1.7 },
      'pmol/L': { min: 12, max: 22 }
    },
    'Prolactin': {
      'ng/mL': { min: 4.8, max: 23.3 },
      'μg/L': { min: 4.8, max: 23.3 }
    }
  };
  
  return ranges[hormoneName]?.[unit] || null;
};

// Sanitize filename
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
};

// Generate secure random string
const generateSecureRandom = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Hash string using SHA-256
const hashString = (str) => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format date for display
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    default:
      return d.toISOString().split('T')[0];
  }
};

// Calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Sleep utility for delays
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Retry function with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await sleep(delay);
    }
  }
};

module.exports = {
  generateFileId,
  generateReportId,
  ensureDirectoryExists,
  getFileExtension,
  getMimeType,
  isImageFile,
  isDocumentFile,
  formatFileSize,
  generateThumbnail,
  extractTextFromFile,
  cleanupFiles,
  validateHormoneData,
  normalizeHormoneName,
  calculateHormoneStatus,
  getHormoneReferenceRange,
  sanitizeFilename,
  generateSecureRandom,
  hashString,
  isValidEmail,
  formatDate,
  calculateAge,
  sleep,
  retryWithBackoff
};