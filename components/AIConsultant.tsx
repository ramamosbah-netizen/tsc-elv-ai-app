
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { getProposalInsights } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIConsultantProps {
  proposalContent: string;
}

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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getProposalInsights(input, proposalContent);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full sticky top-0 shadow-2xl">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <Bot className="text-emerald-400" size={20} />
        <h2 className="font-semibold text-sm">AI Security Consultant</h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 rounded-bl-none'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-bold tracking-tighter">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                {msg.role}
              </div>
              <p className="leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none">
              <Loader2 className="animate-spin text-emerald-400" size={16} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about compliance..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
