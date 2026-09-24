import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading administration data...' }) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <Loader2 className="w-8 h-8 text-neutral-400 animate-spin mb-3" />
      <span className="text-xs text-neutral-400 font-medium tracking-wide">{message}</span>
    </div>
  );
};
