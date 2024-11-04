import React, { useState, useEffect } from 'react';
import Navbar from './components/home_components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/home_components/Home';
import WelcomeCommunity from './components/login_components/WelcomeCommunity';
import LoginForm from './components/login_components/Login';
import PropertyDetailsForm from './components/user_components/PropertyDetailsForm';
import PropertyListing from './components/constructor_comp/PropertyCard';
import CostByResourceAllocation from './components/constructor_comp/costEstimation';
import axios from 'axios';
import PropertyDetail from './components/constructor_comp/AreaRequestDetails';
import { Property } from './components/types/Property';

import ContactUs from './components/home_components/ContactUs';
import Services from './components/home_components/Services';
import AboutUs from './components/home_components/AboutUs';
import RegistrationPage from './components/login_components/Resgistration';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/context/privateRount';
import PropertyBid from './components/user_components/BidProperty';

 // Fixed typo in import

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'user' | 'constructor' | null>(null); // Track user type
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/area-requests');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleLogin = (type: 'user' | 'constructor') => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  // Define the handleStartBuilding function

  const handleStartBuilding = (id: string) => {
    console.log('Start building for property ID:', id);
  };

  return (
    <AuthProvider>
    {/* <Router> */}
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)' }}>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />s
        <Route path="/welcome-community" element={<WelcomeCommunity />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        {/* <Route path="/property_details" element={<PrivateRoute><PropertyDetailsForm /></PrivateRoute>} /> */}
        <Route path="/property_details" element={<PrivateRoute><PropertyDetailsForm /></PrivateRoute>} />
        <Route path="/bid_property" element={
          <PropertyBid 
            onViewDetails={(id) => {
              console.log('Viewing details for:', id);
              // Add your view details logic here
            }} 
            onEstimate={(id) => {
              console.log('Estimating for:', id);
              // Add your estimation logic here
            }}
          />
        } />

        <Route path="/cost_estimation" element={<PrivateRoute><CostByResourceAllocation /></PrivateRoute>} />
        {/* <Route
          path="/list_property"
          element={<PropertyListing properties={properties} onEstimate={handleStartBuilding} />}
        /> */}
        <Route path="/list_property" element={<PrivateRoute><PropertyListing properties={properties}onEstimate={handleStartBuilding} /></PrivateRoute>} />

        <Route path="/area-request-details/:email" element={<PropertyDetail properties={properties} />} />
      </Routes>
    </div>
    {/* </Router> */}
    </AuthProvider>
  );
};

export default App;
