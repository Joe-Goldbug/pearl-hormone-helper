## 相关文件

- `src/pages/Index.tsx` - 主页面组件，包含所有核心功能展示
- `src/pages/HowItWorks.tsx` - How It Works页面组件（待创建）
- `src/pages/AboutUs.tsx` - About Us页面组件（待创建）
- `src/pages/Dashboard.tsx` - 用户个人仪表板页面（待创建）
- `src/components/auth/GoogleAuth.tsx` - Google OAuth登录组件（待创建）
- `src/components/upload/FileUpload.tsx` - 文件上传组件（待创建）
- `src/components/charts/HormoneChart.tsx` - 荷尔蒙数据可视化图表组件（待创建）
- `src/components/analysis/AIAnalysis.tsx` - AI分析结果展示组件（待创建）
- `src/components/navigation/Navigation.tsx` - 导航栏组件（待创建）
- `src/hooks/useAuth.ts` - 用户认证相关hooks（待创建）
- `src/hooks/useFileUpload.ts` - 文件上传相关hooks（待创建）
- `src/lib/auth/googleAuth.ts` - Google认证服务（待创建）
- `src/lib/api/analysisApi.ts` - AI分析API服务（待创建）
- `src/lib/utils/fileProcessing.ts` - 文件处理工具函数（待创建）
- `src/types/hormone.ts` - 荷尔蒙数据类型定义（待创建）
- `src/types/user.ts` - 用户数据类型定义（待创建）

### 注意事项

- 单元测试通常应放置在它们正在测试的代码文件旁边（例如，`MyComponent.tsx`和`MyComponent.test.tsx`在同一目录中）。
- 使用`npm test`运行测试。不带路径运行将执行Jest配置找到的所有测试。
- 项目使用React + TypeScript + Vite + Tailwind CSS + shadcn/ui技术栈。

## 任务

- [ ] 1.0 页面结构优化与导航系统
- [ ] 2.0 How It Works页面开发
- [ ] 3.0 About Us页面开发
- [ ] 4.0 Google OAuth用户认证系统
- [ ] 5.0 用户个人仪表板开发
- [ ] 6.0 文件上传与AI分析功能
- [ ] 7.0 数据可视化图表组件
- [ ] 8.0 UI/UX优化与响应式设计
- [ ] 9.0 性能优化与安全加固