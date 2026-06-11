import { createRoot } from 'react-dom/client'
import './index.css'
import { WebsiteProvider } from "./context/websites.context.jsx";
import App from './App.jsx'
import { AuthProvider } from "./context/auth.context.jsx";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <WebsiteProvider>
      <App />
    </WebsiteProvider>
  </AuthProvider>,
)
