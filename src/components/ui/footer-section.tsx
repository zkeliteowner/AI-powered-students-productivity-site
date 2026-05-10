'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  FacebookIcon, 
  LinkedinIcon, 
  Globe, 
  Sparkles,
  Layout
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Home', href: '#' },
			{ title: 'Features', href: '#features' },
			{ title: 'AI Assistant', href: '#ai' },
			{ title: 'Reviews', href: '#testimonials' },
			{ title: 'Pricing', href: '#pricing' },
		],
	},
	{
		label: 'Legal',
		links: [
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Service', href: '#' },
			{ title: 'Cookie Policy', href: '#' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '#' },
			{ title: 'Changelog', href: '#' },
			{ title: 'Support', href: '#' },
		],
	},
	{
		label: 'Social Connect',
		links: [
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/umar-hayatdc', icon: LinkedinIcon },
			{ title: 'Facebook', href: 'https://web.facebook.com/seraphicumar', icon: FacebookIcon },
			{ title: 'My Website', href: 'https://zkelite.com/', icon: Globe },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative w-full max-w-7xl mx-auto px-6 py-12 lg:py-16 mt-20">
      <div className="glass-card p-10 lg:p-16 border-white/60 bg-white/40 backdrop-blur-md rounded-[40px] overflow-hidden relative group">
        {/* Decorative highlights matching the theme */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transition-all group-hover:bg-indigo-500/20" />
        
        <div className="grid w-full gap-12 lg:grid-cols-4 lg:gap-8 relative z-10">
          <AnimatedContainer className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200">P</div>
              <span className="font-display font-bold text-xl text-slate-900">Productify</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              The ultimate workspace for modern students. Built with ❤️ for the next generation of scholars.
            </p>
            <div className="pt-4">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">© {new Date().getFullYear()} Productify.</p>
              <p className="text-slate-400 text-[10px] uppercase font-bold mt-1 tracking-tighter italic">Academic Operating System</p>
            </div>
          </AnimatedContainer>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-3">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">{section.label}</h3>
                  <ul className="text-slate-500 space-y-3 text-sm font-bold">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? "_blank" : "_self"}
                          rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="hover:text-indigo-600 inline-flex items-center transition-all duration-300 group"
                        >
                          {link.icon && <link.icon className="me-2 size-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: string;
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: 8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
