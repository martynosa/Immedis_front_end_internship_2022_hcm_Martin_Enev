import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Employees from './Components/Employees';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Landing from './Components/Landing';
import Profile from './Components/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
