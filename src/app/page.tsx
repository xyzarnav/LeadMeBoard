"use client";
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
import SwipeDeck, { type SwipeItem } from "@/components/sections/SwipeDeck";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { 
  Trophy, 
  TrendingUp, 
  Play, 
  Users, 
  BarChart3, 
  Target, 
  Calendar, 
  Zap,
  Activity,
  Brain,
  Check,
  Star,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const features: SwipeItem[] = [
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

            <h1 className="pt-4 md:pt-8 text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Manage Your <span className="text-accent-green accent-text">Football</span> Team Like a
              Champion
            </h1>
 
            <p className=" md:block text-xs md:text-2xl text-gray-300 mt-4 mb-8 max-w-3xl mx-auto leading-relaxed">
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

      {/* Features Section - Hinge-style Swipe Deck */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-pitch-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 text-white leading-tight">
              Everything You Need to <span className="text-accent-green">Win</span>
            </h2>
            {/* <p className="text-s sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-2">
              Swipe through key capabilities with a modern, dynamic feel
            </p> */}
          </div>

          <SwipeDeck items={features} />

          <div className="text-center mt-10 sm:mt-14">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
