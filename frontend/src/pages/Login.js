import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showFields, setShowFields] = useState(false);
  const navigate = useNavigate();

  if(localStorage.getItem('id') !== null) {
    window.location = "/";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, userType);
    try {
      const response = await axios.post('http://localhost:5000/login', { email: email, password: password, userType: userType });
      console.log(response.data);
      localStorage.setItem('id', response.data);
      localStorage.setItem('userType', userType);
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error.response.data);
      alert(`Login error: ${error.response.data}`)
      setEmail('');
      setPassword('');
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setShowFields(true);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container text-white d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-center">Login</h2>
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
      {showFields && (
        <div className="card-container">
          <form onSubmit={handleSubmit}>
            {userType === 'student' && <h3>Student Login</h3>}
            {userType === 'admin' && <h3>Admin Login</h3>}
            {userType === 'company' && <h3>Company Login</h3>}
            <div className="form-group">
              <label htmlFor="email" className="text-white">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-white">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div className="text-center mt-3">
              Don't have an account <Link to="/signup" className="btn btn-link">Sign Up</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
