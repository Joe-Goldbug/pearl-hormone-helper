import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Brain, TrendingUp, FileText, ScanLine, Zap, ArrowRight, CheckCircle, Activity, Target, Award, PlayCircle, Heart, BarChart3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const HowItWorks = () => {
  // Demo simulation state
  const [step, setStep] = useState<'upload' | 'ocr' | 'charts' | 'insights'>('upload');
  const { t } = useLanguage();
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev === 'upload' ? 'ocr' : prev === 'ocr' ? 'charts' : prev === 'charts' ? 'insights' : 'upload'));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const miniData = useMemo(() => (
    [
      { date: '01', LH: 7.8, FSH: 6.1, E2: 120 },
      { date: '02', LH: 8.2, FSH: 6.3, E2: 138 },
      { date: '03', LH: 8.5, FSH: 6.9, E2: 145 },
      { date: '04', LH: 9.2, FSH: 6.7, E2: 148 },
      { date: '05', LH: 8.9, FSH: 7.1, E2: 152 },
      { date: '06', LH: 8.1, FSH: 6.8, E2: 142 }
    ]
  ), []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation variant="transparent" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
          <div className="text-center space-y-8">
            <Badge className="bg-accent/10 text-accent border-accent/20 w-fit mx-auto">
              <Award className="w-3 h-3 mr-1" />
              Medical-Grade AI Analysis
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              From Report to Insights
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                {' '}in 30 Seconds
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our intelligent platform makes complex hormone analysis simple and understandable, providing medical-grade insights for women aged 25-45 facing fertility challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Upload className="w-5 h-5 mr-2" />
                Upload Report Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      
      {/* Visual Demo Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 w-fit mx-auto">
              <Activity className="w-3 h-3 mr-1" />
              Live Demo
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              See How AI Analyzes Your Hormone Data
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From raw medical reports to professional visualization charts, experience how our AI provides medical-grade analysis in seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Upload Demo */}
            <div className="space-y-6">
              <Card className="border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/50 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Drag & Drop or Click to Upload</h3>
                      <p className="text-sm text-muted-foreground">Supports JPG, PNG, PDF formats</p>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Automatically identifies 6 core hormone indicators</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Extracts reference ranges and values</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>HIPAA-compliant secure processing</span>
                </div>
              </div>
            </div>

            {/* Right: Analysis Results Demo */}
            <div className="space-y-6">
              <Card className="shadow-2xl border-border/50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Hormone Analysis Dashboard
                    </CardTitle>
                    <Badge className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Analysis Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Toggle: Simulation / Video */}
                  <Tabs defaultValue="simulation" className="space-y-6">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
                      <TabsTrigger value="video">Demo Video</TabsTrigger>
                    </TabsList>

                    {/* Simulation Flow */}
                    <TabsContent value="simulation" className="space-y-6">
                      {/* Stepper */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className={`flex items-center gap-2 ${step === 'upload' ? 'text-foreground' : ''}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'upload' ? 'bg-primary text-white' : 'bg-muted'}`}>
                            <Upload className="w-3 h-3" />
                          </div>
                          Upload
                        </div>
                        <div className={`flex items-center gap-2 ${step === 'ocr' ? 'text-foreground' : ''}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'ocr' ? 'bg-primary text-white' : 'bg-muted'}`}>
                            <ScanLine className="w-3 h-3" />
                          </div>
                          OCR & Extract
                        </div>
                        <div className={`flex items-center gap-2 ${step === 'charts' ? 'text-foreground' : ''}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'charts' ? 'bg-primary text-white' : 'bg-muted'}`}>
                            <BarChart3 className="w-3 h-3" />
                          </div>
                          Charts
                        </div>
                        <div className={`flex items-center gap-2 ${step === 'insights' ? 'text-foreground' : ''}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'insights' ? 'bg-primary text-white' : 'bg-muted'}`}>
                            <Sparkles className="w-3 h-3" />
                          </div>
                          AI Insights
                        </div>
                      </div>

                      {/* Dynamic body */}
                      <div className="p-4 rounded-lg border border-border/50 bg-card/50 min-h-[220px] flex items-center justify-center">
                        {step === 'upload' && (
                          <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                              <Upload className="w-6 h-6 text-primary animate-bounce" />
                            </div>
                            <div className="text-sm text-muted-foreground">Uploading report...</div>
                          </div>
                        )}
                        {step === 'ocr' && (
                          <div className="w-full">
                            <div className="h-2 w-full bg-muted rounded overflow-hidden">
                              <div className="h-full w-2/3 bg-gradient-to-r from-primary to-primary-glow animate-pulse" />
                            </div>
                            <div className="mt-3 text-sm text-muted-foreground">Reading values: LH, FSH, PROG, T, PRL, E2</div>
                            <div className="mt-1 text-xs text-muted-foreground">Extracting reference ranges and units</div>
                          </div>
                        )}
                        {step === 'charts' && (
                          <div className="w-full h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={miniData}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis dataKey="date" className="text-[10px]" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                                <Line type="monotone" dataKey="LH" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="FSH" stroke="#06B6D4" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="E2" stroke="#EC4899" strokeWidth={2} dot={false} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                        {step === 'insights' && (
                          <div className="space-y-3 w-full">
                            <h4 className="font-medium text-foreground flex items-center gap-2">
                              <Target className="w-4 h-4 text-primary" />
                              AI Personalized Recommendations
                            </h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-start gap-2 p-2 rounded bg-primary/5">
                                <ArrowRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                                <span>Consider progesterone support during luteal phase</span>
                              </div>
                              <div className="flex items-start gap-2 p-2 rounded bg-primary/5">
                                <ArrowRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                                <span>Optimize vitamin D levels to support hormone balance</span>
                              </div>
                              <div className="flex items-start gap-2 p-2 rounded bg-primary/5">
                                <ArrowRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                                <span>Track basal body temperature for cycle insights</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CTA row */}
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">Automatically identifies 6 hormone indicators and visualizes trends</div>
                        <Link to="/dashboard?tab=trends">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            View Trends
                          </Button>
                        </Link>
                      </div>
                    </TabsContent>

                    {/* Video Demo */}
                    <TabsContent value="video">
                      <div className="rounded-lg overflow-hidden border border-border/50">
                        <video
                          src="https://cdn.coverr.co/videos/coverr-medical-lab-people-6927/1080p.mp4"
                          poster="/placeholder.svg"
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Demo video for illustrative purposes. Actual UI shows medical-grade charts and AI insights based on six hormone indicators.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Advantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 w-fit mx-auto">
              <Zap className="w-3 h-3 mr-1" />
              Technical Advantages
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Why Choose Pearl AI?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "Multi-Format Support", desc: "Supports phone photos, PDF reports, and various formats" },
              { icon: ScanLine, title: "Smart OCR", desc: "Advanced optical character recognition for accurate data extraction" },
              { icon: Brain, title: "Medical-Grade AI", desc: "Professional analysis powered by medical AI" },
              { icon: Zap, title: "Lightning Fast", desc: "Complete analysis process in under 30 seconds" }
            ].map((feature, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Start Your
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                {' '}Hormone Health Journey?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload your hormone report now and get instant AI analysis with personalized fertility recommendations. Join thousands of women who trust Pearl.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Upload className="w-5 h-5 mr-2" />
                Start Free Analysis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>30-second analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No commitment required</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;