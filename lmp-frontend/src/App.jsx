import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';
import LandingPage from './pages/LandingPage';
import DashBoard from './pages/Home/DashBoard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import UserProvider from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
           <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<LogIn />} />

            <Route path="/signup" element={<SignUp />} />

            <Route path="/dashboard" element={<DashBoard />} />

            <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
           </Routes>
      </Router>

      <Toaster toastOptions={{
        className:"",
        style: {
          fontSize: "13px",
        },      
      }} />
    </div>
    </UserProvider>
  )
}

export default App
