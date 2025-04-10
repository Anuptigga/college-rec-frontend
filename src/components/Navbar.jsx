// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

const NavLinks = styled.div`
  & > a {
    color: white;
    margin-left: 20px;
    text-decoration: none;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Nav>
      <div><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>College Parth</Link></div>
      <NavLinks>
        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
