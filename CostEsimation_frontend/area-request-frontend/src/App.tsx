

// // export default App;
// import React from 'react';
// import Navbar from './components/home_components/Navbar';
// import WelcomeSection from './components/home_components/WelcomeSection';
// import UserFeedback from './components/home_components/UserFeedback';
// import ContactUs from './components/home_components/ContactUs';
// import { Route, Routes } from 'react-router-dom';
// import Home from './components/home_components/Home';
// import WelcomeCommunity from './components/login_components/WelcomeCommunity';
// import RegistrationPage from './components/login_components/Resgistration';
// import LoginForm from './components/login_components/Login';
// import PropertyDetailsForm from './components/user_components/PropertyDetailsForm';
// import PropertyListing from './components/constructor_comp/PropertyCard';
// import PropertyBid from './components/user_components/BidProperty';
// // Updated component import

// // Sample property data for demonstration
// const sampleProperties = [
//   {
//     id: 1,
//     name: 'Modern Villa',
//     state: 'Maharashtra',
//     city: 'Pune',
//     builtUpArea: '3000 sq ft',
//     ownerName: 'Abhishek Patil',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   // Add more property objects as needed
// ];
// const bidProperties = [
//   {
//     id: 1,
//     name: 'Modern Villa',
//     state: 'Maharashtra',
//     city: 'Pune',
//     builtUpArea: '3000 sq ft',
   
//     constructorName:'Abhishek Patil',
    
//   },
//   {
//     id: 1,
//     name: 'Modern Villa',
//     state: 'Maharashtra',
//     city: 'Pune',
//     builtUpArea: '3000 sq ft',
   
//     constructorName:'Abhishek Patil',
    
//   },
//   {
//     id: 1,
//     name: 'Modern Villa',
//     state: 'Maharashtra',
//     city: 'Pune',
//     builtUpArea: '3000 sq ft',
   
//     constructorName:'Abhishek Patil',
    
//   },
  
//   // Add more property objects as needed
// ];

// const App: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = React.useState(false);

//   const handleViewDetails = (id: number) => {
//     console.log('View details for property ID:', id);
//   };

//   const handleEstimate = (id: number) => {
//     console.log('Estimate for property ID:', id);
//   };

//   return (
//     <div>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/welcome-community" element={<WelcomeCommunity />} />
//         <Route path="/registration" element={<RegistrationPage />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/property_details" element={<PropertyDetailsForm />} />
        

//         {/* Render PropertyListing component with necessary props */}
//         <Route path="/list_property" element={<PropertyListing 
//         properties={sampleProperties} 
//         onViewDetails={handleViewDetails}
         
//          onEstimate={handleEstimate}
//             />
//           }
//         />
//         <Route path="/bidproperties" element={<PropertyBid
//         property={bidProperties} 
//         onViewDetails={handleViewDetails}
         
//          onEstimate={handleEstimate} />} 
//          />
       
//       </Routes>
//     </div>
//   );
// };

// // export default App;import React from 'react';
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

// Sample property data for demonstration
<<<<<<< HEAD
// const sampleProperties = [
//   {
//     id: 1,
//     name: 'Modern Villa',
//     state: 'Maharashtra',
//     city: 'Pune',
//     builtUpArea: '3000 sq ft',
//     ownerName: 'Abhishek Patil',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   {
//     id: 1,
//     name: 'AKRA 141B',
//     state: 'Kerala',
//     city: 'Trivandrum',
//     builtUpArea: '2500 sq ft',
//     ownerName: 'John Doe',
    
//   },
//   // Add more property objects as needed
// ];
=======
const sampleProperties = [
  { id: 1, name: 'Modern Villa', state: 'Maharashtra', city: 'Pune', builtUpArea: '3000 sq ft', constructorName: 'Abhishek Patil' },
  { id: 2, name: 'Cozy Cottage', state: 'Kerala', city: 'Kochi', builtUpArea: '1500 sq ft', constructorName: 'Nikhil R.' },
  // Add more property objects with unique IDs as needed
];

const sampleProp = [
  {
    id: 1,
    name: 'Modern Villa',
    state: 'Maharashtra',
    city: 'Pune',
    builtUpArea: '3000 sq ft',
    ownerName: 'Abhishek Patil',
  },
  {
    id: 2,
    name: 'AKRA 141B',
    state: 'Kerala',
    city: 'Trivandrum',
    builtUpArea: '2500 sq ft',
    ownerName: 'John Doe',
  },
];
>>>>>>> b8e7a7e3528188a87de4ea738f5879bb1d01b354

const App: React.FC = () => {
  const handleViewDetails = (id: number) => {
    console.log('View details for property ID:', id);
  };

  const handleStartBuilding = (id: number) => {
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
<<<<<<< HEAD

        {/* Render PropertyListing component with necessary props */}
        <Route
          path="/list_property"
          element={
            <PropertyListing
              // properties={sampleProperties}
              onViewDetails={handleViewDetails}
              onEstimate={handleEstimate}
            />
          }
=======
        
        <Route path="/cost_estimation" element={<CostByResourceAllocation />} />
        {/* Route for Property Listing */}
        <Route 
          path="/list_property" 
          element={<PropertyListing properties={sampleProp} onViewDetails={handleViewDetails} onEstimate={handleStartBuilding} />} 
        />

        {/* Route for Property Bidding */}
        <Route 
          path="/bid_properties" 
          element={<PropertyBid properties={sampleProp} onViewDetails={handleViewDetails} onEstimate={handleStartBuilding} />} 
>>>>>>> b8e7a7e3528188a87de4ea738f5879bb1d01b354
        />
      </Routes>
    </div>
  );
};

export default App;
