import React, { useState, useEffect } from 'react';
import Navbar from './components/home_components/Navbar';
import WelcomeSection from './components/home_components/WelcomeSection';
import UserFeedback from './components/home_components/UserFeedback';
import ContactUs from './components/home_components/ContactUs';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home_components/Home';
import WelcomeCommunity from './components/login_components/WelcomeCommunity';
import RegistrationPage from './components/login_components/Resgistration';
import LoginForm from './components/login_components/Login';
import PropertyDetailsForm from './components/user_components/PropertyDetailsForm';
import PropertyListing from './components/constructor_comp/PropertyCard';
import PropertyBid from './components/user_components/BidProperty';
import CostByResourceAllocation from './components/constructor_comp/costEstimation';
import axios from 'axios';

interface Property {
  user_email: string;
  user_name: string;
  city: string;
  state: string;
  builtup_area: number;
  property_name: string;
}

// Sample property data for demonstration
const sampleProperties = [
  { id: "1", name: 'Modern Villa', state: 'Maharashtra', city: 'Pune', builtUpArea: '3000 sq ft', constructorName: 'Abhishek Patil' },
  { id: "2", name: 'Cozy Cottage', state: 'Kerala', city: 'Kochi', builtUpArea: '1500 sq ft', constructorName: 'Nikhil R.' },
  // Add more property objects with unique IDs as needed
];

const sampleProp = [
  {
    id: "1",
    name: 'Modern Villa',
    state: 'Maharashtra',
    city: 'Pune',
    builtUpArea: '3000 sq ft',
    ownerName: 'Abhishek Patil',
  },
  {
    id: "2",
    name: 'AKRA 141B',
    state: 'Kerala',
    city: 'Trivandrum',
    builtUpArea: '2500 sq ft',
    ownerName: 'John Doe',
  },
];

const App: React.FC = () => {
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

  const handleViewDetails = (id: string) => {
    console.log('View details for property ID:', id);
  };

  const handleStartBuilding = (id: string) => {
    console.log('Start building for property ID:', id);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/welcome-community" element={<WelcomeCommunity />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/property_details" element={<PropertyDetailsForm />} />
        
        <Route path="/cost_estimation" element={<CostByResourceAllocation />} />
        {/* Route for Property Listing */}
        <Route 
          path="/list_property" 
          element={<PropertyListing 
            properties={properties}
            onViewDetails={handleViewDetails} 
            onEstimate={handleStartBuilding} 
          />} 
        />

        {/* Route for Property Bidding */}
        {/* <Route 
          path="/bid_properties" 
          element={<PropertyBid properties={sampleProp} onViewDetails={handleViewDetails} onEstimate={handleStartBuilding} />} 
        /> */}
      </Routes>
    </div>
  );
};

export default App;
