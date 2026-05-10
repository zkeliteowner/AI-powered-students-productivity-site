import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  CheckSquare, 
  Timer, 
  BrainCircuit, 
  BarChart3, 
  Calculator, 
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { logout } from '../lib/firebase';
import { cn } from '../lib/utils';

// Subpages
import Overview from './Overview';
import Notes from './Notes';
import Tasks from './Tasks';
import Timetable from './Timetable';
import Pomodoro from './Pomodoro';
import AIAssistant from './AIAssistant';
import Analytics from './Analytics';
import GPA from './GPA';

type Tab = 'overview' | 'notes' | 'tasks' | 'timetable' | 'pomodoro' | 'ai' | 'analytics' | 'gpa' | 'settings';

const Dashboard = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'notes', label: 'Notes', icon: <FileText size={20} /> },
    { id: 'tasks', label: 'Assignments', icon: <CheckSquare size={20} /> },
    { id: 'timetable', label: 'Timetable', icon: <Calendar size={20} /> },
    { id: 'pomodoro', label: 'Focus Timer', icon: <Timer size={20} /> },
    { id: 'ai', label: 'AI Assistant', icon: <BrainCircuit size={20} /> },
    { id: 'analytics', label: 'Progress', icon: <BarChart3 size={20} /> },
    { id: 'gpa', label: 'GPA Calc', icon: <Calculator size={20} /> },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-64 glass-sidebar z-50 transition-transform lg:translate-x-0 overflow-y-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg text-white">P</div>
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight">Productify</span>
            </div>
            <button className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  activeTab === item.id 
                    ? "bg-white/60 text-indigo-700 shadow-sm border border-white/50" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/20"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/30 space-y-1">
            <button
               onClick={() => setActiveTab('settings')}
               className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                activeTab === 'settings' ? "bg-white/60 text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-white/20"
              )}
            >
              <Settings size={20} />
              Settings
            </button>
            <button 
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          <div className="mt-auto pt-8">
             <div className="p-4 bg-indigo-600/10 rounded-2xl border border-indigo-200/50">
                <p className="text-xs font-bold text-indigo-700 uppercase mb-1 tracking-widest">Student Plan</p>
                <p className="text-xs text-slate-600 mb-3 leading-tight">All AI tools are 100% free for verified students.</p>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:scale-[1.05] transition-transform">Get Verified</button>
             </div>
             <div className="mt-6 flex items-center gap-3 px-2">
                <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                <div className="overflow-hidden">
                   <p className="text-sm font-bold truncate text-slate-900">{user.displayName || 'User'}</p>
                   <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 glass-header px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button className="lg:hidden p-2 hover:bg-white/20 rounded-lg text-slate-600" onClick={() => setSidebarOpen(true)}>
               <Menu size={20} />
             </button>
             <h2 className="text-lg font-bold font-display text-slate-900 capitalize md:block hidden">
                {menuItems.find(i => i.id === activeTab)?.label || activeTab}
             </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group md:block hidden">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
               <input 
                type="text" 
                placeholder="Search everything..."
                className="pl-10 pr-4 py-2 bg-white/40 border border-white/60 rounded-full text-sm outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all w-64 text-slate-800 placeholder-slate-500"
               />
            </div>
            <button className="p-2 hover:bg-white/30 rounded-full relative text-slate-600">
               <Bell size={20} />
               <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-white shadow-sm"></span>
            </button>
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-md shadow-indigo-200"
              onClick={() => {
                if(activeTab === 'notes') {} // Trigger new note
              }}
            >
               <Plus size={18} />
               <span className="md:block hidden">Create New</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
           {activeTab === 'overview' && <Overview user={user} setActiveTab={setActiveTab} />}
           {activeTab === 'notes' && <Notes user={user} />}
           {activeTab === 'tasks' && <Tasks user={user} />}
           {activeTab === 'timetable' && <Timetable user={user} />}
           {activeTab === 'pomodoro' && <Pomodoro user={user} />}
           {activeTab === 'ai' && <AIAssistant user={user} />}
           {activeTab === 'analytics' && <Analytics user={user} />}
           {activeTab === 'gpa' && <GPA user={user} />}
           {activeTab === 'settings' && (
             <div className="max-w-2xl mx-auto py-12">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>
                <div className="glass p-8 rounded-3xl space-y-8">
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="font-bold">Dark Mode</p>
                         <p className="text-sm text-slate-400">Manage your appearance</p>
                      </div>
                      <div className="w-12 h-6 bg-brand-primary rounded-full relative p-1 flex items-center cursor-pointer">
                         <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
                      </div>
                   </div>
                   <div className="border-t border-white/5 pt-8">
                      <p className="font-bold mb-4">Email Notifications</p>
                      <label className="flex items-center gap-3 cursor-pointer">
                         <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-primary focus:ring-brand-primary" />
                         <span className="text-sm">Daily study reminders</span>
                      </label>
                   </div>
                </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
