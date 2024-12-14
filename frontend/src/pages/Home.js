import React from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="home-container">
      <Row>
        <Col sm={12} md={8} lg={6} className="mx-auto">
          <h1>Welcome to the Student Profile Platform!</h1>
          <p>
            This website allows students to create profiles showcasing their skills and experiences. Companies can then view these profiles to find potential candidates, and admins can manage and edit student profiles.
          </p>
          <div className="benefits">
            <h3>Benefits for Students</h3>
            <ul>
              <li>Create a professional online profile to showcase your skills and experiences.</li>
              <li>Increase your visibility to potential employers.</li>
              <li>Connect with companies seeking talented individuals.</li>
            </ul>
            <h3>Benefits for Companies</h3>
            <ul>
              <li>Access a pool of qualified student candidates.</li>
              <li>Find students with the skills and experience you need.</li>
              <li>Streamline the recruitment process.</li>
            </ul>
            <h3>How It Works</h3>
          <ul>
            <li>Students create profiles with their skills, experiences, and contact information.</li>
            <li>Companies view student profiles to find potential candidates.</li>
            <li>Admins manage and edit student profiles.</li>
          </ul>
          <h3>Get Started</h3>
          <p>
            Ready to get started? Click the button below to view student profiles.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/students")}>See Student Profiles</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
