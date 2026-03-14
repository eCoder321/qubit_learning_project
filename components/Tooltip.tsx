import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-block cursor-help underline decoration-sky-500/50 decoration-2 underline-offset-4 hover:decoration-sky-400 transition-colors" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute z-50 w-72 p-4 mt-2 text-sm text-slate-200 bg-slate-800 rounded-lg shadow-xl border border-slate-700 -left-1/2 transform translate-x-1/4">
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
