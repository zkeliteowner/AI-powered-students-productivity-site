import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: any;
}

const Tasks = ({ user }: { user: User }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, `users/${user.uid}/tasks`),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Task));
      setTasks(taskList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    await addDoc(collection(db, `users/${user.uid}/tasks`), {
      title: newTaskTitle,
      userId: user.uid,
      status: 'todo',
      priority: 'medium',
      createdAt: serverTimestamp(),
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString() // Default 2 days
    });

    setNewTaskTitle('');
    setShowAddForm(false);
  };

  const toggleStatus = async (task: Task) => {
    const nextStatus = task.status === 'done' ? 'todo' : 'done';
    await updateDoc(doc(db, `users/${user.uid}/tasks`, task.id), {
      status: nextStatus
    });
  };

  const deleteTask = async (id: string) => {
     if(confirm('Delete this task?')) {
        await deleteDoc(doc(db, `users/${user.uid}/tasks`, id));
     }
  }

  const todoTasks = tasks.filter(t => t.status !== 'done');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold font-display">Assignments</h1>
            <p className="text-slate-400">Keep track of your deadlines and study tasks.</p>
         </div>
         <button 
           onClick={() => setShowAddForm(true)}
           className="px-5 py-2.5 bg-brand-primary rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-[1.05] transition-all shadow-lg shadow-brand-primary/20"
         >
           <Plus size={18} /> Add Assignment
         </button>
      </div>

      {showAddForm && (
        <div className="glass p-6 rounded-2xl animate-in zoom-in duration-200">
           <form onSubmit={handleAddTask} className="flex gap-4">
              <input 
                 autoFocus
                 type="text" 
                 placeholder="Assignment title..."
                 className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 outline-hidden focus:ring-2 focus:ring-brand-primary"
                 value={newTaskTitle}
                 onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <button type="submit" className="px-6 py-2 bg-brand-primary rounded-xl font-bold text-sm">Save</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 hover:bg-white/5 rounded-xl text-sm">Cancel</button>
           </form>
        </div>
      )}

      <div className="space-y-6">
         <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">In Progress</h2>
            <div className="space-y-2">
               {todoTasks.length === 0 ? (
                 <div className="p-8 text-center glass rounded-2xl border-dashed border-white/5 text-slate-500 italic text-sm">
                    No active tasks. Take a break!
                 </div>
               ) : (
                 todoTasks.map(task => (
                   <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={() => toggleStatus(task)} 
                    onDelete={() => deleteTask(task.id)}
                  />
                 ))
               )}
            </div>
         </section>

         {doneTasks.length > 0 && (
           <section className="space-y-4 opacity-60">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">Completed</h2>
              <div className="space-y-2">
                 {doneTasks.map(task => (
                   <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={() => toggleStatus(task)} 
                    onDelete={() => deleteTask(task.id)}
                  />
                 ))}
              </div>
           </section>
         )}
      </div>
    </div>
  );
};

function TaskItem({ task, onToggle, onDelete }: { task: Task, onToggle: () => void, onDelete: () => void }) {
  const isDone = task.status === 'done';

  return (
    <div className={cn(
      "group w-full flex items-center gap-4 p-4 rounded-2xl glass border-white/5 transition-all hover:border-white/10",
      isDone ? "bg-white/2" : "bg-white/5"
    )}>
       <button onClick={onToggle} className="shrink-0 transition-transform active:scale-90">
          {isDone ? (
            <CheckCircle2 size={24} className="text-brand-accent" />
          ) : (
            <Circle size={24} className="text-slate-600 group-hover:text-brand-primary" />
          )}
       </button>
       <div className="flex-1 min-w-0">
          <p className={cn("font-bold text-sm truncate", isDone && "line-through text-slate-600")}>{task.title}</p>
          <div className="flex items-center gap-4 mt-1">
             <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                <Clock size={12} className="text-slate-600" />
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
             </div>
             {task.priority === 'high' && (
               <div className="flex items-center gap-1 text-[10px] text-red-400 font-bold uppercase tracking-wider bg-red-400/10 px-2 py-0.5 rounded">
                  <AlertCircle size={10} /> Urgent
               </div>
             )}
          </div>
       </div>
       <button 
        onClick={onDelete}
        className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white/5 rounded-lg text-slate-700 hover:text-red-500 transition-all"
       >
          <Trash2 size={18} />
       </button>
    </div>
  );
}

export default Tasks;
