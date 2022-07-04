import React from 'react';
import { Link } from 'react-router-dom';

const ErrorRoute = () => {
  return (
    <div className="error-page">
      <h1 className="display-1">404</h1>
      <h3 className="display-3 text-muted">Page not found!</h3>
      <Link to="/" className="btn btn-warning btn-lg backBtn">
        <ion-icon name="arrow-back"></ion-icon>
        Back
      </Link>
    </div>
  );
};

export default ErrorRoute;
