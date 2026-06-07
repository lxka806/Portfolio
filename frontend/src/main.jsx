import { createRoot } from 'react-dom/client'
import './index.css'
import { WebsiteProvider } from "./context/websites.context.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <WebsiteProvider>
    <App />    
  </WebsiteProvider>,
)
