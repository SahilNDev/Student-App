import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/Profile.css";
import { useNavigate } from 'react-router-dom';

function Company() {
  const { id } = useParams();
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('id');
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('userType');
    window.location = "/";
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const company = await axios.get(`http://localhost:5000/students/company/${id}`);
        setCompany(company.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <button className="back-button btn btn-primary" onClick={() => navigate("/students")}>Back</button>
      {userType === null && (
        <div className="login-container">
          <h2>Login to view your profile</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
      {(id !== userId && (
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You do not have access to this profile.</p>
        </div>
      ))}
      {(id === userId && userType === 'company' && (
        <div className="profile-card">
          <h2 className="card-title">Company Profile</h2>
          <div>
            <label>Name: </label>
            <span>{company.name}</span>
          </div>
          <div>
            <label>Email: </label>
            <span>{company.email}</span>
          </div>
          <div>
            <label>Company: </label>
            <span>{company.companyName}</span>
          </div>
          <div className="card-footer">
            <button className="sign-out btn btn-primary" onClick={handleLoginClick}>Sign Out</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Company;
