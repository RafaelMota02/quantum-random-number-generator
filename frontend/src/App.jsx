import './App.css';
import { useEffect } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import NumberGenerator from './components/features/NumberGenerator.jsx';
import QuantumDescription from './components/features/QuantumDescription.jsx';
import History from './components/features/History.jsx';
import { useQuantumApi } from './hooks/useQuantumApi.js';
import { useHistory } from './hooks/useHistory.js';
import { ping } from './utils/api.js';
import { KEEP_ALIVE_CONFIG } from './utils/constants.js';

function App() {
  const { loading, error, lastNumber, generateNumber, clearError } = useQuantumApi();
  const { history, addNumber, clearHistory, removeNumber } = useHistory();

  const handleGenerate = async () => {
    const number = await generateNumber();
    if (typeof number === 'number') {
      addNumber(number);
    }
  };

  // Clear error on any interaction
  const handleUserAction = () => {
    if (error) clearError();
  };

  // Keep-alive ping for Render backend in production
  useEffect(() => {
    if (import.meta.env.PROD) {
      const interval = setInterval(async () => {
        try {
          await ping();
        } catch (error) {
          console.warn('Keep-alive ping failed:', error);
        }
      }, KEEP_ALIVE_CONFIG.INTERVAL);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white font-sans flex flex-col"
        onClick={handleUserAction}
        onKeyDown={handleUserAction}
        tabIndex={-1} // Allow focus for key events
      >
        <Header />
        <main className="flex-1 py-8 lg:py-16 px-4">
          <div className="space-y-8 lg:space-y-12">
            {/* Error message display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                <p className="text-red-300">{error}</p>
                <button
                  onClick={clearError}
                  className="mt-2 text-xs underline hover:text-red-400"
                >
                  Dismiss
                </button>
              </div>
            )}

            <NumberGenerator
              randomNumber={lastNumber}
              onGenerate={handleGenerate}
              loading={loading}
            />
            <QuantumDescription />

            <History
              history={history}
              onClear={clearHistory}
              onRemove={removeNumber}
            />
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
