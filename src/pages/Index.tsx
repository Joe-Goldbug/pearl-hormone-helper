import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Brain, BarChart3, Shield, Users, Upload, Sparkles, TrendingUp, Heart, Clock, CheckCircle } from 'lucide-react';
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
            <Button variant="medical" size="default">
              Early Access
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
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Medical Analysis
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Transform Your{' '}
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                    Hormone Data
                  </span>{' '}
                  Into Actionable Insights
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Pearl provides AI-driven analysis of your medical hormone reports, offering personalized recommendations to support your fertility journey with professional-grade insights.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" className="group">
                    Get Started Free
                    <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Button>
                  <Button variant="outline" size="xl">
                    Watch Demo
                  </Button>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Medical Grade AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>5000+ Community Members</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={pearlHero} 
                alt="Pearl AI hormone analysis dashboard showing medical data visualizations and personalized recommendations for fertility support"
                className="rounded-2xl shadow-2xl border border-border/50"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent to-accent-bright rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Comprehensive Hormone Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your medical reports and receive professional-grade AI analysis with personalized recommendations for your fertility journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Smart Report Upload",
                description: "Upload photos or PDFs of your hormone reports. Our OCR technology extracts key data: LH, FSH, PROG, T, PRI, E2.",
                color: "primary"
              },
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "DeepSeek medical AI analyzes your hormone levels against reference ranges and medical patterns.",
                color: "secondary-accent"
              },
              {
                icon: BarChart3,
                title: "Visual Insights",
                description: "Beautiful charts and trends help you understand your hormone patterns over time.",
                color: "accent-bright"
              },
              {
                icon: Heart,
                title: "Fertility Focus",
                description: "Specialized recommendations for women aged 25-45 facing fertility challenges.",
                color: "primary-glow"
              },
              {
                icon: Shield,
                title: "Medical Security",
                description: "HIPAA-compliant data protection with enterprise-grade security for your medical information.",
                color: "success"
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Join our 5000+ member community of women supporting each other's fertility journeys.",
                color: "secondary-accent"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/20 hover:-translate-y-2">
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color.includes('-') ? feature.color.split('-')[0] : feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Simple 3-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get professional hormone analysis in minutes, not weeks.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload Your Report",
                description: "Take a photo or upload a PDF of your hormone test results from any medical lab.",
                icon: Upload
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our medical AI processes your data and compares it against clinical reference ranges.",
                icon: Brain
              },
              {
                step: "03",
                title: "Get Insights",
                description: "Receive personalized recommendations, visualizations, and actionable next steps.",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center group">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary-accent text-foreground text-sm font-bold flex items-center justify-center shadow-md">
                      {item.step}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                
                {index < 2 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full">
                    <div className="flex items-center justify-center">
                      <div className="w-full h-px bg-gradient-to-r from-primary/20 to-primary-glow/20"></div>
                      <TrendingUp className="w-5 h-5 text-primary mx-4" />
                      <div className="w-full h-px bg-gradient-to-r from-primary-glow/20 to-primary/20"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Clock className="w-3 h-3 mr-1" />
                Limited Early Access
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Join the Future of Fertility Health
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Be among the first to experience AI-powered hormone analysis. Get early access and help shape Pearl's development.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 h-12 bg-background border-border/50 focus:border-primary"
              />
              <Button variant="medical" size="lg" className="whitespace-nowrap">
                Get Early Access
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Join 5,000+ women already using Pearl for their fertility journey. No spam, unsubscribe anytime.
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