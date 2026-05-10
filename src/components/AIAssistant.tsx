import React, { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  Send, 
  BrainCircuit, 
  Sparkles, 
  Bot, 
  User as UserIcon, 
  Loader2, 
  Trash2, 
  Share2,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import Markdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';

const AIAssistant = ({ user }: { user: User }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: `Hi ${user.displayName?.split(' ')[0] || 'there'}! I'm your Productify AI. How can I help you study today? You can ask me to explain a topic, summarize text, or help with problem-solving.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are a helpful, encouraging, and highly intelligent AI study assistant for the Productify platform. You help students understand complex concepts, solve problems, and organize their work. Be concise but thorough. Use Markdown for formatting.",
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to AI service. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col glass rounded-3xl overflow-hidden border-white/5">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold font-display">Productify AI</h2>
            <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold">Always Active</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 hover:bg-white/10 rounded-lg text-slate-500 transition-colors"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-4 max-w-4xl",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-white/10" : "bg-purple-500"
            )}>
              {msg.role === 'user' ? <UserIcon size={16} /> : <Sparkles size={16} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed",
              msg.role === 'user' ? "bg-brand-primary text-white rounded-tr-none" : "glass rounded-tl-none prose prose-invert prose-sm"
            )}>
              {msg.role === 'assistant' ? <Markdown>{msg.content}</Markdown> : msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 max-w-4xl">
            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center shrink-0">
               <Sparkles size={16} />
            </div>
            <div className="glass p-4 rounded-2xl rounded-tl-none flex items-center gap-2 text-slate-400 text-sm italic">
               <Loader2 size={16} className="animate-spin" />
               AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 lg:p-8 border-t border-white/5 bg-white/5">
         <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
               <QuickPrompt label="Explain a topic" onClick={() => setInput("Explain the concept of ...")} />
               <QuickPrompt label="Study Plan" onClick={() => setInput("Create a 7-day study plan for a ... exam.")} />
               <QuickPrompt label="Summarize" onClick={() => setInput("Can you summarize my recent notes on ...?")} />
            </div>
            <form onSubmit={handleSend} className="relative group">
               <textarea 
                  rows={1}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-16 py-4 outline-hidden focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none max-h-32"
                  placeholder="Ask your assistant anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
               />
               <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 bottom-1.5 p-3 h-10 w-10 flex items-center justify-center bg-purple-500 rounded-xl text-white hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
               >
                  <Send size={18} />
               </button>
            </form>
            <p className="text-[10px] text-center text-slate-600">AI can make mistakes. Verify important information.</p>
         </div>
      </div>
    </div>
  );
};

function QuickPrompt({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg glass border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:border-white/20 transition-all"
    >
      {label}
    </button>
  )
}

export default AIAssistant;
