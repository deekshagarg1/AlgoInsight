import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import VisualizerPage from './pages/VisualizerPage';
import { BookOpen, LayoutDashboard, BrainCircuit } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedAlgoId, setSelectedAlgoId] = React.useState('bubble-sort');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            onExplore={() => setActiveTab('algorithms')} 
          />
        );
      case 'algorithms':
        return (
          <AlgorithmsPage 
            onSelectAlgo={(id) => {
              setSelectedAlgoId(id);
              setActiveTab('visualizer');
            }} 
          />
        );
      case 'visualizer':
        return <VisualizerPage selectedAlgoId={selectedAlgoId} />;
      case 'courses':
        return (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-indigo-400 mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-slate-200">Interactive Courses — Coming Soon</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md">
              We are working on conceptual structured notes for Arrays, Linked Lists, Stack, and Queue.
            </p>
          </div>
        );
      case 'practice':
        return (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto">
            <BrainCircuit className="w-12 h-12 text-emerald-400 mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-slate-200">Practice Quiz & Dry-Runs — Coming Soon</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md">
              Test your understanding of complexity thresholds and step-prediction problems.
            </p>
          </div>
        );
      case 'dashboard':
        return (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto">
            <LayoutDashboard className="w-12 h-12 text-amber-400 mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-slate-200">User Learning Dashboard — Coming Soon</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md">
              View your percentage completed courses, bookmarks, and quiz stats.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navigation */}
      <Navbar activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Main Responsive Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 flex flex-col justify-center">
        {renderContent()}
      </main>

      {/* Footer (Premium Glassmorphic Footer) */}
      {activeTab !== 'home' && activeTab !== 'visualizer' && (
        <footer className="border-t border-slate-900/60 bg-slate-950/90 py-7 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2.5 font-sans relative shrink-0">
          {/* Glow Divider line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent"></div>
          
          <span>© {new Date().getFullYear()} AlgoInsight. Designed for MCA 3rd Semester Project.</span>
          <span className="hidden sm:inline text-slate-800">|</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-rose-500 animate-pulse">❤️</span> by <span className="text-slate-350 font-semibold hover:text-cyan-400 transition-colors">Pulkit Mishra</span> and <span className="text-slate-350 font-semibold hover:text-cyan-400 transition-colors">Deeksha Garg</span>
          </span>
        </footer>
      )}
    </div>
  );
}

export default App;
