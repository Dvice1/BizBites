import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainApp from './MainApp'; // Main application page
import Login from './Login'; // General login page
import RestaurantLogin from './RestaurantLogin'; // Restaurant login page
import RestaurantApp from './RestaurantApp'; // Restaurant landing page
import RestaurantMeals from './RestaurantMeals'; // Restaurant Meals Page
import RestaurantOrders from './RestaurantOrders'; // Restaurant Orders Page
import EmployeeLogin from './EmployeeLogin'; // Employee login page
import CompanyLogin from './CompanyLogin'; // Company login page
import CompanyApp from './CompanyApp'; // Company landing page
import EmployeeApp from './EmployeeApp'; // Employee landing page
import EmployeeRegister from './EmployeeRegister'; //Employee registration page
import EmployeeAccount from './EmployeeAccount'; // Employee modification page

function App() {
  return (
    <Router>
      <Routes>
        {/* General routes */}
        <Route path="/" element={<Login />} />  {/* General login page */}
        
        {/* Restaurant routes */}
        <Route path="/restaurant-login" element={<RestaurantLogin />} />  {/* Restaurant login */}
        <Route path="/restaurant-app" element={<RestaurantApp />} />  {/* Restaurant landing page */}
        <Route path="/restaurant-meals" element={<RestaurantMeals />} /> {/* Restaurant meals page */}
        <Route path="/restaurant-orders" element={<RestaurantOrders />} /> {/* Restaurant orders page */}

        {/* Employee routes */}
        <Route path="/employee-login" element={<EmployeeLogin />} />  {/* Employee login */}
        <Route path="/employee-app" element={<EmployeeApp />} />  {/* Employee landing page */}
        <Route path="/employee-register" element={<EmployeeRegister />} /> {/* Employee register */}
        <Route path="/employee-account" element={<EmployeeAccount />} /> {/* Employee account */}

        {/* Company routes */}
        <Route path="/company-login" element={<CompanyLogin />} />  {/* Company login */}
        <Route path="/company-app" element={<CompanyApp />} />  {/* Company landing page */}
        
        {/* Main app route */}
        <Route path="/main-app" element={<MainApp />} />  {/* Main app page after login */}
      </Routes>
    </Router>
  );
}

export default App;
