import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/scss/main.scss'
import App from './App.jsx'
import GrainOverlay from './components/GrainOverlay/GrainOverlay.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <GrainOverlay />
  </StrictMode>,
)
