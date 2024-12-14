import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from "../images/logo.jpeg";

function Navbar() {
  const [id, setId] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    const storedUserType = localStorage.getItem('userType');
    if (storedId && storedUserType) {
      setId(storedId);
      setUserType(storedUserType);
    }
  }, []);

  const handleLoginClick = () => {
    if (id) {
      navigate(`/${userType}/${id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={image} alt="Logo" className="logo me-2" style={{ width: '50px', height: '50px' }} />
          Student Profile Platform
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'white' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/students" style={{ color: 'white' }}>Students</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLoginClick}>
                {id ? 'Profile' : 'Login'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
