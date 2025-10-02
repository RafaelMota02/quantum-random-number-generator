import { Component } from 'react';

/**
 * Error boundary component for catching React errors
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Log the error for debugging
    console.warn('Error boundary caught error:', error);
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error('Error Boundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Here you could send the error to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;

      // Use custom fallback if provided, otherwise default
      if (Fallback) {
        return <Fallback error={this.state.error} onReload={this.handleReload} />;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="text-center p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-slate-400 mb-6 max-w-md">
              An unexpected error occurred in the application. This has been logged for review.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Reload Application
            </button>
            {import.meta.env.DEV && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm">Error Details (Dev Only)</summary>
                <pre className="mt-2 p-2 bg-black rounded text-xs overflow-x-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
