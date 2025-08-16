import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  User, LogOut, Settings, Heart, Shield, 
  Mail, Calendar, CheckCircle, Sparkles 
} from 'lucide-react';

// 模拟用户状态
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  isPremium: boolean;
}

interface GoogleAuthProps {
  onUserChange?: (user: User | null) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onUserChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // 模拟Google登录
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
      id: '1',
      name: '张小美',
      email: 'xiaomei@gmail.com',
      avatar: '/api/placeholder/100/100',
      memberSince: '2024年1月',
      isPremium: true
    };
    
    setUser(mockUser);
    setIsLoading(false);
    setShowLoginDialog(false);
    onUserChange?.(mockUser);
  };

  // 登出
  const handleLogout = () => {
    setUser(null);
    onUserChange?.(null);
  };

  // 如果用户已登录，显示用户菜单
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-3 p-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground mt-1">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {user.isPremium && (
                      <Badge className="bg-gradient-to-r from-primary to-primary-glow text-white text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {user.memberSince}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* 快速统计 */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">报告</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">92</div>
                  <div className="text-xs text-muted-foreground">健康分</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">3</div>
                  <div className="text-xs text-muted-foreground">建议</div>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>个人资料</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>健康仪表板</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>设置</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // 如果用户未登录，显示登录按钮
  return (
    <>
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <User className="w-4 h-4" />
            登录
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              欢迎来到 Pearl
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              使用Google账户登录，开始您的荷尔蒙健康之旅
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 登录按钮 */}
            <Button 
              onClick={handleGoogleLogin} 
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <span>登录中...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>使用 Google 登录</span>
                </div>
              )}
            </Button>
            
            {/* 功能亮点 */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-center text-muted-foreground">
                登录后您可以享受：
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Heart, text: "个人荷尔蒙追踪仪表板" },
                  { icon: Shield, text: "安全的数据存储和隐私保护" },
                  { icon: Sparkles, text: "AI驱动的个性化健康建议" },
                  { icon: CheckCircle, text: "无限制的报告上传和分析" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 隐私说明 */}
            <div className="text-xs text-center text-muted-foreground space-y-1">
              <p>我们严格遵守HIPAA合规标准</p>
              <p>您的医疗数据将得到最高级别的保护</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoogleAuth;