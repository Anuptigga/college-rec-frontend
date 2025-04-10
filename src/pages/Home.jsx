import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InfoCard from '../components/InfoCard';
import { Search } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { getAllColleges } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSection = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://wallpaperaccess.com/full/400229.jpg') no-repeat center center/cover;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  border-radius: 5px;
  overflow: visible;
`;


const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  width: 20%;
  background-color: #007BFF;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const SuggestionBox = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  list-style: none;
  margin-top: 5px;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const Section = styled.div`
  width: 100%;
  background-color: #f6f9fc;
  display: flex;
  margin: 20px 0;
  padding: 20px;
  flex-direction: column;
  align-items: center;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Title1 = styled.h1`
  font-family: fontregular, 'Droid Sans', sans-serif;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #333;
  margin-bottom: 30px;
`;

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allColleges, setAllColleges] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getAllColleges();
      setAllColleges(res.data);
    };
    load();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }
    const filtered = allColleges.filter(college =>
      `${college.name} ${college.address}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm, allColleges]);

  const handleSearch = () => {
    navigate(`/colleges?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleSelect = (id) => {
    navigate(`/colleges/${id}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>College Parth</Title>
          <Subtitle>Find the best college for you</Subtitle>
          <SearchContainer>
            <Input
              placeholder='Search for a college...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}><Search /></Button>
            {suggestions.length > 0 && (
              <SuggestionBox>
                {suggestions.map(college => (
                  <SuggestionItem key={college._id} onClick={() => handleSelect(college._id)}>
                    {college.name}
                  </SuggestionItem>
                ))}
              </SuggestionBox>
            )}
          </SearchContainer>
        </HeroContent>
      </HeroSection>

      <Section>
        <Title1>Updates</Title1>
        <CardsContainer>
          <InfoCard />
          <InfoCard />
          <InfoCard />
        </CardsContainer>
      </Section>

      <Section>
        <Title1>Top Colleges</Title1>
        <CardsContainer>
          <InfoCard />
          <InfoCard />
          <InfoCard />
        </CardsContainer>
      </Section>
    </Container>
  );
}

export default Home;
