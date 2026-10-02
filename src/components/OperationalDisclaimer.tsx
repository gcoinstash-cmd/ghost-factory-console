import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { REGULATED_SECTOR_DISCLAIMER } from '../constants/disclaimers';

interface OperationalDisclaimerProps {
  text?: string;
  disclaimer?: string;
  children?: React.ReactNode;
}

export const OperationalDisclaimer: React.FC<OperationalDisclaimerProps> = ({
  text,
  disclaimer,
  children,
}) => {
  const content = text || disclaimer || children || REGULATED_SECTOR_DISCLAIMER;
  return (
    <div className="w-full space-y-2 my-2">
      {/* MANDATORY TRUTH BADGE */}
      <div className="flex items-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black font-black text-xs font-mono uppercase tracking-wider shadow-md shadow-amber-400/20">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          [SIMULATED DATA PROTOTYPE]
        </span>
      </div>

      {/* OPERATIONAL DISCLAIMER CONTAINER */}
      <div
        className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-500/50 text-amber-200 font-mono text-[11px] leading-relaxed"
        title="NOT CERTIFIED FOR OPERATIONAL, REGULATORY, OR LIFE-CRITICAL USE"
      >
        <div className="flex items-center gap-1.5 font-black text-amber-300 uppercase tracking-wider mb-1">
          <AlertTriangle size={13} className="text-amber-400 shrink-0" />
          <span>REGULATORY & TRUTH NOTICE:</span>
        </div>
        <p className="text-amber-200 font-semibold leading-normal">
          {content}
        </p>
      </div>
    </div>
  );
};

export default OperationalDisclaimer;
