import '@/styles/index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Critical Boot Error: Failed to find the physical DOM element with id "root".')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
