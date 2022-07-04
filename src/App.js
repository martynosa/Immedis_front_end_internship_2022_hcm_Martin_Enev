import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Common/Navbar';
import Notification from './Components/Common/Notification';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Employees from './Components/Employees';
import Details from './Components/Details';
import Update from './Components/Update';
import GuestGuard from './Guards/GuestGuard';
import UserGuard from './Guards/UserGuard';
import ErrorRoute from './Components/ErrorRoute';

function App() {
  const [notificationSettings, setNotificationSettings] = useState({
    state: false,
    status: 'fail',
    message: '',
  });

  const openNotification = (status, message) => {
    setNotificationSettings({ state: true, status, message });
    setTimeout(() => {
      setNotificationSettings({ state: false, status, message });
    }, 2000);
  };

  return (
    <>
      <Navbar openNotification={openNotification} />
      <Notification
        state={notificationSettings.state}
        status={notificationSettings.status}
        message={notificationSettings.message}
      />

      <Routes>
        <Route element={<UserGuard />}>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={<Login openNotification={openNotification} />}
          />
          <Route
            path="/register"
            element={<Register openNotification={openNotification} />}
          />
        </Route>

        <Route element={<GuestGuard />}>
          <Route
            path="/profile"
            element={<Details openNotification={openNotification} />}
          />
          <Route path="/employees" element={<Employees />} />
          <Route
            path="/employees/:name"
            element={<Details openNotification={openNotification} />}
          />
          <Route
            path="/employees/:name/update"
            element={<Update openNotification={openNotification} />}
          />
        </Route>
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </>
  );
}

export default App;
