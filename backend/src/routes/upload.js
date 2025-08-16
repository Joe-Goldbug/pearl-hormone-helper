const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const Report = require('../models/Report');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { validateUpload } = require('../middleware/validation');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(uploadDir, req.user.id);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, WebP) and documents (PDF, DOC, DOCX) are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
    files: 5 // Maximum 5 files per upload
  }
});

// Upload endpoint
router.post('/', authenticateToken, upload.array('files', 5), validateUpload, async (req, res) => {
  try {
    const { title, description, reportDate, metadata } = req.body;
    const userId = req.user.id;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    // Process uploaded files
    const uploadedFiles = [];
    
    for (const file of req.files) {
      let processedFile = {
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        uploadedAt: new Date()
      };

      // If it's an image, create a thumbnail
      if (file.mimetype.startsWith('image/')) {
        try {
          const thumbnailPath = path.join(path.dirname(file.path), `thumb_${file.filename}`);
          await sharp(file.path)
            .resize(300, 300, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toFile(thumbnailPath);
          
          processedFile.thumbnailPath = thumbnailPath;
        } catch (error) {
          console.error('Error creating thumbnail:', error);
        }
      }

      uploadedFiles.push(processedFile);
    }

    // Create new report
    const report = new Report({
      userId,
      title: title || 'Medical Report',
      description: description || '',
      reportDate: reportDate ? new Date(reportDate) : new Date(),
      uploadedFiles,
      metadata: metadata ? JSON.parse(metadata) : {},
      status: 'uploaded'
    });

    await report.save();

    // Update user's last activity
    await User.findByIdAndUpdate(userId, { lastLogin: new Date() });

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      data: {
        reportId: report.reportId,
        _id: report._id,
        filesUploaded: uploadedFiles.length,
        status: report.status
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// Get upload progress (for large files)
router.get('/progress/:reportId', authenticateToken, async (req, res) => {
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
      data: {
        reportId: report.reportId,
        status: report.status,
        filesCount: report.uploadedFiles.length,
        createdAt: report.createdAt,
        processingErrors: report.processingErrors
      }
    });

  } catch (error) {
    console.error('Progress check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check progress',
      error: error.message
    });
  }
});

// Delete uploaded file
router.delete('/file/:reportId/:fileIndex', authenticateToken, async (req, res) => {
  try {
    const { reportId, fileIndex } = req.params;
    const userId = req.user.id;

    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const fileIndexNum = parseInt(fileIndex);
    if (fileIndexNum < 0 || fileIndexNum >= report.uploadedFiles.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file index'
      });
    }

    const fileToDelete = report.uploadedFiles[fileIndexNum];
    
    // Delete physical file
    if (fs.existsSync(fileToDelete.path)) {
      fs.unlinkSync(fileToDelete.path);
    }
    
    // Delete thumbnail if exists
    if (fileToDelete.thumbnailPath && fs.existsSync(fileToDelete.thumbnailPath)) {
      fs.unlinkSync(fileToDelete.thumbnailPath);
    }

    // Remove from database
    report.uploadedFiles.splice(fileIndexNum, 1);
    await report.save();

    res.json({
      success: true,
      message: 'File deleted successfully',
      data: {
        remainingFiles: report.uploadedFiles.length
      }
    });

  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message
    });
  }
});

// Get file info
router.get('/file/:reportId/:fileIndex', authenticateToken, async (req, res) => {
  try {
    const { reportId, fileIndex } = req.params;
    const userId = req.user.id;

    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const fileIndexNum = parseInt(fileIndex);
    if (fileIndexNum < 0 || fileIndexNum >= report.uploadedFiles.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file index'
      });
    }

    const file = report.uploadedFiles[fileIndexNum];
    
    res.json({
      success: true,
      data: {
        originalName: file.originalName,
        mimetype: file.mimetype,
        size: file.size,
        uploadedAt: file.uploadedAt,
        downloadUrl: `/api/upload/download/${reportId}/${fileIndex}`,
        thumbnailUrl: file.thumbnailPath ? `/api/upload/thumbnail/${reportId}/${fileIndex}` : null
      }
    });

  } catch (error) {
    console.error('File info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get file info',
      error: error.message
    });
  }
});

// Download file
router.get('/download/:reportId/:fileIndex', authenticateToken, async (req, res) => {
  try {
    const { reportId, fileIndex } = req.params;
    const userId = req.user.id;

    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const fileIndexNum = parseInt(fileIndex);
    if (fileIndexNum < 0 || fileIndexNum >= report.uploadedFiles.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file index'
      });
    }

    const file = report.uploadedFiles[fileIndexNum];
    
    if (!fs.existsSync(file.path)) {
      return res.status(404).json({
        success: false,
        message: 'File not found on disk'
      });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Type', file.mimetype);
    
    const fileStream = fs.createReadStream(file.path);
    fileStream.pipe(res);

  } catch (error) {
    console.error('File download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download file',
      error: error.message
    });
  }
});

// Get thumbnail
router.get('/thumbnail/:reportId/:fileIndex', authenticateToken, async (req, res) => {
  try {
    const { reportId, fileIndex } = req.params;
    const userId = req.user.id;

    const report = await Report.findOne({ reportId, userId });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const fileIndexNum = parseInt(fileIndex);
    if (fileIndexNum < 0 || fileIndexNum >= report.uploadedFiles.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file index'
      });
    }

    const file = report.uploadedFiles[fileIndexNum];
    
    if (!file.thumbnailPath || !fs.existsSync(file.thumbnailPath)) {
      return res.status(404).json({
        success: false,
        message: 'Thumbnail not found'
      });
    }

    res.setHeader('Content-Type', 'image/jpeg');
    
    const fileStream = fs.createReadStream(file.thumbnailPath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Thumbnail error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get thumbnail',
      error: error.message
    });
  }
});

module.exports = router;