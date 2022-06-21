import React from 'react';

const Details = () => {
  return (
    <>
      <div class="container py-4">
        <header
          class="pb-3 mb-4 border-bottom"
          style={{ display: 'flex', gap: '16px' }}
        >
          <ion-icon name="person" style={{ 'font-size': '24px' }}></ion-icon>
          <span class="fs-4"> Martin Enev</span>
        </header>

        <div class="p-5 mb-4 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">General</h1>
            <p class="col-md-8 fs-4">
              {/* General info will be here with photo + upload photo on the left and general info on the right */}
              photo/uploadPhoto + name/address/ ...
            </p>
            <button class="btn btn-primary btn-lg" type="button">
              {/* Button that links to UpdateUser.js */}
              Update
            </button>
          </div>
        </div>

        <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <div class="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Employment</h2>
              <p>
                {/* Employment info will be here */}
                employmentType/department/jobTitle/salary/annualSalary/entry
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="h-100 p-5 bg-light border rounded-3">
              <h2>Leave request</h2>
              <p>
                {/* Calendars from-to will be here/should be separate component */}
                calendars
              </p>
              <button class="btn btn-outline-secondary" type="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
