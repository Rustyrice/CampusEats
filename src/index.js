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
import EnquiriesPage from './pages/Enquiries'
import SignUp from './pages/SignUp'
import ErrorPage from './ErrorPage'
import DietarySelectionPage1 from './pages/DietarySelectionPage1'
import DietarySelectionPage2 from './pages/DietarySelectionPage2'
import DietarySelectionPage3 from './pages/DietarySelectionPage3'
import UserInfo from './pages/UserInfo'
import Settings from './pages/Settings'
import Mealcomp from "./pages/mealcomp";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/enquiries" element={<EnquiriesPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dp1" element={<DietarySelectionPage1 />} />
        <Route path="/dp2" element={<DietarySelectionPage2 />} />
        <Route path="/dp3" element={<DietarySelectionPage3 />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
