import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Brain, Shield, Target, Award, Sparkles, TrendingUp, CheckCircle, ArrowRight, Mail, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const AboutUs = () => {
  const { t } = useLanguage();
  const { user, login, logout } = useAuth();
  return (
    <main className="min-h-screen bg-background">
      <Navigation variant="transparent" />


           {/* Team Introduction */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 w-fit mx-auto">
              <Users className="w-3 h-3 mr-1" />
              Core Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are a passionate group of technology experts and healthcare advocates dedicated to improving women's reproductive health through AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Aqsan",
                role: "团队掌舵人",
                background: "团队的\"点火者\"与掌舵人，用细致入微的行动力让最初的创业点子落地生根。",
                expertise: ["创业领导", "项目管理", "战略规划"],
                avatar: "/aqsan.jpg"
              },
              {
                name: "Rebecca",
                role: "信息挖掘专家",
                background: "我是团队的\"信息挖掘机\"，专治各种资料空缺。",
                expertise: ["信息收集", "资料整理", "研究分析"],
                avatar: "/rebecca.jpg"
              },
              {
                name: "Max Sun",
                role: "数据分析师",
                background: "在团队中主要负责数据分析和翻译工作，熟悉教育与科技相关领域。",
                expertise: ["数据分析", "翻译", "教育科技"],
                avatar: "/max-sun.jpg"
              },
              {
                name: "Ethan",
                role: "产品专家",
                background: "从事互联网&教育行业，专治产品不育不孕。",
                expertise: ["产品设计", "互联网", "教育行业"],
                avatar: "/ethanl.jpg"
              },
              {
                name: "White Peace",
                role: "全栈工程师",
                background: "全栈工程师，负责技术架构和开发实现。",
                expertise: ["前端开发", "后端开发", "技术架构"],
                avatar: "/White-Peace.jpg"
              }
            ].map((member, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 group-hover:scale-105 transition-transform overflow-hidden border-2 border-primary/20">
                    <img 
                      src={member.avatar} 
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-glow hidden items-center justify-center text-white font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.background}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 w-fit mx-auto">
              <Target className="w-3 h-3 mr-1" />
              Core Problems
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              What Problems Do We Solve?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Difficult Report Interpretation",
                description: "Medical reports are full of technical terms, making it hard for users to understand the true meaning of hormone values.",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Lack of Professional Guidance",
                description: "Getting professional medical advice often requires long waiting times and is expensive.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: TrendingUp,
                title: "Missing Data Visualization",
                description: "Raw data lacks intuitive chart displays, making it impossible to clearly see health trends.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Heart,
                title: "Insufficient Personalized Recommendations",
                description: "Generic advice cannot meet individual unique health conditions and lifestyle needs.",
                color: "from-purple-500 to-indigo-500"
              }
            ].map((problem, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <problem.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Project Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 w-fit">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Our Vision
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Empowering Every Woman to
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                    {' '}Understand Her Body
                  </span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We believe every woman has the right to easily understand her health data. By combining cutting-edge AI technology with medical expertise, we're breaking down barriers between complex medical information and everyday users.
                  </p>
                  <p>
                    Pearl is more than just an analysis tool—it's an empowerment platform. Through technological innovation, we aim to make women more confident and informed on their reproductive health journey.
                  </p>
                  <p>
                    Our ultimate goal is to build a supportive health community where every woman can access the information, support, and guidance they need to make the best health decisions for themselves.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Users trust us</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">99%</div>
                  <div className="text-sm text-muted-foreground">Analysis accuracy</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">30s</div>
                  <div className="text-sm text-muted-foreground">Average processing time</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Secure access</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  icon: Shield,
                  title: "Privacy & Security First",
                  description: "We use HIPAA-compliant enterprise-grade encryption and security protocols to ensure your medical data receives the highest level of protection."
                },
                {
                  icon: Brain,
                  title: "Continuous Innovation",
                  description: "We continuously improve our AI algorithms and stay synchronized with the latest medical research to provide users with the most accurate analysis results."
                },
                {
                  icon: Heart,
                  title: "User-Centered Design",
                  description: "Every feature is designed with user needs as the starting point. We listen to community feedback and continuously optimize the product experience."
                }
              ].map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community & Support */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 w-fit mx-auto">
              <Users className="w-3 h-3 mr-1" />
              Community Support
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Join Our Health Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Pearl is more than just a technical solution—it's a caring and supportive community where no woman has to navigate her reproductive health journey alone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Active Community",
                description: "5000+ women sharing experiences and supporting each other",
                features: ["Experience Sharing", "Expert Q&A", "Peer Support"]
              },
              {
                icon: Award,
                title: "Professional Guidance",
                description: "Medical experts regularly provide health guidance and advice",
                features: ["Expert Lectures", "Health Tips", "Latest Research"]
              },
              {
                icon: Shield,
                title: "Safe Environment",
                description: "Strict privacy protection creating a secure communication space",
                features: ["Anonymous Communication", "Content Moderation", "Privacy Protection"]
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
              Ready to Join Us in
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-accent bg-clip-text text-transparent">
                {' '}Transforming Women's Health
              </span>
              ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the Pearl community and experience AI-driven hormone health analysis. Let's work together for a better future in women's health.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Heart className="w-5 h-5 mr-2" />
                Join Our Community
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Contact Our Team
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Professional Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Safe & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;