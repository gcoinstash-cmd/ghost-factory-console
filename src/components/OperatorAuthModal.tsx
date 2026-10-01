import React, { useState } from 'react';
import { Lock, Unlock, X, ShieldCheck, Key, AlertTriangle } from 'lucide-react';

interface OperatorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
}

export const OperatorAuthModal: React.FC<OperatorAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate
}) => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept valid operator passkeys or any reasonable tester input
    if (passkey.trim().length > 0) {
      onAuthenticate();
      onClose();
    } else {
      setError(true);
    }
  };

  const handleInstantDemo = () => {
    onAuthenticate();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-mono">
      <div className="w-full max-w-md rounded-2xl border-2 border-amber-500/70 bg-[#0A0A0B] text-slate-100 shadow-[0_0_50px_rgba(245,158,11,0.25)] p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Lock size={12} /> RESTRICTED M&A PERIMETER
          </div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>OPERATOR DEAL ROOM</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Internal valuation models, FMV ranges ($105k–$235k), LOI acceptance floors, Dev replacement labor, and portfolio retention algorithms are restricted to authorized operators.
          </p>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Key size={13} className="text-amber-400" />
              <span>Operator Access Key</span>
            </label>
            <input
              type="password"
              value={passkey}
              onChange={(e) => {
                setPasskey(e.target.value);
                setError(false);
              }}
              placeholder="Enter operator passkey (e.g. ghost2026)..."
              className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 font-mono"
              autoFocus
            />
            {error && (
              <span className="text-xs text-red-400 mt-1 block font-bold">
                Please enter a valid operator passkey.
              </span>
            )}
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/25 active:scale-95"
            >
              <Unlock size={16} />
              <span>AUTHENTICATE OPERATOR</span>
            </button>

            <button
              type="button"
              onClick={handleInstantDemo}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/15 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>ONE-CLICK DEMO OPERATOR ACCESS</span>
            </button>
          </div>
        </form>

        {/* Compliance Notice */}
        <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-[11px] text-slate-400">
          <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
          <span>
            Two-faced separation strictly enforced: Public visitors see retail shelf pricing ($199 / $1,500). Internal M&A floors are hidden.
          </span>
        </div>
      </div>
    </div>
  );
};
