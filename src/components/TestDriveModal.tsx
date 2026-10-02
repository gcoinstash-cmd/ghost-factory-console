import React from 'react';
import { X, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import { ProductItem } from '../catalogData';

interface TestDriveModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 font-mono">
      <div className="w-full max-w-5xl h-[92vh] rounded-2xl border-2 border-emerald-500/80 bg-[#0A0A0B] text-slate-100 shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/30 bg-black/80 px-4 py-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider">
              TEST DRIVE // {product.name} (SLOT #{product.id.toString().padStart(3, '0')})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Ephemeral preview indicator (No exposed passcodes) */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-emerald-500/40 px-2.5 py-1 rounded text-[11px]">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span className="text-slate-300 font-bold">PREVIEW MODE:</span>
              <span className="text-emerald-400 font-mono font-bold">EPHEMERAL SANDBOX</span>
            </div>

            <a
              href={product.preview_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-black bg-emerald-500 hover:bg-emerald-400 font-black px-2.5 py-1 rounded transition-colors text-[11px]"
              title="Open direct demo in new tab"
            >
              <ExternalLink size={13} />
              <span>LAUNCH TAB</span>
            </a>

            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Mandatory Truth Banner Overlay */}
        <div className="bg-amber-950/40 border-b border-amber-500/40 px-4 py-2 flex items-center justify-between text-[11px] text-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle size={13} className="text-amber-400 shrink-0" />
            <span>
              <strong>MANDATORY PRODUCT TRUTH NOTICE:</strong> Interactive Prototype running on simulated sample data. Not a production deployment.
            </span>
          </div>
          <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded border border-amber-500/40 text-amber-300">
            Postgres Schema with RLS Pattern
          </span>
        </div>

        {/* Iframe Preview Container */}
        <div className="flex-1 bg-black relative">
          <iframe
            src={product.preview_url}
            title={product.name}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};
