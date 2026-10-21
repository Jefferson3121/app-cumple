import React from 'react';

/**
 * Error Boundary component for catching and displaying errors in the scene
 * Prevents entire app crash when scene components error out
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Scene Error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error callback prop
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.errorBox}>
            <div style={styles.errorIcon}>⚠️</div>
            <h1 style={styles.title}>Something went wrong</h1>
            <p style={styles.message}>
              The Lapis scene encountered an unexpected error and couldn't display.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details</summary>
                <pre style={styles.errorTrace}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button onClick={this.resetError} style={styles.button}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  errorBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  message: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  details: {
    marginTop: '20px',
    width: '100%',
    textAlign: 'left',
  },
  summary: {
    cursor: 'pointer',
    fontWeight: '500',
    color: '#0066cc',
    marginBottom: '10px',
  },
  errorTrace: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '4px',
    fontSize: '12px',
    overflow: 'auto',
    maxHeight: '200px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
  },
  button: {
    marginTop: '20px',
    padding: '10px 30px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

// Add hover effect to button
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  button:hover {
    background-color: #0052a3 !important;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleSheet);
}

export default ErrorBoundary;
