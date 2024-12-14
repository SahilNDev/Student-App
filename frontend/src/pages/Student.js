import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/Profile.css";
import { useNavigate } from 'react-router-dom';
import {Popup} from 'reactjs-popup';

function Student() {
  const { id } = useParams();
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('id');
  const [college1, setCollege1] = useState('');
  const [college2, setCollege2] = useState('');
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [studentUpdate, setStudentUpdate] = useState({});
  const navigate = useNavigate();
  

  const handleLoginClick = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('userType');
    window.location = "/";
  };

  const handleSendMail = () => {
    const jobDescription = prompt("Enter Job Description:");
    if (jobDescription) {
      window.location.href = `mailto:${student.email}?subject=Job Opportunity&body=You have been selected for the ${encodeURIComponent(jobDescription)}. Please contact your college for further details.`;
    }
  };

  const handleChange = (e) => {
    setStudentUpdate({ ...studentUpdate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/students/student/${id}`, studentUpdate);
      console.log(response.data);
      alert('Profile updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Profile update error:', error.response.data);
      alert(`Profile update error: ${error.response.data}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const college1 = await axios.get(`http://localhost:5000/students/college/student/${id}`);
        let college2 = college1;
        if (userType !== 'company') {
          college2 = await axios.get(`http://localhost:5000/students/college/${userType}/${userId}`)
        }
        const student = await axios.get(`http://localhost:5000/students/student/${id}`);
        setCollege1(college1.data);
        setCollege2(college2.data);
        setStudent(student.data);
        setStudentUpdate(student.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [userType, userId, id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }
  
  return (
    <div className="container">
      <button className="back-button btn btn-primary" onClick={() => navigate("/students")}>Back</button>
      {userType === null && (
        <div className="login-container">
          <h2>Login to view profiles</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
      {college1 === college2 && (
        <div className="profile-card">
          <h2 className="card-title">Student Profile</h2>
          <div>
            <label>Profile Picture:</label>
            <img src={`http://localhost:5000/${student.image.replace(/\\/g, '/')}`} alt="student" className="card-img-top" style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <label>Name: </label>
            <span>{student.name}</span>
          </div>
          <div>
            <label>Description: </label>
            <span>{student.description}</span>
          </div>
          <div>
            <label>Email: </label>
            <span>{student.email}</span>
          </div>
          <div>
            <label>Student ID: </label>
            <span>{student.studentId}</span>
          </div>
          <div>
            <label>Department: </label>
            <span>{student.department}</span>
          </div>
          <div>
            <label>College: </label>
            <span>{student.college}</span>
          </div>
          <div>
            <label>Resume: </label>
            <a href={`http://localhost:5000/${student.resume.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer">Download</a>
          </div>
          <div className="card-footer">
          {userType !== "company" && (
          <Popup modal trigger={<button className="btn btn-primary">Edit Profile</button>}>
        <div>
        {close => {
          <button className="close" onClick={close}>&times;</button>
        }}
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" value={studentUpdate.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" className="form-control" value={studentUpdate.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" className="form-control" value={studentUpdate.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Student ID:</label>
          <input type="text" name="studentId" className="form-control" value={studentUpdate.studentId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input type="text" name="department" className="form-control" value={studentUpdate.department} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
        </Popup>
        )}
            {userType === 'company' && (
              <button className="mail-button btn btn-primary" onClick={handleSendMail}>Send Mail</button>
            )}
            {(id === userId && userType === 'student') && (
              <button className="sign-out btn btn-primary" onClick={handleLoginClick}>Sign Out</button>
            )}
          </div>
        </div>
      )}
      {college1 !== college2 && (
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You do not have access to this student's profile.</p>
        </div>
      )}
      
    </div>
  )
}

export default Student;
