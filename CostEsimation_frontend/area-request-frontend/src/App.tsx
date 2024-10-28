import React from 'react';
import Navbar from './components/home_components/Navbar';
import WelcomeSection from './components/home_components/WelcomeSection';
import UserFeedback from './components/home_components/UserFeedback';
import ContactUs from './components/home_components/ContactUs';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home_components/Home';
import WelcomeCommunity from './components/login_components/WelcomeCommunity';
import RegistrationPage from './components/login_components/Resgistration';
const App: React.FC = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />

      <Route path="/welcome-community" element={<WelcomeCommunity />} />
      <Route path="/registration" Component={RegistrationPage} />
      {/* Add other routes as needed */}
    </Routes>
  </div>
  );
};

export default App;
