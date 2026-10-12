import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import './styles.css';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('IntelliStack render error:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <main style={{minHeight:'100vh',boxSizing:'border-box',padding:'32px 20px',background:'#070c19',color:'#e8efff',fontFamily:'Inter,system-ui,sans-serif'}}>
          <section style={{maxWidth:760,margin:'8vh auto',padding:28,border:'1px solid #6b3446',borderRadius:18,background:'#0c1425'}}>
            <h1 style={{color:'#ff829d'}}>Command Center encountered an app error</h1>
            <p>The page loaded, but React could not render the interface. This diagnostic is shown instead of a blank screen.</p>
            <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',padding:16,borderRadius:10,background:'#070c19',color:'#ffd4dc'}}>{String(this.state.error?.stack || this.state.error)}</pre>
            <p style={{color:'#aab8cc'}}>Share this error text to identify the exact code fix. No real services are connected.</p>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <React.StrictMode>
    <AppErrorBoundary><App /></AppErrorBoundary>
  </React.StrictMode>
);
