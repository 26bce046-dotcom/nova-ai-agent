import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

interface ResearchAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchAssistantModal: React.FC<ResearchAssistantModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickQuestions = [
    'How does moisture degrade perovskite crystals, and what encapsulation is used?',
    'Why does a 24.5% module efficiency yield 15–20% more power in utility solar farms?',
    'How does Oxford PV solve the 2-terminal current matching constraint?',
    'What are the primary yield bottlenecks when scaling from 100 MW to multi-gigawatt fabs?',
  ];

  const handleAsk = async (queryText?: string) => {
    const textToSubmit = queryText || question;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/research/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSubmit }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.answer);
      setIsFallback(Boolean(data.isFallback));
    } catch (err: any) {
      console.error('Query error:', err);
      setError('Could not reach backend query service. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Renewable Energy Research Console"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Renewable Energy Research Console
              </h3>
              <p className="text-xs text-slate-500">
                Authoritative answers with explicit separation of verified facts and uncertainties
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Research Console"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* Quick Prompts */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Recommended Inquiries
            </div>
            <div className="flex flex-col gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuestion(q);
                    handleAsk(q);
                  }}
                  className="text-left text-xs p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-7 h-7 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-xs font-medium text-slate-600">
                Synthesizing metrology reports, Shockley-Queisser limits & manufacturing data...
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {/* Response Display */}
          {response && !loading && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                <span className="font-semibold text-slate-900">Analysis Output</span>
                {isFallback ? (
                  <span className="font-mono text-[11px] text-slate-600">
                    Offline Grounded Knowledge Base
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Gemini 2.5 Flash Verified Synthesis
                  </span>
                )}
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line prose-slate">
                {response}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a technical or economic question..."
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
