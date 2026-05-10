import React from 'react';
import { User } from 'firebase/auth';
import { motion } from 'motion/react';
import { 
  Timer, 
  CheckCircle, 
  Calendar, 
  Flame, 
  TrendingUp, 
  BookOpen,
  ArrowRight,
  Clock,
  Layout as LayoutIcon,
  Sparkles,
  Calculator
} from 'lucide-react';
import { cn } from '../lib/utils';

interface OverviewProps {
  user: User;
  setActiveTab: (tab: any) => void;
}

const Overview = ({ user, setActiveTab }: OverviewProps) => {
  const hoursGoal = 4;
  const hoursDone = 2.2;
  const progress = (hoursDone / hoursGoal) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Welcome back,</p>
           <h1 className="text-4xl font-bold font-display text-slate-900">{user.displayName?.split(' ')[0] || 'Scholar'} 👋</h1>
        </div>
        <div className="flex items-center gap-3 glass px-4 py-2 rounded-2xl border-white/40 shadow-sm">
           <Calendar size={18} className="text-slate-500" />
           <span className="text-sm font-semibold text-slate-700">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Circle Widget */}
        <div className="lg:col-span-1 glass-card p-8 flex flex-col items-center justify-center text-center gap-6 border-white/60">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-200/50"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={440}
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-indigo-600"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-3xl font-bold font-display text-slate-900">{progress}%</span>
               <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Goal</span>
            </div>
          </div>
          <div className="space-y-1">
             <h3 className="font-bold text-xl text-slate-900">{hoursDone} / {hoursGoal} hrs</h3>
             <p className="text-sm text-slate-500">You're making great progress! ✨</p>
          </div>
        </div>

        {/* Schedule Widget */}
        <div className="lg:col-span-2 glass-card overflow-hidden flex flex-col border-white/60">
           <div className="p-6 border-b border-white/30 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-slate-900"><Calendar size={18} className="text-indigo-600" /> Today's Schedule</h3>
              <button 
                onClick={() => setActiveTab('timetable')}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                View Full
              </button>
           </div>
           <div className="flex-1 p-6 space-y-3">
              <ScheduleItem time="09:00 AM" label="Mathematics" room="R 204" active />
              <ScheduleItem time="11:30 AM" label="Physics Lab" room="Lab 2" />
              <ScheduleItem time="02:00 PM" label="English Lit" room="Hall A" />
              <ScheduleItem time="04:30 PM" label="Self Study: Calc" room="Home" />
           </div>
        </div>

        {/* Tasks Summary */}
        <div className="lg:col-span-2 glass-card overflow-hidden border-white/60">
           <div className="p-6 border-b border-white/30 flex items-center justify-between text-slate-900">
              <h3 className="font-bold flex items-center gap-2"><CheckCircle size={18} className="text-pink-500" /> Upcoming Deadlines</h3>
              <button 
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                Go to Tasks
              </button>
           </div>
           <div className="p-6 space-y-3">
              <DeadlineItem title="Math Assignment #4" due="Tomorrow" priority="high" />
              <DeadlineItem title="Physics Lab Report" due="In 3 days" priority="medium" />
              <DeadlineItem title="History Essay Draft" due="In 5 days" priority="low" />
           </div>
        </div>

        {/* AI Tip Widget */}
        <div className="glass-card p-6 bg-linear-to-br from-indigo-600/10 to-purple-600/10 border-white/60 flex flex-col justify-between group">
           <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                 <Sparkles size={20} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-xl leading-tight text-slate-900">AI Study Hack</h3>
              <p className="text-sm text-slate-600 leading-relaxed italic">"Explaining concepts to others helps solidify logic. Try using the AI Assistant to roleplay a student asking YOU questions."</p>
           </div>
           <button 
            onClick={() => setActiveTab('ai')}
            className="w-full py-3 mt-6 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:scale-[1.02] transition-all text-xs font-bold flex items-center justify-center gap-2"
           >
             Chat with AI <ArrowRight size={14} />
           </button>
        </div>
      </div>

      {/* Quick Access Grid */}
      <section>
        <h2 className="text-xl font-bold font-display text-slate-900 mb-6 px-1">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <QuickLink icon={<Timer size={22} className="text-pink-500" />} label="Pomodoro" onClick={() => setActiveTab('pomodoro')} />
           <QuickLink icon={<Calculator size={22} className="text-indigo-600" />} label="GPA Calc" onClick={() => setActiveTab('gpa')} />
           <QuickLink icon={<BookOpen size={22} className="text-purple-600" />} label="My Notes" onClick={() => setActiveTab('notes')} />
           <QuickLink icon={<TrendingUp size={22} className="text-teal-600" />} label="Analytics" onClick={() => setActiveTab('analytics')} />
        </div>
      </section>
    </div>
  );
};

function ScheduleItem({ time, label, room, active }: { time: string, label: string, room: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-2xl border transition-all",
      active ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-200 scale-[1.02]" : "bg-white/40 border-white shadow-sm hover:bg-white/60"
    )}>
       <div className="flex items-center gap-4">
          <div className={cn("px-2 py-1 rounded-lg text-[10px] font-mono font-bold", active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500")}>
             {time}
          </div>
          <div>
             <p className={cn("font-bold text-sm", active ? "text-white" : "text-slate-900")}>{label}</p>
             <p className={cn("text-xs", active ? "text-indigo-100" : "text-slate-500")}>{room}</p>
          </div>
       </div>
       {active && <div className="text-[10px] uppercase font-bold tracking-widest text-white/80 animate-pulse">Now Playing</div>}
    </div>
  );
}

function DeadlineItem({ title, due, priority }: { title: string, due: string, priority: 'high' | 'medium' | 'low' }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 border border-white hover:border-white/80 hover:bg-white/60 transition-all cursor-pointer group shadow-sm">
       <div className="flex items-center gap-4">
          <div className={cn("w-2 h-2 rounded-full shadow-xs", priority === 'high' ? 'bg-pink-500' : priority === 'medium' ? 'bg-indigo-500' : 'bg-teal-500')}></div>
          <span className="text-sm font-bold text-slate-900 uppercase text-[11px] tracking-tight">{title}</span>
       </div>
       <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">{due}</span>
          <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
       </div>
    </div>
  );
}

function QuickLink({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-8 rounded-3xl glass-card border-white/60 hover:bg-white/80 transition-all flex flex-col items-center gap-4 group"
    >
       <div className="p-3 rounded-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all bg-white shadow-sm ring-1 ring-black/5">
          {icon}
       </div>
       <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-indigo-600 transition-colors">{label}</span>
    </button>
  );
}

export default Overview;
