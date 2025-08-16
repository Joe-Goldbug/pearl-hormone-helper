import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Brain, BarChart3, Shield, Users, Upload, Sparkles, TrendingUp, Heart, Clock, CheckCircle, FileText, ScanLine, Zap, Activity, Target, Award, ArrowRight, PlayCircle, ChevronRight } from 'lucide-react';
import pearlHero from '@/assets/pearl-hero.jpg';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Pearl</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#hormones" className="text-muted-foreground hover:text-foreground transition-colors">Hormone Analysis</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </div>
            <Button variant="medical" size="default">
              Start Free Analysis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 w-fit">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered Hormone Analysis
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Know Your Body.{' '}
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                    Trust Your Data.
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Upload your hormone test reports and get instant AI-powered analysis of your LH, FSH, PROG, T, PRL, and E2 levels with personalized fertility recommendations.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" className="group">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Report & Analyze
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="xl" className="group">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">30-sec Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">Medical Grade AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">HIPAA Compliant</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <img 
                  src={pearlHero} 
                  alt="Pearl AI dashboard showing hormone analysis with LH, FSH, PROG, T, PRL, and E2 levels visualization and AI recommendations"
                  className="w-full h-auto"
                />
                {/* Overlay showing AI analysis preview */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex items-end">
                  <div className="p-6 text-white w-full">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm opacity-90">
                        <ScanLine className="w-4 h-4" />
                        <span>AI Analysis Complete</span>
                      </div>
                      <p className="font-semibold">6 hormone levels analyzed with personalized recommendations ready</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent to-accent-bright rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hormone Indicators */}
      <section id="hormones" className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 w-fit mx-auto">
              <Activity className="w-3 h-3 mr-1" />
              6 Core Hormone Analysis
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">
              Comprehensive Fertility Hormone Tracking
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes six essential fertility hormones from your medical reports to provide complete reproductive health insights.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { hormone: 'LH', name: 'Luteinizing Hormone', value: '17.95', unit: 'mIU/mL', color: 'from-red-500 to-pink-500' },
              { hormone: 'FSH', name: 'Follitropin', value: '5.71', unit: 'mIU/mL', color: 'from-blue-500 to-cyan-500' },
              { hormone: 'PROG', name: 'Progesterone', value: '0.62', unit: 'ng/mL', color: 'from-green-500 to-emerald-500' },
              { hormone: 'T', name: 'Testosterone', value: '0.49', unit: 'ng/mL', color: 'from-purple-500 to-indigo-500' },
              { hormone: 'PRL', name: 'Prolactin', value: '6.08', unit: 'ng/mL', color: 'from-orange-500 to-amber-500' },
              { hormone: 'E2', name: 'Estradiol', value: '47.94', unit: 'pg/mL', color: 'from-teal-500 to-cyan-500' }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} mx-auto mb-3 flex items-center justify-center shadow-md`}>
                    <span className="text-white font-bold text-sm">{item.hormone}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                  <div className="text-lg font-bold text-primary mb-1">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.unit}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 w-fit mx-auto">
              <Zap className="w-3 h-3 mr-1" />
              Powered by Advanced AI
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              The Simplest Way to Understand Your Hormones
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From medical report to actionable insights in under 60 seconds. Our aggregator platform combines the latest OCR technology with medical-grade AI analysis.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Multi-Format Upload</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Upload photos from your phone or PDF reports from any medical lab. Our system handles various report formats automatically.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <ScanLine className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Intelligent OCR Recognition</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Advanced optical character recognition extracts LH, FSH, PROG, T, PRL, and E2 values along with reference ranges in seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">DeepSeek Medical AI</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Professional medical AI analyzes your hormone patterns and provides personalized recommendations based on clinical data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-2xl border-border/50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Hormone Analysis Dashboard
                    </CardTitle>
                    <Badge className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'LH', value: '17.95', unit: 'mIU/mL', status: 'normal' },
                        { name: 'FSH', value: '5.71', unit: 'mIU/mL', status: 'normal' },
                        { name: 'PROG', value: '0.62', unit: 'ng/mL', status: 'low' },
                        { name: 'E2', value: '47.94', unit: 'pg/mL', status: 'normal' }
                      ].map((hormone, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/30">
                          <div className="text-sm font-medium text-foreground">{hormone.name}</div>
                          <div className="text-lg font-bold text-primary">{hormone.value}</div>
                          <div className="text-xs text-muted-foreground">{hormone.unit}</div>
                          <div className={`text-xs mt-1 ${hormone.status === 'normal' ? 'text-success' : 'text-warning'}`}>
                            {hormone.status === 'normal' ? '✓ Normal' : '⚠ Low'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        AI Recommendations
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>Consider progesterone support during luteal phase</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>Optimize vitamin D levels to support hormone balance</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>Track basal body temperature for cycle insights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full opacity-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 w-fit mx-auto">
              <Award className="w-3 h-3 mr-1" />
              Medical-Grade Process
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              From Report to Insights in Under 60 Seconds
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our streamlined aggregator platform makes complex hormone analysis simple and accessible for women aged 25-45 facing fertility challenges.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Upload Your Medical Report",
                description: "Simply take a photo or upload a PDF of your hormone test results from any medical lab. Our platform supports all major lab formats.",
                icon: Upload,
                details: ["JPG, PNG, PDF formats", "Any medical lab report", "Instant upload processing", "Secure encrypted storage"]
              },
              {
                step: "02", 
                title: "AI Extraction & Analysis",
                description: "Advanced OCR technology extracts LH, FSH, PROG, T, PRL, and E2 values. DeepSeek medical AI analyzes patterns against clinical ranges.",
                icon: Brain,
                details: ["6 hormone indicators", "Reference range detection", "Medical AI analysis", "< 30 second processing"]
              },
              {
                step: "03",
                title: "Personalized Recommendations",
                description: "Receive professional-grade insights with personalized fertility recommendations, lifestyle guidance, and visual data trends.",
                icon: TrendingUp,
                details: ["Fertility-focused advice", "Lifestyle recommendations", "Visual charts & trends", "Actionable next steps"]
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <Card className="h-full border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary-accent text-foreground text-sm font-bold flex items-center justify-center shadow-md">
                          {item.step}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {index < 2 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 z-10">
                    <div className="flex items-center justify-center h-full">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5,000+", label: "Community Members", icon: Users },
              { number: "99%", label: "Analysis Accuracy", icon: Target },
              { number: "<30s", label: "Report Processing", icon: Zap },
              { number: "24/7", label: "Secure Access", icon: Shield }
            ].map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 w-fit">
                <Heart className="w-3 h-3 mr-1" />
                Built for Women's Health
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Empowering Your Fertility Journey with AI
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Pearl is specifically designed for women aged 25-45 who are facing fertility challenges. We understand that navigating hormone reports can be overwhelming, which is why we've created an intelligent aggregator platform that simplifies complex medical data.
                </p>
                <p>
                  Our platform combines cutting-edge OCR technology with DeepSeek medical AI to provide you with instant, professional-grade analysis of your hormone levels. From LH and FSH to progesterone and estradiol, we track the six most critical fertility indicators.
                </p>
                <p>
                  With our 5,000+ member community and commitment to HIPAA compliance, Pearl provides both the technology and support system you need on your fertility journey.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">25-45</div>
                  <div className="text-sm text-muted-foreground">Target age range</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Core hormones tracked</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  icon: Shield,
                  title: "HIPAA Compliant Security",
                  description: "Your medical data is protected with enterprise-grade encryption and security protocols."
                },
                {
                  icon: Users,
                  title: "Thriving Community",
                  description: "Join 5,000+ women supporting each other through their fertility journeys."
                },
                {
                  icon: Brain,
                  title: "Medical-Grade AI",
                  description: "DeepSeek AI provides professional analysis comparable to clinical assessments."
                }
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 w-fit mx-auto">
                <Sparkles className="w-3 h-3 mr-1" />
                Start Your Analysis Today
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Transform Your Hormone Data Into{' '}
                <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                  Actionable Insights
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Upload your hormone reports now and get instant AI-powered analysis with personalized fertility recommendations. Join thousands of women who trust Pearl with their reproductive health data.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email to get started"
                  className="flex-1 h-12 bg-background border-border/50 focus:border-primary"
                />
                <Button variant="hero" size="lg" className="whitespace-nowrap group">
                  <Upload className="w-4 h-4 mr-2" />
                  Start Free Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
                  <span>No commitment</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Trusted by 5,000+ women worldwide. HIPAA compliant and secure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">Pearl</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-powered hormone analysis to support your fertility journey with professional medical insights.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Medical Disclaimer</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Pearl Health. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for women's health
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;