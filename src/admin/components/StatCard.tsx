import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  trend?: {
    text: string;
    isPositive?: boolean;
  };
  highlight?: boolean;
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtext,
  trend,
  highlight = false,
  badge
}) => {
  return (
    <div
      className={`relative p-5 rounded-xl border transition-all ${
        highlight
          ? 'bg-neutral-900/90 border-neutral-700 shadow-lg'
          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-750'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {title}
            </span>
            {badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                {badge}
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {value}
          </div>
        </div>

        <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
          <Icon className="w-5 h-5 text-neutral-300" />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400">
        <span>{subtext || 'Verified Yorkshire operations'}</span>
        {trend && (
          <span
            className={`font-semibold ${
              trend.isPositive ? 'text-emerald-400' : 'text-neutral-400'
            }`}
          >
            {trend.text}
          </span>
        )}
      </div>

      {/* Internal Demo Watermark */}
      <span className="absolute top-2 right-2 text-[9px] uppercase tracking-widest text-neutral-600 font-mono select-none pointer-events-none">
        DEMO
      </span>
    </div>
  );
};
