import React from 'react';
import { User } from 'firebase/auth';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  Calendar,
  Download
} from 'lucide-react';
import { cn } from '../lib/utils';

const Analytics = ({ user }: { user: User }) => {
  const weeklyData = [
    { name: 'Mon', hours: 4.2 },
    { name: 'Tue', hours: 3.8 },
    { name: 'Wed', hours: 2.5 },
    { name: 'Thu', hours: 5.1 },
    { name: 'Fri', hours: 4.6 },
    { name: 'Sat', hours: 2.0 },
    { name: 'Sun', hours: 1.5 },
  ];

  const subjectData = [
    { name: 'Math', value: 35, color: '#7C3AED' },
    { name: 'Physics', value: 25, color: '#2563EB' },
    { name: 'English', value: 20, color: '#06B6D4' },
    { name: 'Others', value: 20, color: '#10B981' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold font-display">Study Analytics</h1>
            <p className="text-slate-400">Deep dive into your productivity patterns.</p>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all border-white/5">
            <Download size={16} /> Export Report
         </button>
      </header>

      {/* Stats Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatCard label="Total Focus" value="23.7h" change="+12% vs LW" icon={<Clock size={16} className="text-brand-primary" />} />
         <StatCard label="Goal Completion" value="84%" change="+5%" icon={<Target size={16} className="text-brand-accent" />} />
         <StatCard label="Peak Hour" value="10 AM" change="Consistent" icon={<Zap size={16} className="text-orange-400" />} />
         <StatCard label="Sessions" value="48" change="+8" icon={<Calendar size={16} className="text-blue-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Weekly Trend */}
         <div className="lg:col-span-2 glass p-8 rounded-[40px] space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-lg font-bold">Study Hours Trend</h3>
               <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs outline-hidden">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
               </select>
            </div>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                     />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                        itemStyle={{ color: '#7C3AED' }}
                     />
                     <Bar 
                        dataKey="hours" 
                        fill="#7C3AED" 
                        radius={[6, 6, 0, 0]} 
                        barSize={40}
                     />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Subject Breakdown */}
         <div className="glass p-8 rounded-[40px] space-y-8 flex flex-col">
            <h3 className="text-lg font-bold">Subject Distribution</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={subjectData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {subjectData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  {subjectData.map(s => (
                    <div key={s.name} className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                       <span className="text-xs text-slate-400">{s.name}</span>
                       <span className="text-xs font-bold ml-auto">{s.value}%</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Concentration Level */}
         <div className="lg:col-span-3 glass p-8 rounded-[40px]">
             <h3 className="text-lg font-bold mb-8">Productivity Heatmap</h3>
             <div className="flex flex-wrap gap-2">
                {Array.from({ length: 91 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-4 h-4 rounded-sm transition-all hover:scale-125",
                      i % 7 === 0 ? "bg-brand-primary/80" : 
                      i % 5 === 0 ? "bg-brand-primary/40" : 
                      i % 3 === 0 ? "bg-brand-primary/20" : "bg-white/5"
                    )}
                    title={`Day ${i}: 4.5 hours`}
                  ></div>
                ))}
             </div>
             <div className="flex items-center gap-4 mt-6 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                <span>Less</span>
                <div className="flex gap-1">
                   <div className="w-3 h-3 bg-white/5 rounded-sm"></div>
                   <div className="w-3 h-3 bg-brand-primary/20 rounded-sm"></div>
                   <div className="w-3 h-3 bg-brand-primary/40 rounded-sm"></div>
                   <div className="w-3 h-3 bg-brand-primary/80 rounded-sm"></div>
                </div>
                <span>More</span>
             </div>
         </div>
      </div>
    </div>
  );
};

function StatCard({ label, value, change, icon }: { label: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="glass p-6 rounded-3xl space-y-2 relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">{icon}</div>
       <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">{label}</p>
       <div className="flex items-baseline gap-2">
          <span className="text-2xl font-display font-bold">{value}</span>
          <span className="text-[10px] text-emerald-400 font-bold">{change}</span>
       </div>
    </div>
  );
}

export default Analytics;
