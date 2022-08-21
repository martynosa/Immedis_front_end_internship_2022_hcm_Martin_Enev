import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../AuthContext';
import { useNotification } from '../../NotificationContext';
import PageHeader from '../Common/PageHeader';
import { getEmployee, updateEmployee } from '../../services/employeesServices';
import { defaultValueDate, extractId, slugify } from '../../services/helpers';
import FormError from '../Common/FormError';
import Loading from '../Common/Loading';
import UpdateProfilePhotoForm from './UpdateProfilePhotoForm';
import Button from '../Common/Button';

const Update = () => {
  const { user, setUser } = useAuth();
  const { openNotification } = useNotification();
  const navigate = useNavigate();
  const params = useParams();

  const employeeId = extractId(params.employee);
  const [employee, setEmployee] = useState({});
  const [salaryErr, setSalaryErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  // validation
  const phoneValidator = (e) => {
    const phone = e.target.value;
    setPhoneErr(
      /\D/g.test(phone) || (phone.length !== 10 && phone.length !== 0)
    );
  };

  const salaryValidator = (e) => {
    const salary = e.target.value;
    setSalaryErr(salary < 0 || salary.length === 0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let newData = {
      fullName: formData.get('fullName').trim(),
      gender: formData.get('gender'),
      birthDate: formData.get('birthDate'),
      phone: formData.get('phone').trim(),
      address: formData.get('address').trim(),
    };

    if (user.role === 'hr') {
      newData = {
        fullName: formData.get('fullName').trim(),
        gender: formData.get('gender'),
        birthDate: formData.get('birthDate'),
        phone: formData.get('phone').trim(),
        address: formData.get('address').trim(),
        entryDate: formData.get('entryDate'),
        employmentType: formData.get('employmentType'),
        jobTitle: formData.get('jobTitle').trim(),
        salary: formData.get('salary').trim(),
      };
    }

    let errorMessage = [];
    if (
      /\D/g.test(newData.phone) ||
      (newData.phone.length !== 10 && newData.phone.length !== 0)
    ) {
      setPhoneErr(true);
      errorMessage.push('Phone must be 10 digits or empty');
    }

    if (user.role === 'hr') {
      if (newData.salary < 0 || newData.salary.length === 0) {
        setSalaryErr(true);
        errorMessage.push('Salary must be equal to 0 or higher');
      }
    }

    if (errorMessage.length !== 0) {
      openNotification('fail', errorMessage.join(', ') + '!');
      return;
    }

    try {
      setIsLoadingBtn(true);
      const updatedEmployee = await updateEmployee(
        user.token,
        employeeId,
        newData
      );
      setEmployee(updatedEmployee);
      if (user._id === updatedEmployee._id)
        setUser({ ...user, ...updatedEmployee });
      openNotification(
        'success',
        `${updatedEmployee.fullName} updated successfully.`
      );
      setIsLoadingBtn(false);
      navigate(
        `/employees/${slugify(updatedEmployee.fullName)}-${updatedEmployee._id}`
      );
    } catch (error) {
      openNotification('fail', error.message);
      setIsLoadingBtn(false);
    }
  };

  useEffect(() => {
    getEmployee(user.token, employeeId).then((empl) => {
      setEmployee(empl);
      setIsLoading(false);
    });
  }, [user.token, employeeId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container y-4 mt-3">
      <PageHeader user={user} employee={employee} />

      <UpdateProfilePhotoForm
        user={user}
        setUser={setUser}
        employee={employee}
        setEmployee={setEmployee}
        openNotification={openNotification}
      />

      <form onSubmit={submitHandler}>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="fullName" className="form-label">
              Full name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              defaultValue={employee.fullName}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              defaultValue={employee.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="birthDate" className="form-label">
              Birth date
            </label>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                defaultValue={defaultValueDate(employee.birthDate)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="phone" className="form-label">
              Phone number
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <ion-icon name="phone-portrait"></ion-icon>
              </span>
              <input
                type="text"
                className={phoneErr ? 'error form-control' : 'form-control'}
                id="phone"
                name="phone"
                defaultValue={employee.phone}
                onBlur={phoneValidator}
              />
            </div>
            {phoneErr && (
              <FormError message={'Phone must be 10 digits or empty!'} />
            )}
          </div>

          <div className="col-md-8 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              defaultValue={employee.address}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="entryDate" className="form-label">
              Entry date
            </label>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                id="entryDate"
                name="entryDate"
                defaultValue={defaultValueDate(employee.entryDate)}
                disabled={user.role !== 'hr'}
              />
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="employmentType" className="form-label">
              Employment type
            </label>
            <select
              className="form-select"
              id="employmentType"
              name="employmentType"
              defaultValue={employee.employmentType}
              disabled={user.role !== 'hr'}
            >
              <option value="Full time">Full time</option>
              <option value="Intern">Intern</option>
              <option value="Part time">Part time</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="jobTitle" className="form-label">
              Job title
            </label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              defaultValue={employee.jobTitle}
              disabled={user.role !== 'hr'}
            />
          </div>

          <div className="col-md-6 mb-5">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                BGN
              </span>
              <input
                type="number"
                className={salaryErr ? 'error form-control' : 'form-control'}
                id="salary"
                name="salary"
                defaultValue={employee.salary}
                disabled={user.role !== 'hr'}
                onBlur={salaryValidator}
              />
            </div>
            {salaryErr && (
              <FormError message={'Salary must be equal to 0 or higher!'} />
            )}
          </div>
        </div>

        <Button
          isLoading={isLoadingBtn}
          color={'primary'}
          text={'Update'}
          type={'submit'}
          addClass={'w-100 btn-lg'}
        />
      </form>
    </div>
  );
};

export default Update;
