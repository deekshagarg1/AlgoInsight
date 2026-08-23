import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { Activity, BookOpen, LayoutDashboard, BrainCircuit, Menu, X, LogOut, User as UserIcon } from 'lucide-react';

/**
 * Navbar Component with interactive tab toggling support
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab ('home', 'algorithms', etc.)
 * @param {Function} props.onChangeTab - Callback to toggle tab views
 */
export default function Navbar({ activeTab, onChangeTab, onOpenAuth }) {
  const { user, logout } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { id: 'algorithms', name: 'Algorithms', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
    { id: 'courses', name: 'Courses', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
    { id: 'practice', name: 'Practice', icon: <BrainCircuit className="w-4 h-4 text-emerald-400" /> },
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-amber-400" /> }
  ];

  const handleLinkClick = (tabId) => {
    onChangeTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-300">
              <BrainCircuit className="w-6 h-6 text-slate-900 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                AlgoInsight
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800 rounded-full">
                V1.0 (MCA Project)
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-slate-800 text-white border border-slate-700/50 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <span className={`${activeTab === link.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                  {link.icon}
                </span>
                {link.name}
              </button>
            ))}
            
            {/* User Profile / Auth Actions */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-350">
                  <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{user.name.split(' ')[0]}</span>
                </div>
                <button 
                  onClick={logout}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-350 hover:text-rose-455 bg-transparent border border-[#27272a]/40 hover:border-rose-900/35 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="ml-4 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-none font-bold"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all text-left ${
                activeTab === link.id ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
          <div className="pt-3 px-3 border-t border-slate-800/60 mt-2 flex flex-col gap-2">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono font-bold text-slate-300">
                  <UserIcon className="w-4 h-4 text-cyan-400" />
                  <span>Logged in as: {user.name}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-rose-400 bg-rose-955/20 border border-rose-900/30 rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  onOpenAuth();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-lg shadow-lg cursor-pointer font-bold"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
