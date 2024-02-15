import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'

// styles
import 'tailwindcss/tailwind.css'

// pages
import LandingPage from './pages/Landing'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import DashboardPage from './pages/Dashboard'
import SignUp from './pages/SignUp'
import ErrorPage from './ErrorPage'
import DietarySelectionPage1 from './pages/DietarySelectionPage1'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dp1" element={<DietarySelectionPage1 />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
