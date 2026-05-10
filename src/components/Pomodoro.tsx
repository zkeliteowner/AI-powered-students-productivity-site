import React, { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Volume2, 
  Music, 
  CloudRain, 
  Coffee, 
  Trees, 
  Wind,
  Bell,
  CheckCircle,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Mode = 'focus' | 'short-break' | 'long-break';

const Pomodoro = ({ user }: { user: User }) => {
  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const modeConfig = {
    'focus': { time: 25 * 60, label: 'Focus Time', color: 'text-brand-primary' },
    'short-break': { time: 5 * 60, label: 'Short Break', color: 'text-brand-accent' },
    'long-break': { time: 15 * 60, label: 'Long Break', color: 'text-blue-400' }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleComplete = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Notify
    if (Notification.permission === 'granted') {
      new Notification('Productify', { body: mode === 'focus' ? 'Focus session complete!' : 'Break over!' });
    }

    if (mode === 'focus') {
      setSessionsCompleted(prev => prev + 1);
      if ((sessionsCompleted + 1) % 4 === 0) {
        switchMode('long-break');
      } else {
        switchMode('short-break');
      }
    } else {
      switchMode('focus');
    }
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(modeConfig[newMode].time);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modeConfig[mode].time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / modeConfig[mode].time) * 100;

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center space-y-12 py-12">
      {/* Mode Switches */}
      <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
        {(['focus', 'short-break', 'long-break'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
              mode === m ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            {m.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="relative group">
         <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
         <div className="relative w-72 h-72 md:w-96 md:h-96 flex flex-col items-center justify-center glass rounded-full border-white/10">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
               <circle 
                  cx="50%" cy="50%" r="48%" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  className="text-white/5"
               />
               <motion.circle 
                  cx="50%" cy="50%" r="48%" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeDasharray="100 100"
                  pathLength="100"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: 100 - progress }}
                  transition={{ duration: 0.5 }}
                  className={modeConfig[mode].color}
                  strokeLinecap="round"
               />
            </svg>
            <div className="flex flex-col items-center gap-2">
               <span className="text-7xl md:text-9xl font-mono font-bold tracking-tighter tabular-nums">
                  {formatTime(timeLeft)}
               </span>
               <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {modeConfig[mode].label}
               </div>
            </div>
         </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
         <button 
           onClick={resetTimer}
           className="p-4 rounded-full glass hover:bg-white/10 text-slate-400 transition-all border-white/5 active:scale-90"
         >
            <RotateCcw size={24} />
         </button>
         <button 
           onClick={toggleTimer}
           className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-2xl shadow-brand-primary/40 hover:scale-105 active:scale-95 transition-all"
         >
            {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
         </button>
         <button 
            onClick={handleComplete}
            className="p-4 rounded-full glass hover:bg-white/10 text-slate-400 transition-all border-white/5 active:scale-90"
          >
            <SkipForward size={24} />
         </button>
      </div>

      {/* Stats and Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-4">
         {/* Ambient Sounds */}
         <div className="glass p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2"><Music size={16} /> Ambient Sounds</h3>
            <div className="grid grid-cols-3 gap-2">
               <SoundBtn active={selectedSound === 'rain'} label="Rain" icon={<CloudRain size={18} />} onClick={() => setSelectedSound(selectedSound === 'rain' ? null : 'rain')} />
               <SoundBtn active={selectedSound === 'cafe'} label="Café" icon={<Coffee size={18} />} onClick={() => setSelectedSound(selectedSound === 'cafe' ? null : 'cafe')} />
               <SoundBtn active={selectedSound === 'forest'} label="Forest" icon={<Trees size={18} />} onClick={() => setSelectedSound(selectedSound === 'forest' ? null : 'forest')} />
            </div>
            <div className="flex items-center gap-4 pt-2">
               <Volume2 size={16} className="text-slate-500" />
               <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-primary w-2/3"></div>
               </div>
            </div>
         </div>

         {/* Today's Progress */}
         <div className="glass p-6 rounded-3xl flex flex-col justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2"><Zap size={16} className="text-brand-accent" /> Focus Power</h3>
            <div className="flex items-end gap-3 pb-2 pt-4">
               {Array.from({ length: 4 }).map((_, i) => (
                 <div 
                  key={i} 
                  className={cn(
                    "w-full h-12 rounded-lg transition-all duration-700",
                    i < sessionsCompleted ? "bg-brand-primary/30 border border-brand-primary/50" : "bg-white/5 border border-white/5"
                  )}
                  style={{ height: `${20 + (i * 20)}px` }}
                 >
                   {i < sessionsCompleted && <div className="w-full h-full bg-brand-primary/40 rounded-lg flex items-center justify-center"><CheckCircle size={12} className="text-white" /></div>}
                 </div>
               ))}
            </div>
            <p className="text-xs text-slate-500 font-medium">Session {sessionsCompleted + 1} of 4 today</p>
         </div>
      </div>
    </div>
  );
};

function SoundBtn({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all active:scale-95",
        active ? "bg-brand-primary/10 border-brand-primary/40 text-brand-primary" : "bg-white/5 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/20"
      )}
    >
       {icon}
       <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    </button>
  );
}

export default Pomodoro;
