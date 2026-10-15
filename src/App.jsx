import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Splash from './pages/Splash';
import Game from './pages/Game';
import Instructions from './pages/Instructions';
import Results from './pages/Results';
import Settings from './pages/Settings';
import KioskViewport from './components/KioskViewport';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <KioskViewport>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/game" element={<Game />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/results" element={<Results />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </KioskViewport>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
