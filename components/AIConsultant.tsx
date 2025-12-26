import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { getProposalInsights } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIConsultantProps {
  proposalContent: string;
}

const PRESET_PROMPTS = [
  "Summarize the CCTV compliance issues",
  "Explain the network redundancy strategy",
  "What are the SIRA storage requirements?",
  "Break down the Access Control solution",
  "Explain the implementation phases"
];

const AIConsultant: React.FC<AIConsultantProps> = ({ proposalContent }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your AI Security Consultant for the TSC project. How can I help you today with the ELV upgrade details?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsLoading(true);

    const response = await getProposalInsights(textToSend, proposalContent);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full sticky top-0 shadow-2xl">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="text-emerald-400" size={20} />
          <h2 className="font-semibold text-sm">AI Security Consultant</h2>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
          <Sparkles size={10} /> Live
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-900/20' 
                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-bold tracking-tighter">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                {msg.role}
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700">
              <Loader2 className="animate-spin text-emerald-400" size={16} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        {/* Quick Prompts */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <MessageSquare size={12} className="text-slate-500" />
            <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Quick Prompts</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-left px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-[11px] text-slate-400 hover:text-emerald-400 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about TSC proposal..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:bg-slate-800 shadow-lg shadow-emerald-900/20 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;