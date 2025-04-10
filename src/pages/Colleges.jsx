// src/pages/Colleges.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllColleges } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f0f0f0;
  overflow-y: auto;
  padding: 40px;
`;

const CollegeList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CollegeItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const CollegeName = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin: 10px 0;
  &:hover {
    color: #007bff;
  }
`;

const CollegeInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CollegeImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
`;

const CollegeDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const CollegeAddress = styled.p`
  font-size: 0.95rem;
  color: #666;
`;

const CollegeDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-top: 10px;
`;

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadColleges = async () => {
      const res = await getAllColleges();
      const query = new URLSearchParams(location.search).get('search') || '';
      const filtered = res.data.filter(college =>
        `${college.name} ${college.address}`.toLowerCase().includes(query.toLowerCase())
      );
      setColleges(filtered);
    };
    loadColleges();
  }, [location.search]);

  return (
    <Container>
      <CollegeList>
        {colleges.length === 0 ? (
          <p>No colleges found matching your search.</p>
        ) : (
          colleges.map((college) => (
            <CollegeItem
              key={college._id}
              onClick={() => navigate(`/colleges/${college._id}`)}
            >
              <CollegeName>{college.name}</CollegeName>
              <CollegeInfo>
                <CollegeImage
                  src={college.image || 'https://via.placeholder.com/100'}
                  alt={`${college.name} image`}
                />
                <CollegeDetails>
                  <CollegeAddress>{college.address}</CollegeAddress>
                  <CollegeDescription>{college.description}</CollegeDescription>
                </CollegeDetails>
              </CollegeInfo>
            </CollegeItem>
          ))
        )}
      </CollegeList>
    </Container>
  );
};

export default Colleges;
