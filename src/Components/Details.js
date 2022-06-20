import React from 'react';

const Details = () => {
  return (
    <>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Martin Enev</h4>
        {/* PHOTO GOES HERE */}
        <form>
          <div className="row g-3">
            <div className="col-sm-6">
              <label for="fullName" className="form-label">
                Full name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value="Martin"
              />
            </div>

            <div className="col-sm-6">
              <label for="gender" className="form-label">
                Gender
              </label>
              <select className="form-control" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="col-12">
              <label for="uploadPhoto" className="form-label">
                Profile photo
              </label>
              <div className="input-group">
                <input type="file" class="form-control" id="uploadPhoto" />
              </div>
            </div>

            <div className="col-12">
              <label for="phone" className="form-label">
                Phone number
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text">+359</span>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="888888888"
                />
              </div>
            </div>

            <div className="col-12">
              <label for="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value="Varna"
              />
            </div>

            <hr class="my-4" />

            <div className="col-md-6">
              <label for="employmentType" className="form-label">
                Employment type
              </label>
              <select className="form-select" id="employmentType">
                <option value="fullTime">Full time</option>
                <option value="intern">Intern</option>
                <option value="partTime">Part time</option>
              </select>
            </div>

            <div className="col-md-6">
              <label for="department" className="form-label">
                Department
              </label>
              <select class="form-select" id="department">
                <option value="humanResource">Human resource</option>
                <option value="accounting">Accounting</option>
                <option value="sales">Sales</option>
                <option value="it">IT</option>
              </select>
            </div>

            <div className="col-md-6">
              <label for="jobTitle" className="form-label">
                Job Title
              </label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                value="Developer"
              />
            </div>

            <div className="col-md-6">
              <label for="salary" className="form-label">
                Salary
              </label>
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  BGN
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  value="1500"
                />
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <button class="w-100 btn btn-primary btn-lg" type="submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Details;
