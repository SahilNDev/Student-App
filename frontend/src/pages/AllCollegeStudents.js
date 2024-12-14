import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllCollegeStudents() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/signup/colleges`);
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSelectCollege = async (collegeId) => {
    try {
      const response = await axios.get(`http://localhost:5000/students/colleges/${collegeId}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="container">
      <h2>All College Profiles</h2>
      <div className="form-group">
        <label>Select College:</label>
        <select
          className="form-control"
          value={selectedCollege}
          onChange={(e) => {
            setSelectedCollege(e.target.value);
            handleSelectCollege(e.target.value);
          }}
        >
          <option value="">Select College</option>
          {colleges.map(college => (
            <option key={college._id} value={college._id}>
              {college.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCollege !== '' && students.length === 0 && <div>No students found</div>}
      {(selectedCollege === '' || selectedCollege === 'Select College') && <div>Select a college to view students</div>}
      {selectedCollege !== '' && students.length > 0 && (
        <div>
          <div>Click on a student to view their profile</div>
          <h2>Students in {selectedCollege}</h2>
          <div className="row">
            {students.map(student => (
              <div key={student._id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="card-container" onClick={() =>  navigate(`/student/${student._id}`)}>
                  <div className="card">
                    <div className="front">
                      <img src={`http://localhost:5000/${student.image.replace(/\\/g, '/')}`} alt="student" className="card-img-top" />
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
      )}
    </div>
  );
}

export default AllCollegeStudents;
