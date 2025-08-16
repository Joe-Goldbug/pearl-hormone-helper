# Pearl Hormone Helper - Backend API

一个用于激素报告分析的后端API服务，集成了AI分析功能和用户管理系统。

## 功能特性

- 🔐 **Google OAuth 认证** - 安全的用户登录系统
- 📁 **文件上传** - 支持图片和文档格式的医院报告上传
- 🤖 **AI 分析** - 集成 DeepSeek API 进行智能报告分析
- 📊 **数据管理** - 用户数据、报告历史和分析结果存储
- 🔒 **安全保护** - JWT 认证、速率限制、数据验证
- 📈 **统计分析** - 激素趋势分析和健康评分

## 技术栈

- **Node.js** + **Express.js** - 后端框架
- **MongoDB** + **Mongoose** - 数据库
- **JWT** - 身份认证
- **Multer** - 文件上传
- **Sharp** - 图像处理
- **PDF-Parse** - PDF文本提取
- **Google Auth Library** - OAuth认证
- **Axios** - HTTP客户端

## 项目结构

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # 数据库配置
│   ├── middleware/
│   │   ├── auth.js              # 认证中间件
│   │   └── validation.js        # 数据验证中间件
│   ├── models/
│   │   ├── User.js              # 用户数据模型
│   │   └── Report.js            # 报告数据模型
│   ├── routes/
│   │   ├── auth.js              # 认证路由
│   │   ├── upload.js            # 文件上传路由
│   │   ├── analysis.js          # AI分析路由
│   │   ├── user.js              # 用户管理路由
│   │   └── reports.js           # 报告管理路由
│   ├── utils/
│   │   └── helpers.js           # 工具函数
│   └── server.js                # 主服务器文件
├── uploads/                     # 文件上传目录
├── .env                         # 环境变量配置
├── package.json                 # 项目依赖
└── README.md                    # 项目文档
```

## 安装和运行

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 环境配置

复制 `.env` 文件并配置以下环境变量：

```env
# 服务器配置
PORT=5000
NODE_ENV=development

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/pearl-hormone-helper

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here

# Google OAuth 配置
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# DeepSeek AI 配置
DEEPSEEK_API_KEY=your-deepseek-api-key
DEEPSEEK_API_URL=https://api.deepseek.com/v1

# 文件上传配置
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
MAX_FILES=5

# CORS 配置
CORS_ORIGIN=http://localhost:8080

# 速率限制配置
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:5000` 启动。

## API 文档

### 认证 API

#### POST /api/auth/google
使用 Google OAuth 登录

```json
{
  "credential": "google-id-token"
}
```

#### POST /api/auth/refresh
刷新访问令牌

```json
{
  "refreshToken": "refresh-token"
}
```

#### GET /api/auth/verify
验证当前令牌

#### GET /api/auth/me
获取当前用户信息

### 文件上传 API

#### POST /api/upload
上传医院报告文件

- 支持格式：JPG, PNG, GIF, WebP, PDF, DOC, DOCX
- 最大文件大小：10MB
- 最大文件数量：5个

#### GET /api/upload/progress/:uploadId
获取上传进度

#### DELETE /api/upload/:fileId
删除上传的文件

### AI 分析 API

#### POST /api/analysis/analyze
分析上传的报告

```json
{
  "reportId": "RPT_123456",
  "options": {
    "includeCharts": true,
    "detailedAnalysis": true
  }
}
```

#### GET /api/analysis/result/:reportId
获取分析结果

#### POST /api/analysis/reanalyze/:reportId
重新分析报告

### 用户管理 API

#### GET /api/user/profile
获取用户资料

#### PUT /api/user/profile
更新用户资料

#### GET /api/user/dashboard
获取仪表盘数据

#### GET /api/user/trends
获取激素趋势数据

### 报告管理 API

#### GET /api/reports
获取用户报告列表

#### GET /api/reports/:reportId
获取特定报告详情

#### PUT /api/reports/:reportId
更新报告信息

#### DELETE /api/reports/:reportId
删除报告

#### GET /api/reports/stats/overview
获取报告统计信息

#### POST /api/reports/compare
比较多个报告

## 数据模型

### 用户模型 (User)

```javascript
{
  googleId: String,
  email: String,
  name: String,
  avatar: String,
  dateOfBirth: Date,
  profile: {
    height: Number,
    weight: Number,
    medicalHistory: [String],
    currentMedications: [String],
    allergies: [String],
    lifestyle: {
      smokingStatus: String,
      alcoholConsumption: String,
      exerciseFrequency: String,
      sleepHours: Number
    }
  },
  membership: {
    type: String, // 'free' | 'premium'
    startDate: Date,
    endDate: Date
  },
  preferences: {
    notifications: Object,
    privacy: Object,
    language: String,
    timezone: String
  }
}
```

### 报告模型 (Report)

```javascript
{
  userId: ObjectId,
  reportId: String,
  title: String,
  description: String,
  reportDate: Date,
  uploadedFiles: [{
    originalName: String,
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    thumbnailPath: String
  }],
  extractedText: String,
  hormoneData: [{
    name: String,
    fullName: String,
    value: Number,
    unit: String,
    status: String, // 'low' | 'normal' | 'high'
    referenceRange: {
      min: Number,
      max: Number,
      text: String
    }
  }],
  aiAnalysis: {
    overallScore: Number,
    riskLevel: String,
    summary: String,
    insights: [{
      category: String,
      title: String,
      description: String,
      severity: String,
      recommendations: [String]
    }],
    processingTime: Number,
    aiModel: String,
    confidence: Number
  },
  chartData: Object,
  status: String, // 'uploaded' | 'processing' | 'analyzed' | 'failed'
  tags: [String],
  isPublic: Boolean
}
```

## 安全特性

- **JWT 认证** - 所有API端点都需要有效的访问令牌
- **速率限制** - 防止API滥用
- **文件验证** - 严格的文件类型和大小检查
- **数据验证** - 输入数据的格式和内容验证
- **CORS 保护** - 跨域请求控制
- **Helmet 安全头** - HTTP安全头设置

## 错误处理

所有API响应都遵循统一的格式：

```javascript
// 成功响应
{
  "success": true,
  "message": "操作成功",
  "data": { /* 响应数据 */ }
}

// 错误响应
{
  "success": false,
  "message": "错误描述",
  "error": "详细错误信息",
  "code": "ERROR_CODE"
}
```

## 开发指南

### 添加新的API端点

1. 在相应的路由文件中添加新路由
2. 添加必要的验证中间件
3. 实现业务逻辑
4. 添加错误处理
5. 更新API文档

### 数据库迁移

```bash
# 创建索引
node -e "require('./src/config/database').initializeIndexes()"

# 清理旧数据
node -e "require('./src/config/database').cleanupOldData()"

# 备份数据库
node -e "require('./src/config/database').backupDatabase()"
```

### 测试

```bash
# 运行测试
npm test

# 测试覆盖率
npm run test:coverage
```

## 部署

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### 环境变量

生产环境需要设置以下环境变量：

- `NODE_ENV=production`
- `MONGODB_URI` - 生产数据库连接字符串
- `JWT_SECRET` - 强密码JWT密钥
- `GOOGLE_CLIENT_ID` - Google OAuth客户端ID
- `DEEPSEEK_API_KEY` - DeepSeek API密钥

## 监控和日志

- 使用 Winston 进行日志记录
- 集成健康检查端点 `/health`
- 数据库连接状态监控
- API性能指标收集

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 支持

如有问题或建议，请创建 Issue 或联系开发团队。