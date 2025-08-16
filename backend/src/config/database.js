const mongoose = require('mongoose');

// MongoDB connection configuration
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pearl-hormone-helper';
    
    const options = {
      // Connection options
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
      
      // Authentication
      authSource: 'admin',
      
      // SSL/TLS (enable for production)
      // ssl: process.env.NODE_ENV === 'production',
      // sslValidate: process.env.NODE_ENV === 'production',
      
      // Replica set options (if using replica sets)
      // replicaSet: process.env.MONGODB_REPLICA_SET,
      
      // Read/Write concerns
      readPreference: 'primary',
      writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
      }
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI, options);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected from MongoDB');
    });
    
    // Handle application termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });
    
    return conn;
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    // Log specific connection errors
    if (error.name === 'MongoNetworkError') {
      console.error('🌐 Network error - check MongoDB server status and network connectivity');
    } else if (error.name === 'MongoAuthenticationError') {
      console.error('🔐 Authentication failed - check MongoDB credentials');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('🎯 Server selection failed - check MongoDB URI and server availability');
    }
    
    // Exit process with failure
    process.exit(1);
  }
};

// Database health check
const checkDBHealth = async () => {
  try {
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    if (state === 1) {
      // Test database operation
      await mongoose.connection.db.admin().ping();
      return {
        status: 'healthy',
        state: states[state],
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        database: mongoose.connection.name,
        uptime: process.uptime()
      };
    } else {
      return {
        status: 'unhealthy',
        state: states[state],
        error: 'Database not connected'
      };
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      state: 'error',
      error: error.message
    };
  }
};

// Initialize database indexes
const initializeIndexes = async () => {
  try {
    console.log('🔍 Initializing database indexes...');
    
    // User model indexes
    const User = require('../models/User');
    await User.createIndexes();
    
    // Report model indexes
    const Report = require('../models/Report');
    await Report.createIndexes();
    
    console.log('✅ Database indexes initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database indexes:', error);
    throw error;
  }
};

// Database cleanup utilities
const cleanupOldData = async () => {
  try {
    console.log('🧹 Starting database cleanup...');
    
    const Report = require('../models/Report');
    
    // Remove failed uploads older than 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const failedUploads = await Report.deleteMany({
      status: 'failed',
      createdAt: { $lt: sevenDaysAgo }
    });
    
    console.log(`🗑️ Cleaned up ${failedUploads.deletedCount} failed uploads`);
    
    // Remove orphaned temporary files (you might want to implement this)
    // cleanupOrphanedFiles();
    
    console.log('✅ Database cleanup completed');
  } catch (error) {
    console.error('❌ Database cleanup failed:', error);
  }
};

// Get database statistics
const getDBStats = async () => {
  try {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    
    return {
      collections: stats.collections,
      documents: stats.objects,
      dataSize: Math.round(stats.dataSize / 1024 / 1024 * 100) / 100, // MB
      storageSize: Math.round(stats.storageSize / 1024 / 1024 * 100) / 100, // MB
      indexes: stats.indexes,
      indexSize: Math.round(stats.indexSize / 1024 / 1024 * 100) / 100, // MB
      avgObjSize: Math.round(stats.avgObjSize)
    };
  } catch (error) {
    console.error('Failed to get database statistics:', error);
    return null;
  }
};

// Backup database (basic implementation)
const backupDatabase = async () => {
  try {
    console.log('💾 Starting database backup...');
    
    // This is a basic implementation
    // In production, you'd want to use mongodump or a proper backup service
    const User = require('../models/User');
    const Report = require('../models/Report');
    
    const backup = {
      timestamp: new Date(),
      users: await User.find({}).lean(),
      reports: await Report.find({}).lean()
    };
    
    // Save backup to file or cloud storage
    const fs = require('fs');
    const backupPath = `./backups/backup_${Date.now()}.json`;
    
    // Ensure backup directory exists
    if (!fs.existsSync('./backups')) {
      fs.mkdirSync('./backups', { recursive: true });
    }
    
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
    
    console.log(`✅ Database backup completed: ${backupPath}`);
    return backupPath;
  } catch (error) {
    console.error('❌ Database backup failed:', error);
    throw error;
  }
};

module.exports = {
  connectDB,
  checkDBHealth,
  initializeIndexes,
  cleanupOldData,
  getDBStats,
  backupDatabase
};