import React, { createContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Floating Toast Notification Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 w-full max-w-xs pointer-events-none select-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          
          let icon = <Info className="w-4.5 h-4.5 text-indigo-400" />;
          let cardStyle = 'border-y border-r border-indigo-500/10 border-l-[3.5px] border-l-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.06)]';
          if (isSuccess) {
            icon = <CheckCircle className="w-4.5 h-4.5 text-emerald-450" />;
            cardStyle = 'border-y border-r border-emerald-500/10 border-l-[3.5px] border-l-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.06)]';
          } else if (isError) {
            icon = <AlertTriangle className="w-4.5 h-4.5 text-rose-450" />;
            cardStyle = 'border-y border-r border-rose-500/10 border-l-[3.5px] border-l-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.06)]';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[#191a23]/95 backdrop-blur-md text-left transition-all duration-300 transform animate-in slide-in-from-right-5 fade-in duration-300 ${cardStyle}`}
            >
              {/* Icon indicator */}
              <div className="shrink-0 mt-0.5">{icon}</div>

              {/* Message text details */}
              <div className="flex-1 text-[11px] leading-relaxed text-slate-200 font-sans pr-4 font-semibold">
                {toast.message}
              </div>

              {/* Close trigger button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-0.5 rounded-lg hover:bg-slate-800/50 text-slate-500 hover:text-slate-300 cursor-pointer bg-transparent border-none focus:outline-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
