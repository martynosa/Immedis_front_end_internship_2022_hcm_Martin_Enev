import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Common/Navbar';
import Notification from './Components/Common/Notification';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Employees from './Components/Employees/Employees';
import Details from './Components/Details/Details';
import Update from './Components/Update/Update';
import GuestGuard from './Guards/GuestGuard';
import UserGuard from './Guards/UserGuard';
import ErrorRoute from './Components/ErrorRoute';

function App() {
  return (
    <>
      <Navbar />
      <Notification />

      <Routes>
        <Route element={<UserGuard />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/profile" element={<Details />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:employee" element={<Details />} />
          <Route path="/employees/:employee/update" element={<Update />} />
        </Route>
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </>
  );
}

export default App;
