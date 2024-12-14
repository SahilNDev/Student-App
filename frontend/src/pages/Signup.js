import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Auth.css";

function Signup() {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    resume: null,
    email: '',
    studentId: '',
    department: '',
    college: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    admin_code: '',
  });
  const [colleges, setColleges] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  if(localStorage.getItem('id') !== null) {
    window.location = "/";
  }

  useEffect(() => {
    // Fetch colleges
    axios.get('http://localhost:5000/signup/colleges')
      .then(response => {
        setColleges(response.data);
      })
      .catch(error => {
        console.error('Error fetching colleges:', error);
      });

    // Fetch companies
    axios.get('http://localhost:5000/signup/companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      name: '',
      description: '',
      image: null,
      resume: null,
      email: '',
      studentId: '',
      department: '',
      college: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      admin_code: '',
    });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (userType === 'student') {
        const formDataSend = new FormData();
        formDataSend.append('name', formData.name);
        formDataSend.append('description', formData.description);
        formDataSend.append('image', formData.image);
        formDataSend.append('resume', formData.resume);
        formDataSend.append('email', formData.email);
        formDataSend.append('studentId', formData.studentId);
        formDataSend.append('department', formData.department);
        formDataSend.append('college', formData.college);
        formDataSend.append('password', formData.password);

        const response = await axios.post('http://localhost:5000/signup/student', formDataSend,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        console.log('Signup successful:', response.data);
        localStorage.setItem('id', response.data);
        localStorage.setItem('userType', 'student');
        window.location = "/"
      } else if (userType === 'admin') {
        const response = await axios.post('http://localhost:5000/signup/admin', {
          name: formData.name,
          email: formData.email,
          college: formData.college,
          admin_code: formData.admin_code,
          password: formData.password,
        });
        console.log('Signup successful:', response.data);
        localStorage.setItem('id', response.data);
        localStorage.setItem('userType', 'admin');
        window.location = "/"
      } else if (userType === 'company') {
        const response = await axios.post('http://localhost:5000/signup/company', {
          name: formData.name,
          email: formData.email,
          companyName: formData.companyName,
          password: formData.password,
        });
        console.log('Signup successful:', response.data);
        localStorage.setItem('id', response.data);
        localStorage.setItem('userType', 'company');
        window.location = "/"
      }
      // Handle successful signup response (e.g., redirect to login page)
    } catch (error) {
      alert(`Signup error: ${error.response.data}`)
      console.error('Signup error:', error.response.data);
      // Handle signup errors (e.g., display error message)
    }
  };

  const handleSelectCollege = (event) => {
    const selectedCollege = event.target.value;
    if (selectedCollege === 'add_new') {
      const newCollegeName = prompt('Enter the name of the new college:');
      if (newCollegeName) {
        // Add new college
        setColleges([...colleges, { id: new Date().getTime(), name: newCollegeName }]);
        setFormData({ ...formData, college: newCollegeName });
      }
    } else {
      setFormData({ ...formData, college: selectedCollege });
    }
  };

  const handleSelectCompany = (event) => {
    const selectedCompany = event.target.value;
    if (selectedCompany === 'add_new') {
      const newCompanyName = prompt('Enter the name of the new company:');
      if (newCompanyName) {
        // Add new company
        setCompanies([...companies, { id: new Date().getTime(), name: newCompanyName }]);
        setFormData({ ...formData, companyName: newCompanyName });
      }
    } else {
      setFormData({ ...formData, companyName: selectedCompany });
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-white">Signup</h2>
      <div className="d-flex justify-content-around mb-3 userButtons">
        <button
          type="button"
          className={`btn btn-primary ${userType === 'student' ? 'active' : ''}`}
          onClick={() => handleUserTypeChange('student')}
        >
          Student
        </button>
        <button
          type="button"
          className={`btn btn-primary ${userType === 'admin' ? 'active' : ''}`}
          onClick={() => handleUserTypeChange('admin')}
        >
          Admin
        </button>
        <button
          type="button"
          className={`btn btn-primary ${userType === 'company' ? 'active' : ''}`}
          onClick={() => handleUserTypeChange('company')}
        >
          Company
        </button>
      </div>
      <div className="card-container">
      <form onSubmit={handleSubmit}>
      {userType === 'student' && <h3 className="text-white">Student Sign Up</h3>}
      {userType === 'admin' && <h3 className="text-white">Admin Sign Up</h3>}
      {userType === 'company' && <h3 className="text-white">Company Sign Up</h3>}
      {userType !== '' && (
        <div className="form-group">
          <label htmlFor="name" className="text-white">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}
        {userType !== '' && (
          <div className="form-group">
          <label htmlFor="email" className="text-white">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        )}
        {userType === 'student' && (
  <>
    <div className="form-group">
      <label htmlFor="description" className="text-white">Description</label>
      <textarea
        className="form-control"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
    </div>
        <div className="form-group">
          <label htmlFor="image" className="text-white">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume" className="text-white">Resume</label>
          <input
            type="file"
            className="form-control"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
  </>
)}

        {userType === 'student' && (
          <div className="form-group">
            <label htmlFor="college" className="text-white">College</label>
            <select
              className="form-control"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleSelectCollege}
              required
            >
              <option value="">Select College</option>
              {colleges.map(college => (
                <option key={college.id} value={college.name}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {userType === 'student' && (
          <>
            <div className="form-group">
              <label htmlFor="studentId" className="text-white">Student ID</label>
              <input
                type="text"
                className="form-control"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        {userType === 'student' && (
          <div className="form-group">
            <label htmlFor="department" className="text-white">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {userType === 'company' && (
          <div className="form-group">
            <label htmlFor="companyName" className="text-white">Company Name</label>
            <select
              className="form-control"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleSelectCompany}
              required
            >
              <option value="">Select Company</option>
              {companies.map(company => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
              <option value="add_new">Add New Company</option>
            </select>
          </div>
        )}
        {userType === 'admin' && (
          <div className="form-group">
            <label htmlFor="college" className="text-white">College</label>
            <select
              className="form-control"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleSelectCollege}
              required
            >
              <option value="">Select College</option>
              {colleges.map(college => (
                <option key={college.id} value={college.name}>
                  {college.name}
                </option>
              ))}
              <option value="add_new">Add New College</option>
            </select>
          </div>
        )}
        {userType === 'admin' && (
          <div className="form-group">
            <label htmlFor="admin_code" className="text-white">Admin Code</label>
            <input
              type="text"
              className="form-control"
              id="admin_code"
              name="admin_code"
              value={formData.admin_code}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {userType !== '' && (
        <div className="form-group">
          <label htmlFor="password" className="text-white">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        )}
        {userType !== '' && (
        <div className="form-group">
          <label htmlFor="confirmPassword" className="text-white">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        )}
        {userType !== '' && (
        <div>
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'blue' }}>
          Sign Up
        </button>
          <div className="text-center mt-3 text-">
          Already have a account <Link to="/login" className="btn btn-link">Login</Link>
        </div>
        </div>
        )}
      </form>

      </div>
    </div>
  );
}

export default Signup;
