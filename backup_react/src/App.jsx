import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import AccountDetail from './pages/AccountDetail'; // New
import CustomerDetail from './pages/CustomerDetail'; // New

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
