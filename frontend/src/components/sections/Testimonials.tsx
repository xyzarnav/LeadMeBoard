"use client";
import React from "react";
import TwitterCard from "./TwitterCard";

interface TestimonialData {
  username: string;
  name: string;
  tweet: string;
  organization: string;
}

const Testimonials: React.FC = () => {
  const testimonials: TestimonialData[] = [
    {
      username: "Raju",
      name: "Raju",
      tweet: "Ek zamana tha jab ham bhi garib hua karte the, rato rat crorepati ho gaye ham, Ekkis din mein paisa double.",
      organization: "Lakshmi chit fund",
    },
    {
      username: "CoachMike",
      name: "Mike Johnson",
      tweet: "This platform transformed our team management. The analytics are incredible and the player tracking is spot on. Highly recommended!",
      organization: "Manchester United FC",
    },
    {
      username: "SarahCoach",
      name: "Sarah Williams",
      tweet: "The tactical planning tools are game-changing. We've improved our win rate by 40% since implementing this system.",
      organization: "Barcelona Youth Academy",
    },
    {
      username: "CoachAlex",
      name: "Alex Rodriguez",
      tweet: "Best football management software I've used. The interface is intuitive and the data insights are invaluable for team development.",
      organization: "Real Madrid CF",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-pitch-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            What <span className="text-accent-green">Coaches</span> Are Saying
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Join thousands of professional coaches who trust our platform
          </p>
        </div>

        {/* Mobile: Single column, Desktop: Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full">
              <TwitterCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-700 border-2 border-black" />
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
  );
};

export default Testimonials;
