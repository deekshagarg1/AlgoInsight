import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import VisualizerPage from './pages/VisualizerPage';
import CoursesPage from './pages/CoursesPage';
import PracticePage from './pages/PracticePage';
import DashboardPage from './pages/DashboardPage';
import AuthModal from './components/AuthModal';
import { AuthContext } from './context/AuthContext';
import { BookOpen, LayoutDashboard, BrainCircuit } from 'lucide-react';

function App() {
  const { syncProgress } = React.useContext(AuthContext);
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedAlgoId, setSelectedAlgoId] = React.useState('bubble-sort');
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const handleAuthSuccess = async () => {
    try {
      const completionsStr = localStorage.getItem('algoinsight_course_completions');
      const completions = completionsStr ? JSON.parse(completionsStr) : {};

      const highScoresStr = localStorage.getItem('algoinsight_high_scores');
      const highScores = highScoresStr ? JSON.parse(highScoresStr) : {};

      const streakStr = localStorage.getItem('algoinsight_streak');
      const streak = streakStr ? Number(streakStr) : 0;

      await syncProgress(completions, highScores, streak);
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Failed to sync progress:', error);
    }
  };

  // Sync state from URL Hash (supports back/forward browser buttons)
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (!hash) {
        setActiveTab('home');
        return;
      }

      const parts = hash.split('/');
      const tab = parts[0];
      const algo = parts[1];

      if (['home', 'algorithms', 'visualizer', 'courses', 'practice', 'dashboard'].includes(tab)) {
        setActiveTab(tab);
        if (tab === 'visualizer' && algo) {
          setSelectedAlgoId(algo);
        }
      }
    };

    // Run once on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL Hash when state changes
  React.useEffect(() => {
    const currentHash = window.location.hash.replace('#/', '');
    const expectedHash = activeTab === 'visualizer' ? `visualizer/${selectedAlgoId}` : activeTab;
    
    if (currentHash !== expectedHash) {
      window.location.hash = `#/${expectedHash}`;
    }
  }, [activeTab, selectedAlgoId]);

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
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        );
      case 'visualizer':
        return <VisualizerPage selectedAlgoId={selectedAlgoId} />;
      case 'courses':
        return (
          <CoursesPage 
            onExploreAlgo={(id) => {
              setSelectedAlgoId(id);
              setActiveTab('visualizer');
            }} 
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        );
      case 'practice':
        return <PracticePage onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case 'dashboard':
        return (
          <DashboardPage 
            onOpenAuth={() => setIsAuthModalOpen(true)} 
            onExplore={(tabId) => setActiveTab(tabId)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        onChangeTab={(tab, algoId) => {
          setActiveTab(tab);
          if (algoId) setSelectedAlgoId(algoId);
        }} 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
      />

      {/* Main Responsive Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 flex flex-col justify-center">
        {renderContent()}
      </main>

      {/* Login & Signup Modal Overlay */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />

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
