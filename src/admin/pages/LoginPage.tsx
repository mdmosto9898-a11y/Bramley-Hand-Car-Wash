import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  X,
  Loader2
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Logo } from '../../components/Logo';

interface LoginPageProps {
  onReturnToSite: () => void;
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onReturnToSite, onLoginSuccess }) => {
  const { login, resetPassword, loading } = useAdminAuth();

  // Inputs are strictly empty by default — no prefill or hard-coded credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(trimmedEmail, password, rememberMe);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid email or password.');
      } else {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch {
      setErrorMessage('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setIsResetting(true);
    setForgotStatus(null);
    try {
      const res = await resetPassword(forgotEmail);
      setForgotStatus(res);
    } catch {
      setForgotStatus({
        success: false,
        message: 'Unable to dispatch reset instructions. Please check connection.'
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4 relative selection:bg-neutral-800 selection:text-white">
      {/* Background Subtle Gradient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Customer Website link */}
      <button
        type="button"
        onClick={onReturnToSite}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Customer Website</span>
      </button>

      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Header / Brand */}
        <div className="text-center space-y-2">
          <Logo variant="stacked" size="lg" className="mx-auto" />
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            ADMIN PORTAL
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-red-950/40 border border-red-900/60 flex items-start gap-2.5 text-xs text-red-300 animate-in fade-in duration-150"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="text-xs font-semibold text-neutral-300 block">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="admin@bramleyhandcarwash.co.uk"
                className="w-full bg-neutral-950 border border-neutral-800 text-white pl-9 pr-3 py-2.5 rounded-lg text-xs focus:outline-none focus:border-white transition-colors font-mono"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="admin-password" className="text-xs font-semibold text-neutral-300 block">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Enter password"
                className="w-full bg-neutral-950 border border-neutral-800 text-white pl-9 pr-10 py-2.5 rounded-lg text-xs focus:outline-none focus:border-white transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Show Password Toggle button & Remember session */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-neutral-700 bg-neutral-950 text-white focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-xs text-neutral-400 hover:text-neutral-300">Remember session</span>
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full py-3 bg-white text-neutral-950 font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 mt-2 hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            {isSubmitting || loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <span>SECURE LOGIN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 border-t border-neutral-800/80 text-center text-[11px] text-neutral-500">
          <span>601 Stanningley Rd, Bramley, Leeds LS13 4EL</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => {
                setIsForgotModalOpen(false);
                setForgotStatus(null);
                setForgotEmail('');
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Reset Admin Password</h3>
                <span className="text-[10px] text-neutral-400 font-mono">Firebase Password Reset</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Enter your registered administrator email to receive secure password reset instructions.
            </p>

            {forgotStatus && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                  forgotStatus.success
                    ? 'bg-emerald-950/40 border border-emerald-900 text-emerald-300'
                    : 'bg-red-950/40 border border-red-900 text-red-300'
                }`}
              >
                {forgotStatus.success ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{forgotStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="admin@bramleyhandcarwash.co.uk"
                className="w-full bg-neutral-950 border border-neutral-800 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
              <button
                type="submit"
                disabled={isResetting}
                className="w-full py-2 bg-white text-neutral-950 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isResetting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
