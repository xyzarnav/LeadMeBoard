"use client";
import Link from "next/link";
import { Trophy, Github, Twitter, Mail, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  const links = {
    product: [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "/api", label: "API", external: true },
      { href: "/integrations", label: "Integrations" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
    support: [
      { href: "/docs", label: "Documentation" },
      { href: "/help", label: "Help Center" },
      { href: "/contact", label: "Contact Us" },
      { href: "https://status.footballpro.com", label: "System Status", external: true },
    ],
  } as const;

  const socialLinks = [
    { href: "https://twitter.com/footballpro", icon: Twitter, label: "Follow us on Twitter" },
    { href: "https://github.com/footballpro", icon: Github, label: "View our GitHub" },
    { href: "mailto:hello@footballpro.com", icon: Mail, label: "Send us an email" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black border-t border-gray-800/60">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Brand Section */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Trophy className="h-8 w-8 text-accent-green" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">FootballPro</div>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-lg leading-relaxed">
            The ultimate football management platform empowering teams and coaches 
            to achieve peak performance and strategic excellence.
          </p>
        </div>

        {/* Links Grid - Three columns in one row on all screens */}
        <div className="grid grid-cols-3 gap-4 sm:gap-12 mb-12 sm:mb-16 place-items-center sm:place-items-start">
          <FooterSection title="Product" items={links.product} />
          <FooterSection title="Support" items={links.support} />
          <FooterSection title="Company" items={links.company} />
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-8 sm:mb-12">
          {socialLinks.map((social) => (
            <SocialLink 
              key={social.label}
              href={social.href} 
              icon={social.icon}
              label={social.label}
            />
          ))}
        </div>

        {/* Newsletter Signup
        <div className="bg-gray-800/30 rounded-2xl p-6 sm:p-8 text-center mb-12 border border-gray-700/50">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-300 mb-4 text-sm sm:text-base">
            Get the latest features and football management tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-left pt-8 border-t border-gray-800/60 gap-4">
          <div className="text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} FootballPro. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-1 text-gray-400">
              Made with <Heart className="h-3 w-3 text-red-400 fill-current" /> for football
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, items }: { 
  title: string; 
  items: readonly { href: string; label: string; external?: boolean }[] 
}) {
  return (
    <div className="text-left sm:text-left">
      <h4 className="text-white font-semibold text-sm sm:text-base mb-4 tracking-wide">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link 
              href={item.href} 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base flex items-left  sm:justify-start gap-1 group"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.label}
              {item.external && (
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ 
  href, 
  icon: Icon, 
  label 
}: { 
  href: string; 
  icon: React.ComponentType<{ className?: string }>; 
  label: string;
}) {
  return (
    <Link 
      href={href} 
      aria-label={label}
      className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-gray-400 hover:text-white transition-all duration-200 hover:scale-105 border border-gray-700/50 hover:border-gray-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}