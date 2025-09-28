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
import { Check, Star } from "lucide-react";

export type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
};

interface PlanCardProps {
  plans: Plan[];
}

export default function PlanCard({ plans }: PlanCardProps) {
  return (
    <section id="pricing" className="py-20 bg-pitch-black hidden md:block">
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
  );
}
