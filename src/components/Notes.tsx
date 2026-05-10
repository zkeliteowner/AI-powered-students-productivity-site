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
  Search, 
  Plus, 
  FileText, 
  Trash2, 
  ChevronRight, 
  Sparkles,
  Loader2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { generateStudySummary } from '../lib/gemini';
import Markdown from 'react-markdown';

interface Note {
  id: string;
  title: string;
  content: string;
  subjectId?: string;
  userId: string;
  createdAt: any;
}

const Notes = ({ user }: { user: User }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, `users/${user.uid}/notes`),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesList = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Note));
      setNotes(notesList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleCreateNote = async () => {
    const newNote = {
      title: 'Untitled Note',
      content: '',
      userId: user.uid,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, `users/${user.uid}/notes`), newNote);
    setActiveNote({ id: docRef.id, ...newNote } as Note);
    setIsEditing(true);
  };

  const handleUpdateNote = async (id: string, updates: Partial<Note>) => {
    await updateDoc(doc(db, `users/${user.uid}/notes`, id), updates);
  };

  const handleDeleteNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(confirm('Delete this note?')) {
      await deleteDoc(doc(db, `users/${user.uid}/notes`, id));
      if (activeNote?.id === id) setActiveNote(null);
    }
  };

  const handleSummarize = async () => {
    if (!activeNote?.content) return;
    setIsSummarizing(true);
    try {
      const summary = await generateStudySummary(activeNote.content);
      if (summary) {
        const updatedContent = `${activeNote.content}\n\n## AI Summary\n${summary}`;
        await handleUpdateNote(activeNote.id, { content: updatedContent });
        setActiveNote({ ...activeNote, content: updatedContent } as Note);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  };

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-full flex gap-6 overflow-hidden">
      {/* Sidebar List */}
      <div className={cn(
        "flex flex-col gap-4 transition-all duration-300",
        activeNote ? "w-1/3 hidden md:flex" : "w-full"
      )}>
        <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold">My Notes</h1>
           <button 
            onClick={handleCreateNote}
            className="p-2 bg-brand-primary rounded-lg text-white hover:scale-105 transition-transform"
           >
             <Plus size={20} />
           </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-hidden"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
           {loading ? (
             <div className="flex justify-center p-8">
               <Loader2 className="animate-spin text-brand-primary" />
             </div>
           ) : filteredNotes.length === 0 ? (
             <p className="text-center text-slate-500 py-12 text-sm italic">No notes found. Create your first one!</p>
           ) : (
             filteredNotes.map(note => (
               <div 
                 key={note.id}
                 onClick={() => setActiveNote(note)}
                 className={cn(
                   "p-4 rounded-2xl border transition-all cursor-pointer group flex items-start justify-between",
                   activeNote?.id === note.id ? "bg-brand-primary/10 border-brand-primary/40 shadow-lg" : "bg-white/5 border-white/5 hover:border-white/20"
                 )}
               >
                 <div className="flex gap-3">
                    <FileText className={cn("mt-1 shrink-0", activeNote?.id === note.id ? "text-brand-primary" : "text-slate-500")} size={18} />
                    <div>
                       <p className="font-bold text-sm truncate max-w-[200px]">{note.title || 'Untitled Note'}</p>
                       <p className="text-xs text-slate-500 mt-1">
                          {note.content?.slice(0, 50) || 'No content yet...'}
                       </p>
                    </div>
                 </div>
                 <button 
                  onClick={(e) => handleDeleteNote(note.id, e)}
                  className="p-1 text-slate-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                 >
                   <Trash2 size={16} />
                 </button>
               </div>
             ))
           )}
        </div>
      </div>

      {/* Note Editor */}
      {activeNote ? (
        <div className="flex-1 flex flex-col glass rounded-3xl overflow-hidden border-white/10 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
           {/* Editor Header */}
           <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                 <button className="md:hidden p-2 hover:bg-white/10 rounded-lg" onClick={() => setActiveNote(null)}>
                    <ChevronRight className="rotate-180" size={20} />
                 </button>
                 <span className="text-xs font-mono text-brand-accent uppercase tracking-widest hidden sm:block">Editor</span>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                  onClick={handleSummarize}
                  disabled={isSummarizing || !activeNote.content}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold hover:bg-purple-500/20 disabled:opacity-50 transition-all"
                 >
                    {isSummarizing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    <span className="hidden sm:inline">{isSummarizing ? 'Summarizing...' : 'AI Summarize'}</span>
                 </button>
                 <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-white/10 rounded-lg text-slate-400"
                 >
                   {isEditing ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                 </button>
              </div>
           </div>

           {/* Content Area */}
           <div className="flex-1 flex flex-col p-6 lg:p-12 overflow-y-auto">
              <input 
                 type="text" 
                 value={activeNote.title} 
                 onChange={(e) => {
                    const val = e.target.value;
                    setActiveNote({ ...activeNote, title: val });
                    handleUpdateNote(activeNote.id, { title: val });
                 }}
                 placeholder="Note Title"
                 className="text-4xl lg:text-5xl font-display font-bold bg-transparent outline-hidden w-full mb-8 placeholder-slate-700"
              />
              {isEditing ? (
                <textarea 
                   value={activeNote.content}
                   onChange={(e) => {
                      const val = e.target.value;
                      setActiveNote({ ...activeNote, content: val });
                      handleUpdateNote(activeNote.id, { content: val });
                   }}
                   placeholder="Start writing your study notes here... (Markdown supported)"
                   className="flex-1 bg-transparent outline-hidden w-full resize-none font-sans text-lg leading-relaxed placeholder-slate-800"
                />
              ) : (
                <div className="prose prose-invert prose-brand max-w-none">
                   <Markdown>{activeNote.content || '*No content yet. Click maximize to edit.*'}</Markdown>
                </div>
              )}
           </div>
        </div>
      ) : (
        <div className="flex-1 items-center justify-center hidden md:flex flex-col text-slate-600 gap-4">
           <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center">
              <FileText size={40} />
           </div>
           <p className="text-sm italic">Select a note to view or create a new one.</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
