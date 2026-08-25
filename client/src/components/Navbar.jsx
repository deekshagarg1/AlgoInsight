import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { Activity, BookOpen, LayoutDashboard, BrainCircuit, Menu, X, LogOut, User as UserIcon, Lock } from 'lucide-react';

/**
 * Navbar Component (LeetCode Dark Style - Ultra Premium Profile Dropdown)
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab ('home', 'algorithms', etc.)
 * @param {Function} props.onChangeTab - Callback to toggle tab views
 * @param {Function} props.onOpenAuth - Callback to open login modal
 */
export default function Navbar({ activeTab, onChangeTab, onOpenAuth }) {
  const { user, logout } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'algorithms', name: 'Algorithms', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
    { id: 'courses', name: 'Courses', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
    { id: 'practice', name: 'Practice', icon: <BrainCircuit className="w-4 h-4 text-emerald-400" /> },
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-[#ffa116]" /> }
  ];

  const handleLinkClick = (tabId) => {
    onChangeTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#282828]/95 backdrop-blur-md border-b border-[#383838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section (LeetCode Yellow-Gold Gradients) */}
          <div 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-amber-500 to-[#ffa116] rounded-xl shadow-[0_0_15px_rgba(255,161,22,0.3)] group-hover:scale-105 transition-transform duration-300">
              <BrainCircuit className="w-6 h-6 text-slate-900 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-amber-500 to-[#ffa116] bg-clip-text text-transparent">
                AlgoInsight
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[9px] font-bold text-[#ffa116] bg-[#ffa116]/10 border border-[#ffa116]/30 rounded-full font-mono">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-350 group cursor-pointer border ${
                  activeTab === link.id
                    ? 'bg-[#1a1a1a] text-white border-[#383838] shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-[#1a1a1a]/40 border-transparent'
                }`}
              >
                <span className={`${activeTab === link.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                  {link.icon}
                </span>
                {link.name}
              </button>
            ))}
            
            {/* User Profile Avatar with dropdown (Multer pre-config) */}
            {user ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 cursor-pointer group select-none py-1"
                >
                  {/* Custom Avatar container */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-[#ffa116] flex items-center justify-center text-slate-950 font-black text-xs border border-[#ffa116]/40 hover:border-amber-400 shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all select-none">
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  
                  {/* Caret icon */}
                  <svg 
                    className={`w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu Modal */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-52 rounded-xl bg-[#282828] border border-[#383838] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="px-4 py-2 border-b border-[#383838] flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-200 truncate">{user.name}</span>
                      <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleLinkClick('dashboard');
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs text-slate-350 hover:text-white hover:bg-[#1a1a1a]/50 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#ffa116]" />
                        <span>My Dashboard</span>
                      </button>

                      {/* Multer custom warning banner info */}
                      <div className="px-4 py-2 flex flex-col gap-0.5 border-t border-[#383838]/60 mt-1">
                        <span className="text-[8px] font-bold font-mono tracking-widest text-[#ffa116] uppercase">Profile Avatar</span>
                        <span className="text-[9px] text-slate-500 leading-normal">Multipart upload files integration coming soon</span>
                      </div>
                    </div>

                    <div className="border-t border-[#383838] pt-1 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-rose-400 hover:bg-rose-500/10 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="ml-4 px-4 py-2 text-xs font-bold text-[#1a1a1a] bg-gradient-to-r from-amber-400 to-[#ffa116] rounded-lg shadow-[0_0_15px_rgba(255,161,22,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-none font-bold"
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
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-[#282828] border-b border-[#383838] animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all text-left ${
                activeTab === link.id ? 'bg-[#1a1a1a] text-white border-[#383838]' : 'text-slate-350 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
          <div className="pt-3 px-3 border-t border-[#383838]/60 mt-2 flex flex-col gap-2">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#383838] text-sm font-mono font-bold text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-[#ffa116] flex items-center justify-center text-slate-950 text-[10px] font-black shrink-0">
                    {user.profilePic ? (
                      <img src={user.profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="truncate">{user.name}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-rose-450 bg-rose-500/10 border border-rose-900/30 rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
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
                className="w-full py-2.5 text-center text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-[#ffa116] rounded-lg shadow-lg cursor-pointer border-none font-bold"
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
