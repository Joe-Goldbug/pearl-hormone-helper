import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Calendar, Download, Share2, Settings, 
  Bell, Heart, Activity, Target, AlertCircle, CheckCircle, 
  Upload, FileText, Sparkles, Brain, Shield, Clock
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  
  // Demo user data
  const userData = {
    name: "User",
    email: "demo@pearl.com",
    avatar: undefined,
    memberSince: "January 2024",
    totalReports: 12,
    lastUpdate: "March 15, 2024"
  };

  // Hormone data simulation
  const hormoneData = [
    { date: '2024-01', LH: 8.2, FSH: 6.5, PROG: 12.3, T: 0.8, PRL: 18.5, E2: 145 },
    { date: '2024-02', LH: 7.8, FSH: 6.8, PROG: 11.8, T: 0.9, PRL: 17.2, E2: 152 },
    { date: '2024-03', LH: 8.5, FSH: 7.1, PROG: 13.1, T: 0.7, PRL: 19.1, E2: 138 },
    { date: '2024-04', LH: 9.2, FSH: 6.9, PROG: 12.7, T: 0.8, PRL: 18.8, E2: 148 },
    { date: '2024-05', LH: 8.9, FSH: 7.3, PROG: 13.5, T: 0.9, PRL: 17.9, E2: 155 },
    { date: '2024-06', LH: 8.1, FSH: 6.7, PROG: 12.9, T: 0.8, PRL: 18.3, E2: 142 }
  ];

  // Current hormone status
  const currentHormones = [
    { 
      name: 'LH', 
      fullName: 'Luteinizing Hormone', 
      value: 8.1, 
      unit: 'mIU/mL', 
      status: 'normal', 
      trend: 'down',
      change: -0.8,
      range: '5.0-25.0',
      color: '#8B5CF6'
    },
    { 
      name: 'FSH', 
      fullName: 'Follicle Stimulating Hormone', 
      value: 6.7, 
      unit: 'mIU/mL', 
      status: 'normal', 
      trend: 'down',
      change: -0.6,
      range: '3.5-12.5',
      color: '#06B6D4'
    },
    { 
      name: 'PROG', 
      fullName: 'Progesterone', 
      value: 12.9, 
      unit: 'ng/mL', 
      status: 'normal', 
      trend: 'up',
      change: +0.2,
      range: '0.2-25.0',
      color: '#10B981'
    },
    { 
      name: 'T', 
      fullName: 'Testosterone', 
      value: 0.8, 
      unit: 'ng/mL', 
      status: 'normal', 
      trend: 'stable',
      change: 0,
      range: '0.1-0.9',
      color: '#F59E0B'
    },
    { 
      name: 'PRL', 
      fullName: 'Prolactin', 
      value: 18.3, 
      unit: 'ng/mL', 
      status: 'normal', 
      trend: 'up',
      change: +0.4,
      range: '4.8-23.3',
      color: '#EF4444'
    },
    { 
      name: 'E2', 
      fullName: 'Estradiol', 
      value: 142, 
      unit: 'pg/mL', 
      status: 'normal', 
      trend: 'down',
      change: -13,
      range: '12.5-166.0',
      color: '#EC4899'
    }
  ];

  // AI insights data
  const aiInsights = [
    {
      type: 'positive',
      title: 'Hormone Balance is Good',
      description: 'Your overall hormone levels are within normal ranges, indicating good reproductive health.',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'suggestion',
      title: 'Monitor Estradiol Changes',
      description: 'Estradiol levels show a slight declining trend. Consider increasing intake of foods rich in phytoestrogens.',
      icon: AlertCircle,
      color: 'text-amber-600'
    },
    {
      type: 'lifestyle',
      title: 'Lifestyle Recommendations',
      description: 'Maintain regular exercise and adequate sleep to help maintain hormone balance. Recommend 3-4 moderate-intensity workouts per week.',
      icon: Heart,
      color: 'text-blue-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'low': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' || change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (trend === 'down' || change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userData.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {userData.name}</h1>
                <p className="text-muted-foreground">Last updated: {userData.lastUpdate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Report
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{userData.totalReports}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className="text-2xl font-bold text-green-600">92/100</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Insights</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-2xl font-bold text-purple-600">3 months</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearchParams({ tab: v }); }} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="reports">Historical Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Current Hormone Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Current Hormone Status
                </CardTitle>
                <CardDescription>
                  Hormone level analysis based on latest report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentHormones.map((hormone, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{hormone.name}</h3>
                          <p className="text-xs text-muted-foreground">{hormone.fullName}</p>
                        </div>
                        {getTrendIcon(hormone.trend, hormone.change)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold" style={{ color: hormone.color }}>
                            {hormone.value}
                          </span>
                          <span className="text-sm text-muted-foreground">{hormone.unit}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <Badge className={getStatusColor(hormone.status)}>
                            {hormone.status === 'normal' ? 'Normal' : hormone.status === 'high' ? 'High' : 'Low'}
                          </Badge>
                          <span className="text-muted-foreground">Range: {hormone.range}</span>
                        </div>
                        
                        {hormone.change !== 0 && (
                          <div className="text-xs text-muted-foreground">
                            vs. last {hormone.change > 0 ? '+' : ''}{hormone.change} {hormone.unit}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hormone Trend Charts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Hormone Trends
                </CardTitle>
                <CardDescription>
                  Hormone level changes over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hormoneData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="LH" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="FSH" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="E2" stroke="#EC4899" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trend Analysis Tabs */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>LH & FSH Trends</CardTitle>
                  <CardDescription>Gonadotropin hormone level changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hormoneData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="date" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip />
                        <Area type="monotone" dataKey="LH" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="FSH" stackId="2" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sex Hormone Levels</CardTitle>
                  <CardDescription>Estradiol and progesterone changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hormoneData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="date" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip />
                        <Bar dataKey="E2" fill="#EC4899" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="PROG" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6">
              {aiInsights.map((insight, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center ${insight.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <insight.icon className={`w-6 h-6 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{insight.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Historical Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Historical Reports
                </CardTitle>
                <CardDescription>
                  View and manage all your medical reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((report) => (
                    <div key={report} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Hormone Test Report #{report}</h4>
                  <p className="text-sm text-muted-foreground">Uploaded on {new Date(2024, 6-report, 15).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Analyzed</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;