import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Clock,
  MoreVertical,
  BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';

const Timetable = ({ user }: { user: User }) => {
  const [activeView, setActiveView] = useState<'weekly' | 'reading'>('weekly');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-bold font-display">Schedule</h1>
           <p className="text-slate-400">Manage your classes and reading milestones.</p>
        </div>
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
           <button 
             onClick={() => setActiveView('weekly')}
             className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", activeView === 'weekly' ? "bg-white/10 text-white" : "text-slate-500")}
           >
             Weekly Grid
           </button>
           <button 
             onClick={() => setActiveView('reading')}
             className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", activeView === 'reading' ? "bg-white/10 text-white" : "text-slate-500")}
           >
             Reading Plan
           </button>
        </div>
      </header>

      {activeView === 'weekly' ? (
        <div className="glass rounded-[40px] overflow-hidden border-white/10 shadow-2xl">
           <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                 <thead>
                    <tr className="bg-white/5">
                       <th className="p-4 border-r border-white/5 w-24"></th>
                       {days.map(day => (
                         <th key={day} className="p-4 border-r border-white/5 text-xs font-mono uppercase tracking-widest text-slate-500 font-bold min-w-[150px]">
                            {day.slice(0, 3)}
                         </th>
                       ))}
                    </tr>
                 </thead>
                 <tbody>
                    {times.map(time => (
                      <tr key={time} className="border-b border-white/5">
                         <td className="p-4 border-r border-white/5 text-xs font-mono text-slate-600 font-bold text-center">
                            {time}
                         </td>
                         {days.map(day => (
                           <td key={`${day}-${time}`} className="p-2 border-r border-white/5 h-24 relative group">
                              {(day === 'Monday' && time === '10:00') && (
                                <ScheduleBlock color="purple" label="Mathematics" room="Room 204" />
                              )}
                              {(day === 'Wednesday' && time === '14:00') && (
                                <ScheduleBlock color="blue" label="Physics Lab" room="Lab 5" />
                              )}
                              {(day === 'Friday' && time === '08:00') && (
                                <ScheduleBlock color="green" label="English Lit" room="Hall A" />
                              )}
                              <button className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-brand-primary/10 transition-opacity">
                                 <Plus size={20} className="text-brand-primary" />
                              </button>
                           </td>
                         ))}
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 space-y-6">
              <div className="glass p-8 rounded-3xl space-y-6">
                 <h2 className="text-xl font-bold flex items-center gap-2"><BookOpen size={20} className="text-purple-400" /> New Reading Plan</h2>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase">Book Title</label>
                       <input type="text" placeholder="e.g. Modern Physics" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">Pages</label>
                          <input type="number" placeholder="250" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">Deadline</label>
                          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden" />
                       </div>
                    </div>
                    <button className="w-full py-4 bg-brand-primary rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-lg">Generate Plan</button>
                 </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                 <h3 className="font-bold mb-4">How it works</h3>
                 <p className="text-sm text-slate-400 leading-relaxed">Enter your book details and exam date. We'll crunch the numbers and give you a daily page target to ensure you finish on time with zero stress.</p>
              </div>
           </div>

           <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-bold">Active Plans</h2>
              <div className="glass p-8 rounded-3xl flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-700">
                     <BookOpen size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-slate-300">No active reading plans</p>
                    <p className="text-sm text-slate-500">Create a plan on the left to get started.</p>
                  </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

function ScheduleBlock({ color, label, room }: { color: 'purple' | 'blue' | 'green' | 'orange', label: string, room: string }) {
  const colors = {
    purple: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    blue: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
    green: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    orange: 'bg-orange-500/20 border-orange-500/40 text-orange-300'
  };

  return (
    <div className={cn(
      "absolute inset-1 p-2 rounded-xl border flex flex-col justify-between z-10 shadow-lg",
      colors[color]
    )}>
       <p className="text-[10px] font-bold leading-tight truncate">{label}</p>
       <div className="flex items-center gap-1 opacity-60">
          <MapPin size={8} />
          <span className="text-[8px] font-bold uppercase">{room}</span>
       </div>
    </div>
  );
}

export default Timetable;
