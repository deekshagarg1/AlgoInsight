import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { X, Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { login, signup } = React.useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Reset fields when modal toggles open status or login/signup modes
  React.useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  }, [isOpen, isLoginMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#0b0b0d] border border-[#18181b] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Top Glow boundary line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0d9488]/30 to-transparent"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#18181b]/50 border border-[#27272a]/30 text-slate-400 hover:text-white cursor-pointer hover:border-slate-800 transition-all active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title details */}
        <div className="flex flex-col gap-1.5 mb-6 pr-6">
          <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-tight font-sans">
            {isLoginMode ? 'Login to Account' : 'Create Student Profile'}
          </h2>
          <p className="text-[10px] text-slate-450 leading-relaxed font-medium">
            {isLoginMode 
              ? 'Enter email credentials to sync completions and scores to cloud database.' 
              : 'Sign up to keep perfect flame streaks active from any browser.'}
          </p>
        </div>

        {/* Form Errors alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl border border-rose-500/15 bg-rose-500/10 text-rose-450 text-[11px] leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name Field (signup only) */}
          {!isLoginMode && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold font-mono tracking-wider text-slate-500 uppercase">Your Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                  <User className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9.5 pr-3.5 py-2.5 rounded-xl border border-[#18181b] bg-[#101013] text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0d9488]/50 focus:shadow-[0_0_12px_rgba(13,148,136,0.06)] transition-all font-mono"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold font-mono tracking-wider text-slate-500 uppercase">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9.5 pr-3.5 py-2.5 rounded-xl border border-[#18181b] bg-[#101013] text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0d9488]/50 focus:shadow-[0_0_12px_rgba(13,148,136,0.06)] transition-all font-mono"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold font-mono tracking-wider text-slate-500 uppercase">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9.5 pr-3.5 py-2.5 rounded-xl border border-[#18181b] bg-[#101013] text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0d9488]/50 focus:shadow-[0_0_12px_rgba(13,148,136,0.06)] transition-all font-mono"
              />
            </div>
          </div>

          {/* Submit Trigger Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0d9488] hover:bg-[#0f766e] disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl cursor-pointer active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 border-none mt-2 font-sans"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>{isLoginMode ? 'Login' : 'Sign Up'}</span>
            )}
          </button>

        </form>

        {/* Toggle Mode Footer */}
        <div className="mt-5 border-t border-slate-900/60 pt-4 text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-[10px] text-slate-450 hover:text-white transition-colors cursor-pointer bg-transparent border-none font-sans"
          >
            {isLoginMode 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Login"}
          </button>
        </div>

      </div>
    </div>
  );
}
