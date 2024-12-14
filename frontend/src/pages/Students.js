import React, { useState } from 'react'
import { useEffect } from 'react'
import "../styles/Students.css";
import SingleCollegeStudents from './SingleCollegeStudents'
import AllCollegeStudents from './AllCollegeStudents'
import { useNavigate } from 'react-router-dom';

function Students() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setUserType(localStorage.getItem('userType'));
  }, []);
  return (
    <div>
    {userType === null && (
      <div>
        <h2>Login to view profiles</h2>
        <button style={{width:'10%'}} onClick={() => navigate('/login')}>Login</button>
      </div>
  )}  
    {userType === 'student' && (
      <SingleCollegeStudents />
  )}
  {userType === 'admin' && (
    <SingleCollegeStudents />
  )}
  {userType === 'company' && (
    <AllCollegeStudents />
  )}
  </div>
  )
}

export default Students
