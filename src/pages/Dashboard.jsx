import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  getAllColleges,
  createCollege,
  updateCollege,
  deleteCollege
} from '../services/api';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1e1e2f;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const SidebarTitle = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;

const SidebarOption = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 10px 0;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #33334d;
    padding-left: 10px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
`;

const Form = styled.form`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  max-width: 700px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CourseContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f1f1f1;
`;

const AddCourseButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CollegeCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  margin-right: 10px;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    image: '',
    courses: []
  });
  const [editingId, setEditingId] = useState(null);

  const loadColleges = async () => {
    const res = await getAllColleges();
    setColleges(res.data);
  };

  useEffect(() => {
    loadColleges();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateCourseField = (index, field, value) => {
    setFormData((prev) => {
      const updatedCourses = [...prev.courses];
      updatedCourses[index][field] = value;
      return { ...prev, courses: updatedCourses };
    });
  };

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [...prev.courses, { courseName: '', cutoff: '', seat: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedCourses = formData.courses.map(course => ({
      ...course,
      cutoff: parseInt(course.cutoff) || 0,
      seat: parseInt(course.seat) || 0
    }));

    const formattedData = {
      ...formData,
      courses: formattedCourses
    };

    if (editingId) {
      await updateCollege(editingId, formattedData);
      setEditingId(null);
    } else {
      await createCollege(formattedData);
    }

    setFormData({
      name: '',
      address: '',
      description: '',
      image: '',
      courses: []
    });
    loadColleges();
  };

  const handleEdit = (college) => {
    setEditingId(college._id);
    setSelectedOption('addCollege');
    setFormData({
      name: college.name,
      address: college.address,
      description: college.description,
      image: college.image,
      courses: college.courses.map(c => ({
        courseName: c.courseName,
        cutoff: c.cutoff,
        seat: c.seat
      }))
    });
  };

  const handleDelete = async (id) => {
    await deleteCollege(id);
    loadColleges();
  };

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>Admin Panel</SidebarTitle>
        <SidebarOption onClick={() => setSelectedOption('dashboard')}>Dashboard</SidebarOption>
        <SidebarOption onClick={() => setSelectedOption('addCollege')}>Add College</SidebarOption>
        <SidebarOption onClick={() => setSelectedOption('editCollege')}>Edit Colleges</SidebarOption>
        {/* <SidebarOption onClick={() => setSelectedOption('viewColleges')}>View Colleges</SidebarOption> */}
      </Sidebar>
      <MainContent>
        {selectedOption === 'dashboard' && <h1>Welcome to the Admin Dashboard</h1>}

        {selectedOption === 'addCollege' && (
          <Form onSubmit={handleSubmit}>
            <h2>{editingId ? 'Edit College' : 'Add New College'}</h2>

            <Label>College Name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <Label>Location</Label>
            <Input type="text" name="address" value={formData.address} onChange={handleChange} required />

            <Label>Description</Label>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} required />

            <Label>Image URL</Label>
            <Input type="text" name="image" value={formData.image} onChange={handleChange} />

            <h3>Courses</h3>
            {formData.courses.map((course, index) => (
              <CourseContainer key={index}>
                <Label>Course Name</Label>
                <Input
                  type="text"
                  placeholder="e.g., Computer Science"
                  value={course.courseName}
                  onChange={(e) => updateCourseField(index, 'courseName', e.target.value)}
                  required
                />
                <Label>Cutoff</Label>
                <Input
                  type="number"
                  placeholder="Cutoff"
                  value={course.cutoff}
                  onChange={(e) => updateCourseField(index, 'cutoff', e.target.value)}
                  required
                />
                <Label>Seats</Label>
                <Input
                  type="number"
                  placeholder="Seats"
                  value={course.seat}
                  onChange={(e) => updateCourseField(index, 'seat', e.target.value)}
                  required
                />
              </CourseContainer>
            ))}
            <AddCourseButton type="button" onClick={addCourse}>Add Course</AddCourseButton>
            <SubmitButton type="submit">{editingId ? 'Update College' : 'Add College'}</SubmitButton>
          </Form>
        )}

        {selectedOption === 'editCollege' && (
          <>
            <h2>Edit Colleges</h2>
            {colleges.map(college => (
              <CollegeCard key={college._id}>
                <h3>{college.name}</h3>
                <p>{college.address}</p>
                <p>{college.description}</p>
                <ActionButton onClick={() => handleEdit(college)}>Edit</ActionButton>
                <ActionButton onClick={() => handleDelete(college._id)}>Delete</ActionButton>
              </CollegeCard>
            ))}
          </>
        )}

        {selectedOption === 'viewColleges' && (
          <>
            <h2>All Colleges</h2>
            {colleges.map(college => (
              <CollegeCard key={college._id}>
                <h3>{college.name}</h3>
                <p>{college.address}</p>
                <p>{college.description}</p>
              </CollegeCard>
            ))}
          </>
        )}
      </MainContent>
    </Container>
  );
};

export default Dashboard;
