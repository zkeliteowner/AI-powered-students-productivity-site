import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Info,
  TrendingUp,
  Target,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  points: number;
}

const GPA = ({ user }: { user: User }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Mathematics', credits: 4, grade: 'A', points: 4.0 },
    { id: '2', name: 'Physics', credits: 3, grade: 'B+', points: 3.3 },
    { id: '3', name: 'English Literature', credits: 3, grade: 'A-', points: 3.7 },
  ]);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const calculateGPA = () => {
    if (courses.length === 0) return 0;
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const totalPoints = courses.reduce((sum, c) => sum + (c.credits * c.points), 0);
    return totalCredits === 0 ? 0 : (totalPoints / totalCredits);
  };

  const gpa = calculateGPA();

  const addCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      credits: 3,
      grade: 'A',
      points: 4.0
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold font-display text-white">GPA Calculator</h1>
            <p className="text-slate-400">Track your academic standing precisely.</p>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Calculator Area */}
         <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-[40px] overflow-hidden border-white/10 shadow-2xl">
               <div className="p-6 bg-white/5 border-b border-white/5 grid grid-cols-12 gap-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest text-center">
                  <div className="col-span-6 text-left ml-2">Subject Name</div>
                  <div className="col-span-2">Credits</div>
                  <div className="col-span-2">Grade</div>
                  <div className="col-span-2">Action</div>
               </div>
               <div className="p-4 space-y-2">
                  {courses.map(course => (
                    <div key={course.id} className="grid grid-cols-12 gap-4 items-center bg-white/2 hover:bg-white/5 transition-all p-2 rounded-2xl group border border-transparent hover:border-white/5">
                       <div className="col-span-6">
                          <input 
                            type="text" 
                            className="w-full bg-transparent border-none outline-hidden px-2 text-sm font-medium"
                            placeholder="Course Name..."
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                          />
                       </div>
                       <div className="col-span-2">
                          <input 
                            type="number" 
                            className="w-full bg-white/5 rounded-lg border border-white/5 text-center py-1.5 text-sm outline-hidden focus:ring-1 focus:ring-brand-primary"
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, { credits: parseInt(e.target.value) || 0 })}
                          />
                       </div>
                       <div className="col-span-2 relative h-full">
                          <select 
                            className="w-full h-full bg-white/5 rounded-lg border border-white/5 text-center py-1.5 text-sm outline-hidden cursor-pointer appearance-none px-2"
                            value={course.grade}
                            onChange={(e) => {
                               const g = e.target.value;
                               updateCourse(course.id, { grade: g, points: gradePoints[g] });
                            }}
                          >
                             {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                       </div>
                       <div className="col-span-2 flex justify-center">
                          <button 
                            onClick={() => deleteCourse(course.id)}
                            className="p-2 text-slate-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                  ))}
                  <button 
                    onClick={addCourse}
                    className="w-full py-4 mt-4 border-2 border-dashed border-white/5 rounded-2xl text-slate-500 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                  >
                     <Plus size={18} /> Add Subject
                  </button>
               </div>
            </div>
         </div>

         {/* Summary Area */}
         <div className="space-y-6">
            <div className={cn(
              "p-8 rounded-[40px] text-center space-y-4 border transition-all duration-500",
              gpa >= 3.5 ? "glass bg-emerald-500/10 border-emerald-500/20 shadow-2xl shadow-emerald-500/10" : 
              gpa >= 2.5 ? "glass border-brand-primary/20 bg-brand-primary/5 shadow-2xl shadow-brand-primary/10" : "glass bg-red-500/10 border-red-500/20 shadow-2xl shadow-red-500/10"
            )}>
               <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Current GPA</p>
               <h2 className={cn(
                "text-7xl font-display font-bold leading-none",
                gpa >= 3.5 ? "text-emerald-400" : gpa >= 2.5 ? "text-brand-primary" : "text-red-400"
               )}>
                  {gpa.toFixed(2)}
               </h2>
               <div className="pt-4">
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                    {gpa >= 3.5 ? 'Excellent Standing ✨' : gpa >= 2.5 ? 'Good Progress 👍' : 'Need Improvement 💪'}
                  </span>
               </div>
            </div>

            <div className="glass p-8 rounded-[40px] space-y-6">
               <h3 className="font-bold border-b border-white/5 pb-4">Stats Summary</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400">Total Credits</span>
                     <span className="font-bold">{courses.reduce((sum, c) => sum + c.credits, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400">Total Points</span>
                     <span className="font-bold">{(courses.reduce((sum, c) => sum + (c.credits * c.points), 0)).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
                     <span className="text-slate-400">Target GPA</span>
                     <span className="font-bold flex items-center gap-1 text-brand-accent">4.00 <Target size={14} /></span>
                  </div>
               </div>
            </div>
            
            <div className="glass p-6 rounded-3xl bg-linear-to-br from-brand-primary/5 to-transparent border-brand-primary/10">
               <div className="flex gap-3 items-start">
                  <Info className="text-brand-primary mt-0.5" size={18} />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This calculation uses the standard 4.0 weighted scale. You can modify your university settings in the profile section soon.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GPA;
