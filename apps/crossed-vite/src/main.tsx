import '../style.config.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'virtual:crossed.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
