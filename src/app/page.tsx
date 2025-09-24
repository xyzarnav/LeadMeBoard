import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/sections/Navbar";
import BottomNav from "@/components/sections/BottomNav";
import { 
  Trophy, 
  TrendingUp, 
  Play, 
  Users, 
  BarChart3, 
  Target, 
  Calendar, 
  Shield, 
  Zap,
  Activity,
  Brain,
  Check,
  Star
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Player Management",
      description: "Complete player profiles with stats, injuries, contracts, and performance tracking."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into team performance, player statistics, and match analysis."
    },
    {
      icon: Target,
      title: "Tactical Planning",
      description: "Create formations, set tactics, and plan strategies with our interactive tools."
    },
    {
      icon: Calendar,
      title: "Match Scheduling",
      description: "Organize fixtures, training sessions, and manage your team's calendar."
    },
    {
      icon: Shield,
      title: "Injury Tracking",
      description: "Monitor player fitness, track injuries, and manage recovery programs."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live match updates, instant notifications, and real-time team communication."
    },
    {
      icon: Trophy,
      title: "Performance Reports",
      description: "Detailed reports on individual and team performance with actionable insights."
    },
    {
      icon: Activity,
      title: "Training Programs",
      description: "Design and track training sessions, fitness programs, and skill development."
    },
    {
      icon: Brain,
      title: "AI Recommendations",
      description: "Smart suggestions for lineups, tactics, and player development based on data."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for amateur clubs and youth teams",
      features: [
        "Up to 25 players",
        "Basic analytics",
        "Match scheduling",
        "Player profiles",
        "Email support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for semi-professional and professional clubs",
      features: [
        "Up to 100 players",
        "Advanced analytics",
        "Tactical planning tools",
        "Injury tracking",
        "Video analysis",
        "Priority support",
        "API access",
        "Custom reports"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large clubs and multi-team organizations",
      features: [
        "Unlimited players",
        "AI-powered insights",
        "Multi-team management",
        "Custom integrations",
        "Dedicated support",
        "White-label options",
        "Advanced security",
        "Training programs"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-pitch-black">
      <Navbar />
      
      {/* Hero Section */}
      <section id="bg-section" className="relative mobile-bg md:bg-fixed min-h-[100svh] py-8 lg:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-black to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-gray-800 text-white border-gray-600">
              <Trophy className="w-4 h-4 mr-2 text-accent-green" />
              #1 Football Management Platform
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Manage Your <span className="text-accent-green accent-text">Football</span> Team Like a
              Champion
            </h1>

            <p className="text-xs md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Complete football management solution with player analytics, team performance tracking, 
              match analysis, and strategic planning tools used by professional clubs worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-4 justify-center mb-12 w-full max-w-[200px] sm:max-w-full mx-auto">
              <Button size="lg" className="text-s sm:text-lg px-8 py-6 bg-green-600 text-white hover:bg-green-500 hover-glow transition-all">
                Start Managing Today
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-s sm:text-lg px-8 py-6 border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 transition-all">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black" />
                  ))}
                </div>
                <span>Trusted by 10,000+ coaches</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-700" />
              <span>⭐ 4.9/5 rating from 2,000+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Everything You Need to
              <span className="text-accent-green"> Win</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools and features designed specifically for modern football management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const colors = [
                { bg: 'bg-green-500/10', text: 'text-green-400' },
                { bg: 'bg-gray-700/50', text: 'text-gray-300' },
                { bg: 'bg-gray-700/50', text: 'text-gray-300' }
              ];
              const colorSet = colors[index % colors.length];
              
              return (
                <Card key={index} className="professional-card group hover:border-gray-600 transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${colorSet.bg} flex items-center justify-center mb-4 transition-all`}>
                      <feature.icon className={`w-6 h-6 ${colorSet.text}`} />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-pitch-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Choose Your
              <span className="text-accent-green"> Game Plan</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flexible pricing options to fit teams of all sizes and budgets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`professional-card relative ${plan.popular ? 'subtle-glow-pink border-green-500/50 scale-105' : ''} transition-all hover:border-gray-600`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className="text-4xl font-bold text-accent-green">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2 text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button 
                    className={`w-full mb-6 ${plan.popular ? 'bg-green-600 text-white hover-glow' : 'border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400'} transition-all`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Start Free Trial
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent-green flex-shrink-0" />
                        <span className="text-sm text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900/80 py-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-accent-green" />
                <span className="font-bold text-white">FootballPro</span>
              </div>
              <p className="text-sm text-gray-300">
                The ultimate football management platform for coaches and clubs worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 <span className="text-accent-green">FootballPro</span>. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
