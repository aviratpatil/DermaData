import React, { useState, useEffect } from 'react';
import ScannerInput from './components/ScannerInput';
import ResultsView from './components/ResultsView';
import RecentScansDrawer from './components/RecentScansDrawer';
import ResultsSkeleton from './components/ResultsSkeleton';
import { analyzeIngredients } from './api';
import { History } from 'lucide-react';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('scanHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveToHistory = (data) => {
    const newScan = { ...data, timestamp: new Date().toLocaleDateString() };
    const newHistory = [newScan, ...history].slice(0, 5); // Keep last 5
    setHistory(newHistory);
    localStorage.setItem('scanHistory', JSON.stringify(newHistory));
  };

  const handleAnalyze = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeIngredients(text);
      // Add a small delay for effect if response is too fast
      setTimeout(() => {
        setResults(data);
        saveToHistory(data);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Failed to analyze. Please ensure the backend is running.");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-slate-900 text-white p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center font-bold text-lg">
            IS
          </div>
          <h1 className="text-xl font-bold tracking-tight">Ingredient Safety</h1>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
          title="Recent Scans"
        >
          <History size={24} />
        </button>
      </header>

      <main className="container mx-auto">
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-200 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <ResultsSkeleton />
        ) : !results ? (
          <ScannerInput onAnalyze={handleAnalyze} isLoading={loading} />
        ) : (
          <ResultsView data={results} onReset={handleReset} />
        )}
      </main>

      <RecentScansDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        scans={history}
        onLoadScan={(scan) => {
          setResults(scan);
          setIsDrawerOpen(false);
        }}
      />

      <footer className="fixed bottom-4 right-4 text-xs text-gray-600">
        v1.0.0 • Built with FastAPI & React
      </footer>
    </div>
  );
}

export default App;
