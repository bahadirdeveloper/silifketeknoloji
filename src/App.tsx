import SilifkeTeknoloji from './components/SilifkeTeknoloji'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/Toast'

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <SilifkeTeknoloji />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
