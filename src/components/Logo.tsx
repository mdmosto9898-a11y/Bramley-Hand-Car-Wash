import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  customLogoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  customLogoUrl
}) => {
  // If custom logo image URL is provided (e.g. from businessSettings)
  if (customLogoUrl) {
    const imgHeight = {
      sm: 'h-6 sm:h-7',
      md: 'h-8 sm:h-9',
      lg: 'h-10 sm:h-12',
      xl: 'h-14 sm:h-16'
    }[size];

    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Bramley Hand Car Wash Logo"
          className={`${imgHeight} w-auto object-contain shrink-0`}
        />
        {variant !== 'icon' && (
          <div className="flex flex-col text-left">
            <span className="font-extrabold tracking-tight text-white font-display uppercase leading-tight text-sm sm:text-base">
              Bramley Hand Car Wash
            </span>
            <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
              Leeds · Valeting & Detailing
            </span>
          </div>
        )}
      </div>
    );
  }

  // Dimension presets for Vector Emblem
  const iconSize = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10 sm:w-11 sm:h-11',
    xl: 'w-14 h-14'
  }[size];

  const textSize = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg md:text-xl',
    xl: 'text-xl sm:text-2xl'
  }[size];

  const subSize = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-[10px] sm:text-xs',
    xl: 'text-xs'
  }[size];

  // Crafted vector emblem: Distinctive, premium automotive shield with stylised car outline and monogram
  const emblem = (
    <div
      className={`${iconSize} relative shrink-0 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-0.5 border border-neutral-700/80 shadow-md flex items-center justify-center overflow-hidden group`}
    >
      {/* Subtle sheen highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1"
      >
        {/* Outer shield perimeter */}
        <path
          d="M18 3L4 8V17C4 24.5 10 31.5 18 33C26 31.5 32 24.5 32 17V8L18 3Z"
          stroke="url(#shieldGrad)"
          strokeWidth="1.75"
          fill="#0a0a0a"
        />
        {/* Sleek sports car silhouette */}
        <path
          d="M9 22C11 20 13 18 16 17.5L20 17.5C23 18 25 20 27 22H9Z"
          fill="#f59e0b"
          opacity="0.85"
        />
        {/* Roofline curve */}
        <path
          d="M13.5 18L16 13.5H20L22.5 18"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Monogram B in core */}
        <text
          x="18"
          y="23.5"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#ffffff"
          fontFamily="system-ui, sans-serif"
        >
          B
        </text>

        <defs>
          <linearGradient id="shieldGrad" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{emblem}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2.5 ${className}`}>
        {emblem}
        <div className="flex flex-col items-center">
          <span className={`${textSize} font-black tracking-tight text-white font-display uppercase leading-tight`}>
            Bramley Hand Car Wash
          </span>
          <span className={`${subSize} text-amber-400 font-bold uppercase tracking-widest mt-0.5`}>
            601 Stanningley Rd · Leeds
          </span>
        </div>
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {emblem}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`${textSize} font-black tracking-tight text-white font-display uppercase whitespace-nowrap leading-tight`}>
            Bramley Hand Car Wash
          </span>
        </div>
        <span className={`${subSize} text-neutral-400 font-semibold tracking-wide uppercase mt-0.5`}>
          601 Stanningley Rd · Quality Valeting
        </span>
      </div>
    </div>
  );
};
