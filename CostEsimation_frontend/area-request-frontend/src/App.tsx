

// import React, { useState, useEffect } from 'react';
// import Navbar from './components/home_components/Navbar';
// import { Routes, Route } from 'react-router-dom';
// import Home from './components/home_components/Home';
// import WelcomeCommunity from './components/login_components/WelcomeCommunity';
// import LoginForm from './components/login_components/Login';
// import PropertyDetailsForm from './components/user_components/PropertyDetailsForm';
// import PropertyListing from './components/constructor_comp/PropertyCard';
// import CostByResourceAllocation from './components/constructor_comp/costEstimation';
// import axios from 'axios';
// import PropertyDetail from './components/constructor_comp/AreaRequestDetails';
// import { Property } from './components/types/Property';

// import ContactUs from './components/home_components/ContactUs';
// import Services from './components/home_components/Services';
// import AboutUs from './components/home_components/AboutUs';

// import { AuthProvider, useAuth } from './components/context/AuthContext';
// import RegistrationPage from './components/login_components/Resgistration';
// import PrivateRoute from './components/context/privateRount';

// const App: React.FC = () => {
//   //const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState<'user' | 'constructor' | null>(null);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3003/api/area-requests');
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };

//     fetchProperties();
//   }, []);

 

 

//   const handleStartBuilding = (id: string) => {
//     console.log('Start building for property ID:', id);
//   };

//   return (
//     // <AuthProvider>
//       <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)' }}>
//         <Navbar isAuthenticated={isAuthenticated }   />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/welcome-community" element={<WelcomeCommunity />} />
//           <Route path="/registration" element={<RegistrationPage />} />
//           <Route path="/login" element={<LoginForm  />} />
//           <Route path="/property_details" element={<PrivateRoute><PropertyDetailsForm /></PrivateRoute>} />
//           <Route path="/cost_estimation" element={<PrivateRoute><CostByResourceAllocation /></PrivateRoute>} />
//           <Route path="/list_property" element={<PrivateRoute><PropertyListing properties={properties} onEstimate={handleStartBuilding} /></PrivateRoute>} />
//           <Route path="/area-request-details/:email" element={<PrivateRoute><PropertyDetail properties={properties} /></PrivateRoute>} />
//         </Routes>
//       </div>
//     // </AuthProvider>
//   );
// };

// export default App;








// import React, { useState, useEffect } from 'react';
// import Navbar from './components/home_components/Navbar';
// import { Routes, Route } from 'react-router-dom';
// import Home from './components/home_components/Home';
// import WelcomeCommunity from './components/login_components/WelcomeCommunity';
// import LoginForm from './components/login_components/Login';
// import PropertyDetailsForm from './components/user_components/PropertyDetailsForm';
// import PropertyListing from './components/constructor_comp/PropertyCard';
// import CostByResourceAllocation from './components/constructor_comp/costEstimation';
// import axios from 'axios';
// import PropertyDetail from './components/constructor_comp/AreaRequestDetails';
// import { Property } from './components/types/Property';

// import ContactUs from './components/home_components/ContactUs';
// import Services from './components/home_components/Services';
// import AboutUs from './components/home_components/AboutUs';

// import { AuthProvider, useAuth } from './components/context/AuthContext';
// import RegistrationPage from './components/login_components/Resgistration';
// import PrivateRoute from './components/context/privateRount';

// const App: React.FC = () => {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const { isAuthenticated } = useAuth(); // This requires the AuthProvider to be present

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3003/api/area-requests');
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handleStartBuilding = (id: string) => {
//     console.log('Start building for property ID:', id);
//   };

//   return (
//     <AuthProvider> {/* Ensure the AuthProvider wraps the application */}
//       <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)' }}>
//         <Navbar isAuthenticated={isAuthenticated} />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/welcome-community" element={<WelcomeCommunity />} />
//           <Route path="/registration" element={<RegistrationPage />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/property_details" element={<PrivateRoute><PropertyDetailsForm /></PrivateRoute>} />
//           <Route path="/cost_estimation" element={<PrivateRoute><CostByResourceAllocation /></PrivateRoute>} />
//           <Route path="/list_property" element={<PrivateRoute><PropertyListing properties={properties} onEstimate={handleStartBuilding} /></PrivateRoute>} />
//           <Route path="/area-request-details/:email" element={<PrivateRoute><PropertyDetail properties={properties} /></PrivateRoute>} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// };

// export default App;

















import React, { useState, useEffect } from 'react';
import Navbar from './components/home_components/Navbar';
import { Routes, Route } from 'react-router-dom';
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

import { AuthProvider, useAuth } from './components/context/AuthContext';
import RegistrationPage from './components/login_components/Resgistration';
import PrivateRoute from './components/context/privateRount';
import PropertyBid from './components/user_components/BidProperty';
import ThankYouPage from './components/user_components/ThankYouPage';
import ThankuPageCons from './components/constructor_comp/ThankuPageCons';

 // Fixed typo in import

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

  const handleStartBuilding = (id: string) => {
    console.log('Start building for property ID:', id);
  };

  return (
    <AuthProvider> {/* Ensure the AuthProvider wraps the application */}
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)' }}>
        <Navbar isAuthenticated={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/welcome-community" element={<WelcomeCommunity />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/property_details" element={<PrivateRoute><PropertyDetailsForm /></PrivateRoute>} />
          <Route path="/cost_estimation" element={<PrivateRoute><CostByResourceAllocation /></PrivateRoute>} />
          <Route path="/list_property" element={<PrivateRoute><PropertyListing properties={properties} onEstimate={handleStartBuilding} /></PrivateRoute>} />
          <Route path="/area-request-details/:email" element={<PrivateRoute><PropertyDetail properties={properties} /></PrivateRoute>} />
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
        <Route path="/thanku_user" element={<ThankYouPage />} />
        <Route path="/thanku_cons" element={<ThankuPageCons />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
