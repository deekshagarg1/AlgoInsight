import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { X, Lock, Mail, User, AlertCircle, Loader2, Eye, EyeOff, BrainCircuit } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { login, signup } = React.useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Password criteria calculations (preserved exactly)
  const hasMinLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasSpecialOrUpper = /[A-Z]/.test(password) || /[^a-zA-Z0-9]/.test(password);

  const getPasswordScore = () => {
    let score = 0;
    if (password.length > 0) {
      if (hasMinLength) score++;
      if (hasNumber) score++;
      if (hasSpecialOrUpper) score++;
    }
    return score;
  };

  const passwordScore = getPasswordScore();
  const isPasswordStrong = passwordScore === 3;

  // Reset fields when modal toggles open status or login/signup modes
  React.useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError('');
  }, [isOpen, isLoginMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Block submission if password is weak during Signup (preserved exactly)
    if (!isLoginMode && !isPasswordStrong) {
      setError('Please choose a stronger password that meets all checklist requirements.');
      return;
    }

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
      <div className="relative w-full max-w-md bg-[#0b0b0d] border border-[#18181b] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Top Glow boundary line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#18181b]/50 border border-[#27272a]/30 text-slate-400 hover:text-white cursor-pointer hover:border-slate-800 transition-all active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Logo & Title Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.15)] flex items-center justify-center mb-4 animate-pulse">
            <BrainCircuit className="w-8 h-8 text-indigo-400 stroke-[2.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight font-sans">
            {isLoginMode ? 'Login to Sync Progress' : 'Create Student Profile'}
          </h2>
          <p className="text-[10px] text-slate-450 leading-relaxed font-medium mt-1.5 max-w-xs">
            {isLoginMode 
              ? 'Enter email credentials to load completed lessons and scores.' 
              : 'Sign up to keep perfect flame streaks active from any browser.'}
          </p>
        </div>

        {/* Pill Mode Switcher Tab Bar */}
        <div className="flex p-1 bg-[#101013] border border-[#18181b] rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-all border-none ${
              isLoginMode 
                ? 'bg-[#1e293b] text-white shadow-sm border border-slate-700/50' 
                : 'text-slate-455 hover:text-white bg-transparent'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-all border-none ${
              !isLoginMode 
                ? 'bg-[#1e293b] text-white shadow-sm border border-slate-700/50' 
                : 'text-slate-455 hover:text-white bg-transparent'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Errors alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl border border-rose-500/15 bg-rose-500/10 text-rose-455 text-[11px] leading-relaxed flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name Field (signup only) */}
          {!isLoginMode && (
            <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
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
                  className="w-full pl-9.5 pr-3.5 py-2.5 rounded-xl border border-[#18181b] bg-[#101013] text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_12px_rgba(99,102,241,0.06)] transition-all font-mono"
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
                className="w-full pl-9.5 pr-3.5 py-2.5 rounded-xl border border-[#18181b] bg-[#101013] text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_12px_rgba(99,102,241,0.06)] transition-all font-mono"
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
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9.5 pr-10 py-2.5 rounded-xl border border-[#18181b] bg-[#101013] text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_12px_rgba(99,102,241,0.06)] transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-350 cursor-pointer bg-transparent border-none focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Dynamic Password Strength Meter & Checklist Rules (Signup Only, preserved exactly) */}
            {!isLoginMode && password.length > 0 && (
              <div className="flex flex-col gap-2 mt-1.5 p-3 rounded-xl bg-[#101013] border border-[#18181b] animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500 font-bold uppercase">
                  <span>Password Strength:</span>
                  <span className={
                    passwordScore === 1 ? 'text-rose-455 font-bold' :
                    passwordScore === 2 ? 'text-amber-500 font-bold' :
                    passwordScore === 3 ? 'text-emerald-450 font-bold' : 'text-slate-500'
                  }>
                    {passwordScore === 1 ? 'Weak' :
                     passwordScore === 2 ? 'Medium' :
                     passwordScore === 3 ? 'Strong' : 'Very Weak'}
                  </span>
                </div>

                {/* Grid indicator bars */}
                <div className="grid grid-cols-3 gap-1.5 h-1 w-full bg-slate-900/60 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${passwordScore >= 1 ? 'bg-rose-500' : 'bg-transparent'}`} />
                  <div className={`h-full rounded-full transition-all duration-300 ${passwordScore >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
                  <div className={`h-full rounded-full transition-all duration-300 ${passwordScore >= 3 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                </div>

                {/* Criteria checklists */}
                <div className="flex flex-col gap-1 mt-1 border-t border-slate-900/40 pt-2 text-[8px] font-mono">
                  <div className="flex items-center gap-1.5 font-medium transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full ${hasMinLength ? 'bg-emerald-450 shadow-[0_0_6px_#10b981]' : 'bg-slate-700'}`} />
                    <span className={hasMinLength ? 'text-slate-350 font-bold animate-pulse' : 'text-slate-500'}>
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full ${hasNumber ? 'bg-emerald-450 shadow-[0_0_6px_#10b981]' : 'bg-slate-700'}`} />
                    <span className={hasNumber ? 'text-slate-350 font-bold animate-pulse' : 'text-slate-500'}>
                      Contains at least one number
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full ${hasSpecialOrUpper ? 'bg-emerald-450 shadow-[0_0_6px_#10b981]' : 'bg-slate-700'}`} />
                    <span className={hasSpecialOrUpper ? 'text-slate-350 font-bold animate-pulse' : 'text-slate-500'}>
                      Contains uppercase / special character
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Trigger Button */}
          <button
            type="submit"
            disabled={loading || (!isLoginMode && !isPasswordStrong)}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl cursor-pointer active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 border-none mt-2 font-sans"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>{isLoginMode ? 'Continue with Email' : 'Register Profile'}</span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
