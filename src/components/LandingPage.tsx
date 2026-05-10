import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Brain, 
  Timer, 
  Calendar, 
  CheckCircle, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Search,
  BookOpen,
  Layout as LayoutIcon,
  GraduationCap
} from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import { cn } from '../lib/utils';
import TestimonialsSection from './ui/testimonial-v2';
import NavHeader from './ui/nav-header';
import { Footer } from './ui/footer-section';
import { HeroSection } from './ui/hero-section-with-smooth-bg-shader';

const LandingPage = () => {
  const handleStart = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-header">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-200">P</div>
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900">Productify</span>
          </div>
          <div className="hidden md:block">
            <NavHeader />
          </div>
          <button 
            onClick={handleStart}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all font-bold text-sm text-white shadow-md shadow-indigo-200 shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <HeroSection onButtonClick={handleStart} />

        {/* Features Bento */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 leading-tight">Everything a student needs.</h2>
              <p className="text-slate-600 font-medium">Stop switching between 7 different apps. Productify has everything unified in one high-performance interface.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Brain size={24} className="text-indigo-600" />} 
                title="AI Study Assistant" 
                desc="Summarize notes, explain complex topics, and generate quiz flashcards instantly."
                bg="bg-indigo-100"
                className="md:col-span-2 md:row-span-2"
              />
              <FeatureCard 
                icon={<Timer size={24} className="text-pink-600" />} 
                title="Pomodoro Timer" 
                desc="Deep focus work with built-in lo-fi and ambient sounds."
                bg="bg-pink-100"
              />
              <FeatureCard 
                icon={<BarChart3 size={24} className="text-teal-600" />} 
                title="GPA Calculator" 
                desc="Track your academic performance across semesters with ease."
                bg="bg-teal-100"
              />
              <FeatureCard 
                icon={<CheckCircle size={24} className="text-amber-600" />} 
                title="Task Manager" 
                desc="Smart Kanban board for assignments and exam prep."
                bg="bg-amber-100"
                className="md:col-span-2"
              />
              <FeatureCard 
                icon={<Calendar size={24} className="text-purple-600" />} 
                title="Smart Timetable" 
                desc="Dynamic schedule tailored to your lecture slots and study blocks."
                bg="bg-purple-100"
              />
            </div>
          </div>
        </section>

        {/* AI Showcase */}
        <section id="ai" className="py-24 px-6">
           <div className="max-w-7xl mx-auto glass-card p-8 lg:p-16 border-white/60 flex flex-col lg:flex-row gap-16 items-center bg-white/40">
              <div className="flex-1 space-y-8 text-center lg:text-left">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-widest">
                    Gemini AI Power
                 </div>
                 <h2 className="text-4xl lg:text-6xl font-display font-bold leading-tight text-slate-900">Your 24/7 personal<br /><span className="text-indigo-600">teaching assistant.</span></h2>
                 <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                   Ask any study question, upload your lecture notes for instant summaries, or generate entire study plans based on your exam dates.
                 </p>
                 <ul className="space-y-4 text-slate-700 font-bold text-sm">
                    <li className="flex items-center gap-3 justify-center lg:justify-start group">
                       <div className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 group-hover:scale-110 transition-transform">
                          <CheckCircle size={16} />
                       </div>
                       <span>Analyze PDF lecture notes in seconds</span>
                    </li>
                    <li className="flex items-center gap-3 justify-center lg:justify-start group">
                       <div className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 group-hover:scale-110 transition-transform">
                          <CheckCircle size={16} />
                       </div>
                       <span>Generate flashcards automatically</span>
                    </li>
                    <li className="flex items-center gap-3 justify-center lg:justify-start group">
                       <div className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 group-hover:scale-110 transition-transform">
                          <CheckCircle size={16} />
                       </div>
                       <span>Explain theories in simple analogies</span>
                    </li>
                 </ul>
              </div>
              <div className="flex-1 w-full max-w-xl">
                 <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-[32px] p-8 space-y-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-indigo-500 to-pink-500"></div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-900 shrink-0 shadow-sm">S</div>
                       <div className="bg-white/80 border border-slate-100 p-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-sm text-slate-800 shadow-sm leading-relaxed">
                          Hey! Can you summarize the concept of <span className="font-bold text-indigo-600">Quantum Entanglement</span>?
                       </div>
                    </div>
                    <div className="flex items-start gap-4 translate-x-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                          <Sparkles size={18} className="text-white" />
                       </div>
                       <div className="bg-indigo-600 text-white p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl text-sm space-y-3 shadow-xl">
                          <p className="leading-relaxed font-medium">Think of it like two magic coins: if you flip one in London and it lands heads, the other one in Tokyo instantly lands tails, no matter the distance!</p>
                          <p className="text-xs text-indigo-100 font-bold flex items-center gap-2">
                             ✨ Summary complete. Want flashcards?
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <TestimonialsSection />

        {/* Pricing */}
        <section id="pricing" className="py-24 relative overflow-hidden px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900">Simple for students.</h2>
              <p className="text-slate-600 font-medium">All core AI features are 100% free for verified students.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <PricingCard 
                 title="Student Free"
                 price="$0"
                 features={['Unlimited Notes & Timetable', 'AI Note Summaries (Free Tier)', 'Focus Timer with Ambient Audio', 'Basic GPA Tracker']}
                 btnText="Get Started Now"
                 onClick={handleStart}
               />
               <PricingCard 
                 title="Verified Scholar"
                 price="$2.99"
                 features={['Everything in Free', 'Priority AI Response Times', 'Advanced PDF Content Extraction', 'Collaborative Study Groups']}
                 btnText="Go Pro"
                 highlight
                 onClick={handleStart}
               />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

function FeatureCard({ icon, title, desc, bg, className }: { icon: React.ReactNode, title: string, desc: string, bg: string, className?: string }) {
  return (
    <div className={cn(
      "p-10 rounded-[32px] glass-card transition-all duration-500 group flex flex-col gap-6 border-white/60",
      className
    )}>
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-sm", bg)}>
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold font-display text-slate-900">{title}</h3>
        <p className="text-slate-600 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function PricingCard({ title, price, features, btnText, highlight, onClick }: { title: string, price: string, features: string[], btnText: string, highlight?: boolean, onClick: () => void }) {
  return (
    <div className={cn(
      "p-10 rounded-[40px] glass-card flex flex-col gap-10 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] border-white/60",
      highlight ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 border-indigo-500" : "bg-white/40"
    )}>
      {highlight && <div className="absolute top-0 right-0 px-6 py-2 bg-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl">Recommended</div>}
      <div className="space-y-2">
        <h3 className={cn("text-xl font-bold font-display", highlight ? "text-white" : "text-slate-900")}>{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-display font-bold leading-none">{price}</span>
          <span className={cn("font-bold text-xs uppercase tracking-widest", highlight ? "text-indigo-200" : "text-slate-500")}>/mo</span>
        </div>
      </div>
      <ul className="flex-1 space-y-5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-4 text-sm font-bold leading-tight">
            <CheckCircle size={18} className={cn("shrink-0 mt-0.5", highlight ? "text-indigo-200" : "text-indigo-600")} />
            <span className={highlight ? "text-white" : "text-slate-600"}>{f}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={onClick}
        className={cn(
        "w-full py-5 rounded-2xl font-bold transition-all shadow-xl text-md",
        highlight ? "bg-white text-indigo-600 hover:bg-slate-50 shadow-indigo-800/20" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
      )}>
        {btnText}
      </button>
    </div>
  );
}

export default LandingPage;
