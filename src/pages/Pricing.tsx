import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, Star, Sparkles, Heart, Shield, Brain, 
  Upload, BarChart3, Users, Clock, Zap, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const features = {
    free: [
      'Upload up to 3 reports per month',
      'Basic hormone analysis',
      'Standard AI insights',
      'Email support',
      'Basic data visualization'
    ],
    premium: [
      'Unlimited report uploads',
      'Advanced hormone analysis',
      'Personalized AI recommendations',
      'Priority support & expert consultation',
      'Advanced data visualization & trends',
      'Export reports & data',
      'Early access to new features',
      'HIPAA-compliant data storage',
      'Custom health goal tracking',
      'Integration with health apps'
    ]
  };

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
              <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <span className="text-foreground font-medium">Pricing</span>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 w-fit mx-auto">
              <Sparkles className="w-3 h-3 mr-1" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Choose Your
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                {' '}Health Journey
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Start with our free plan or unlock the full potential of AI-powered hormone analysis with Pearl Premium.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Free Plan */}
            <Card className="border-border/50 hover:border-primary/20 transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
                <CardDescription className="text-lg">
                  Perfect for getting started with hormone analysis
                </CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-foreground">$0</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {features.free.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" size="lg">
                  Get Started Free
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No credit card required
                </p>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-primary/50 relative overflow-hidden hover:border-primary transition-all duration-300 shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-secondary-accent"></div>
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-glow text-white">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Pearl Premium</CardTitle>
                <CardDescription className="text-lg">
                  Complete hormone health management with AI insights
                </CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-foreground">$15.99</div>
                  <div className="text-muted-foreground">per month</div>
                  <div className="text-sm text-green-600 mt-1">Save 20% with annual billing</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {features.premium.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="hero" className="w-full group" size="lg">
                  Start Premium Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  14-day free trial • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Why Choose Pearl Premium?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Unlock advanced features designed for serious hormone health management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Advanced AI Analysis",
                description: "Get deeper insights with our medical-grade AI that analyzes complex hormone patterns and provides personalized recommendations.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: BarChart3,
                title: "Comprehensive Tracking",
                description: "Track unlimited reports, visualize long-term trends, and monitor your hormone health journey with detailed analytics.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Shield,
                title: "Priority Support",
                description: "Get priority access to our medical experts, faster response times, and personalized consultation sessions.",
                color: "from-purple-500 to-indigo-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-6">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your Pearl Premium subscription at any time. You'll continue to have access to premium features until the end of your current billing period."
              },
              {
                question: "Is my health data secure?",
                answer: "Absolutely. We use enterprise-grade encryption and are HIPAA compliant. Your medical data is stored securely and never shared with third parties without your explicit consent."
              },
              {
                question: "What's included in the free trial?",
                answer: "The 14-day free trial includes full access to all Pearl Premium features: unlimited uploads, advanced AI analysis, priority support, and all premium visualizations."
              },
              {
                question: "Do you offer annual billing?",
                answer: "Yes! Annual billing is available at a 20% discount, bringing your monthly cost down to $12.79 when paid annually."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "You can upgrade to Premium anytime. If you downgrade from Premium to Free, you'll retain access to Premium features until your current billing period ends."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
              Ready to Take Control of Your
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                {' '}Hormone Health?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of women who trust Pearl for their hormone health journey. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                <Heart className="w-5 h-5 mr-2" />
                Continue with Free Plan
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;