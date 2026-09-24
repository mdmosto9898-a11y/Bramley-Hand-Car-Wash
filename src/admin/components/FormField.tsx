import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  helperText,
  error,
  className = '',
  children
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-neutral-300 block">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {helperText && <span className="text-[11px] text-neutral-500">{helperText}</span>}
      </div>
      {children}
      {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}
    </div>
  );
};
