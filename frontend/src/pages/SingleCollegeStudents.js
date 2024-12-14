import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SingleCollegeStudents() {
  const [students, setStudents] = useState([]);
  const [college, setCollege] = useState('');
  const id = localStorage.getItem('id');
  const userType = localStorage.getItem('userType');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch college based on the id
        const collegeResponse = await axios.get(`http://localhost:5000/students/college/${userType}/${id}`);
        const response = await axios.get(`http://localhost:5000/students/colleges/${collegeResponse.data}`);
        setCollege(collegeResponse.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, userType]);

  return (
    <div className="container">
      <h2>Students in {college}</h2>
      <div className="row">
        {students.map(student => (
          <div key={student._id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card-container" onClick={() => navigate(`/student/${student._id}`)}>
              <div className="card">
                <div className="front">
                <div className="card-body">
                  <img src={`http://localhost:5000/${student.image.replace(/\\/g, '/')}`} alt="student" className="card-img-top" />
                </div>
                </div>
                <div className="back">
                  <div className="card-body">
                    <h5 className="card-title">{student.name}</h5>
                    <p className="card-text">{student.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleCollegeStudents;
