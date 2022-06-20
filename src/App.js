import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Employees from './Components/Employees';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Landing from './Components/Landing';
import Profile from './Components/Profile';
import Details from './Components/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
