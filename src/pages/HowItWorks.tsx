import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Brain, TrendingUp, FileText, ScanLine, Zap, ArrowRight, CheckCircle, Activity, Target, Award, PlayCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Pearl</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <span className="text-foreground font-medium">How It Works</span>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>
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
              <Button variant="outline" size="xl" className="group">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Upload Medical Report",
                description: "Simply take a photo or upload any medical lab's hormone test report PDF. Our platform supports all major laboratory formats.",
                icon: Upload,
                details: ["Supports JPG, PNG, PDF formats", "Any medical lab report", "Instant upload processing", "Secure encrypted storage"],
                image: "/api/placeholder/400/300"
              },
              {
                step: "02", 
                title: "AI Extraction & Analysis",
                description: "Advanced OCR technology extracts LH, FSH, PROG, T, PRL, and E2 values. Medical AI analyzes patterns against clinical ranges.",
                icon: Brain,
                details: ["6 hormone indicators", "Reference range detection", "Medical AI analysis", "< 30 seconds processing"],
                image: "/api/placeholder/400/300"
              },
              {
                step: "03",
                title: "Personalized Recommendations",
                description: "Get professional-grade insights with personalized fertility advice, lifestyle guidance, and visualized data trends.",
                icon: TrendingUp,
                details: ["Fertility expert advice", "Lifestyle recommendations", "Visual chart trends", "Actionable next steps"],
                image: "/api/placeholder/400/300"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <Card className="h-full border-border/50 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* 步骤图片 */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                        <item.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-secondary-accent text-foreground text-lg font-bold flex items-center justify-center shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {index < 2 && (
                  <div className="hidden lg:block absolute top-24 left-full w-8 z-10">
                    <div className="flex items-center justify-center h-full">
                      <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            ))}
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
              <Card className="shadow-2xl border-border/50">
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
                  <div className="space-y-6">
                    {/* Hormone Values Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'LH', value: '17.95', unit: 'mIU/mL', status: 'normal', color: 'from-red-500 to-pink-500' },
                        { name: 'FSH', value: '5.71', unit: 'mIU/mL', status: 'normal', color: 'from-blue-500 to-cyan-500' },
                        { name: 'PROG', value: '0.62', unit: 'ng/mL', status: 'low', color: 'from-green-500 to-emerald-500' },
                        { name: 'E2', value: '47.94', unit: 'pg/mL', status: 'normal', color: 'from-teal-500 to-cyan-500' }
                      ].map((hormone, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-md transition-shadow">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${hormone.color} mb-2 flex items-center justify-center`}>
                            <span className="text-white font-bold text-xs">{hormone.name}</span>
                          </div>
                          <div className="text-lg font-bold text-primary">{hormone.value}</div>
                          <div className="text-xs text-muted-foreground">{hormone.unit}</div>
                          <div className={`text-xs mt-1 ${hormone.status === 'normal' ? 'text-success' : 'text-warning'}`}>
                            {hormone.status === 'normal' ? '✓ Normal' : '⚠ Low'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* AI Recommendations */}
                    <div className="space-y-3">
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
                  </div>
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