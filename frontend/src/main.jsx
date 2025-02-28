import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './pages/Home'
import Profile from './pages/Profile'
import { UserProvider } from './context/UserContext'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element= { <Home/> } />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
