import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-container">
      <div>
        <h1 className="landing-heading">
          HR management made <span className="easy">easy</span>
        </h1>
        <p className="text-center">
          Modernize your HR. Manage your hiring, employee data, and time-offs.
        </p>
        <div className="btnGroup">
          <Link to="/login" className="btn btn-warning btn-lg mt-3">
            Get started
          </Link>
        </div>
      </div>

      <img
        className="landing-img"
        src="../../imgs/illustration-flipped.png"
        alt="coworkers talking"
      ></img>
    </div>
  );
};

export default Landing;
