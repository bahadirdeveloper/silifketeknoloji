import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Log error to external service (if available)
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/100 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 z-20" />

          {/* Error Content */}
          <div className="relative z-40 flex items-center justify-center min-h-screen px-6">
            <div className="text-center max-w-md">
              <div className="mb-8">
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Bir Hata Oluştu
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Üzgünüz, beklenmedik bir hata oluştu. Lütfen sayfayı yeniden yükleyin
                  veya ana sayfaya dönün.
                </p>
              </div>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
                  <h3 className="text-red-400 font-semibold mb-2">Hata Detayları:</h3>
                  <p className="text-gray-400 text-sm font-mono break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700
                           text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300
                           shadow-2xl shadow-yellow-500/30"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Yeniden Dene</span>
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="flex items-center justify-center space-x-2 bg-black/50 border border-gray-600
                           text-white font-semibold px-6 py-3 rounded-xl hover:border-yellow-400/50
                           hover:text-yellow-400 transition-all duration-300"
                >
                  <Home className="w-5 h-5" />
                  <span>Ana Sayfa</span>
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                  Sorun devam ederse bizimle iletişime geçin:
                </p>
                <a
                  href="mailto:info@silifketeknoloji.com"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm font-medium"
                >
                  info@silifketeknoloji.com
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for page-level error boundaries
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
