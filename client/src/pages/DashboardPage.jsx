import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { Award, ShieldAlert, Sparkles, BookOpen, Flame, User, LogOut, Activity, LayoutDashboard, CheckCircle } from 'lucide-react';

export default function DashboardPage({ onOpenAuth, onExplore }) {
  const { user, logout } = React.useContext(AuthContext);

  // Fallback calculations for completions percentages
  const totalLessonsCount = 7; // Total lessons defined inside COURSES_DATA
  const completedLessonsCount = user ? Object.keys(user.completions || {}).length : 0;
  const courseProgressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  // 1. Guest Logged-Out lock state view
  if (!user) {
    return (
      <div className="w-full flex flex-col gap-6 text-left max-w-2xl mx-auto py-6 relative justify-center items-center min-h-[420px]">
        <div className="w-full bg-[#0b0b0d] border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0d9488]/30 to-transparent"></div>
          
          <div className="p-3 bg-[#0d9488]/10 border border-[#0d9488]/20 text-[#14b8a6] rounded-2xl mb-4">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>
          
          <h2 className="text-lg font-black text-slate-200 tracking-tight">Unlock Your Learning Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1.5 max-w-sm leading-relaxed">
            Create an account or log in to sync your progress checks, quiz streak scores, and customize visualizer snap-runs across all browsers.
          </p>

          <button
            onClick={onOpenAuth}
            className="w-full sm:max-w-xs py-3 bg-[#0d9488] hover:bg-[#0f766e] text-slate-950 font-bold rounded-xl text-xs cursor-pointer active:scale-95 transition-all border-none font-sans mt-7"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  // 2. Logged-in profile view
  return (
    <div className="w-full flex flex-col gap-5 text-left max-w-5xl mx-auto py-2">
      
      {/* Welcome Banner details */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d9488]/10 via-[#0d9488]/5 to-transparent border border-[#0d9488]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 border border-slate-800 text-cyan-400 rounded-xl">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-200 tracking-tight m-0 font-sans">
              Welcome back, {user.name}!
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Here is your real-time learning progress and dry-run stats.</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-450 hover:text-rose-400 bg-slate-900/50 border border-slate-800/60 hover:border-rose-900/30 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
        
        {/* Card 1: Courses Progress */}
        <div className="bg-[#0b0b0d] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between min-h-[160px] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Course Progress</span>
              <h3 className="text-sm font-bold text-slate-200 tracking-tight mt-1">Concept Tutorials</h3>
            </div>
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold">
              <span className="text-slate-400">{completedLessonsCount} / {totalLessonsCount} Lessons</span>
              <span className="text-indigo-400">{courseProgressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-400 rounded-full transition-all duration-300"
                style={{ width: `${courseProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Perfect Quiz Streak */}
        <div className="bg-[#0b0b0d] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between min-h-[160px] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
          
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Streak Badge</span>
              <h3 className="text-sm font-bold text-slate-200 tracking-tight mt-1">Perfect Score Runs</h3>
            </div>
            <Flame className={`w-5 h-5 ${user.streak > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-500'}`} />
          </div>

          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-2xl font-black font-mono text-slate-200">{user.streak}</span>
            <span className="text-xs text-slate-400 font-medium">Consecutive 5/5 scores</span>
          </div>
        </div>

        {/* Card 3: Global Profile high score stats */}
        <div className="bg-[#0b0b0d] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between min-h-[160px] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Account Type</span>
              <h3 className="text-sm font-bold text-slate-200 tracking-tight mt-1">Student Profile</h3>
            </div>
            <Award className="w-5 h-5 text-emerald-450" />
          </div>

          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-xs text-slate-200 font-bold bg-[#101013] border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-mono">
              <User className="w-3.5 h-3.5 text-emerald-450" />
              Verified User
            </span>
          </div>
        </div>

      </div>

      {/* Course Quiz Score Cards detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-2 items-stretch">
        
        {/* Left: Detailed High Scores breakdown */}
        <div className="lg:col-span-7 bg-[#0b0b0d] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
            <Activity className="w-4.5 h-4.5 text-cyan-400" />
            <h2 className="text-sm font-bold tracking-tight text-slate-200 m-0">Practice Quizzes High Scores</h2>
          </div>

          <div className="flex flex-col gap-4.5 py-1.5">
            {/* Score 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-350">Complexity Analysis</span>
                <span className="text-slate-200">{user.highScores?.complexity || 0} / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${((user.highScores?.complexity || 0) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Score 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-350">Sorting Traces</span>
                <span className="text-slate-200">{user.highScores?.sorting || 0} / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-400 rounded-full transition-all duration-300"
                  style={{ width: `${((user.highScores?.sorting || 0) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Score 3 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-350">Linear Restraints (Stacks & Queues)</span>
                <span className="text-slate-200">{user.highScores?.structures || 0} / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-400 rounded-full transition-all duration-300"
                  style={{ width: `${((user.highScores?.structures || 0) / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Redirect Action boards */}
        <div className="lg:col-span-5 bg-[#0b0b0d] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl min-h-[220px]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
              <Sparkles className="w-4.5 h-4.5 text-amber-400" />
              <h2 className="text-sm font-bold tracking-tight text-slate-200 m-0">Quick Action Hub</h2>
            </div>
            
            <p className="text-[11px] leading-relaxed text-slate-450 mt-1">
              Ready to challenge yourself? Jump straight into visual dry-runs inside the sandbox visualizer or complete your checklist inside lessons!
            </p>
          </div>

          <div className="flex flex-col gap-2.5 mt-5">
            <button
              onClick={() => onExplore('algorithms')}
              className="w-full py-2.5 bg-[#18181b] hover:bg-[#27272a] text-slate-300 hover:text-white border border-[#27272a]/30 rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1.5 font-sans"
            >
              Open Sandbox Visualizer
            </button>
            <button
              onClick={() => onExplore('courses')}
              className="w-full py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-slate-950 font-bold rounded-xl text-xs cursor-pointer active:scale-95 transition-all border-none font-sans"
            >
              Continue Course Lessons
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
