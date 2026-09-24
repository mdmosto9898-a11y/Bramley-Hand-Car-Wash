import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry
}) => {
  return (
    <div className="py-12 px-4 text-center flex flex-col items-center justify-center bg-red-950/20 border border-red-900/40 rounded-xl my-4">
      <div className="w-12 h-12 rounded-full bg-red-900/30 border border-red-800/60 flex items-center justify-center text-red-400 mb-3.5">
        <AlertTriangle className="w-6 h-6 text-red-400" />
      </div>
      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-red-300/80 max-w-md mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
