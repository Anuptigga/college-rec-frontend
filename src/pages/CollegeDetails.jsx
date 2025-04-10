import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getCollege } from '../services/api';

const Container = styled.div`
  height: 100vh;
  background-color: #f0f0f0;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const College = styled.h1`
  font-size: 2rem;
  margin: 10px 0;
  color: #333;
`;

const CollegeAddress = styled.p`
  font-size: 1rem;
  color: #666;
`;

const CollegeDescription = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-top: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CoursesList = styled.ul`
  padding: 0;
  margin: 0;
`;

const CourseItem = styled.li`
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  background-color: #f9f9f9;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  font-size: 1rem;
  color: #333;
  padding: 10px;
  text-align: left;
`;

const TableData = styled.td`
  font-size: 1rem;
  color: #666;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getCollege(id);
      setCollege(res.data);
    };
    load();
  }, [id]);

  if (!college) return <p>Loading...</p>;

  return (
    <Container>
      <Wrapper>
        {college.image && (
          <ImageContainer style={{ backgroundImage: `url(${college.image})` }} />
        )}
        <College>{college.name}</College>
        <CollegeAddress>{college.address}</CollegeAddress>
        <CollegeDescription>{college.description}</CollegeDescription>
      </Wrapper>

      <Details>
        <Title>Courses</Title>
        <CoursesList>
          {college.courses.map((course, i) => (
            <CourseItem key={i}>{course.courseName}</CourseItem>
          ))}
        </CoursesList>

        <Title>Seat Matrix</Title>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Course</TableHeader>
              <TableHeader>Seats</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {college.courses.map((course, i) => (
              <TableRow key={i}>
                <TableData>{course.courseName}</TableData>
                <TableData>{course.seat}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Title>Cut-Offs</Title>
        <CoursesList>
          {college.courses.map((course, i) => (
            <CourseItem key={i}>
              {course.courseName}: {course.cutoff} percentile
            </CourseItem>
          ))}
        </CoursesList>

        <Title>Fee Structure</Title>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Fee Type</TableHeader>
              <TableHeader>Amount</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <TableData>Tuition Fee</TableData>
              <TableData>₹1,25,000 per semester</TableData>
            </TableRow>
            <TableRow>
              <TableData>Hostel Fee</TableData>
              <TableData>₹20,000 per semester</TableData>
            </TableRow>
            <TableRow>
              <TableData>Mess Fee</TableData>
              <TableData>₹15,000 per semester</TableData>
            </TableRow>
          </tbody>
        </Table>

        <Title>Placements</Title>
        <CoursesList>
          <CourseItem>Highest Package: ₹40 LPA</CourseItem>
          <CourseItem>Average Package: ₹12 LPA</CourseItem>
          <CourseItem>Top Recruiters: Google, Microsoft, Amazon, TCS</CourseItem>
        </CoursesList>
      </Details>
    </Container>
  );
};

export default CollegeDetails;
