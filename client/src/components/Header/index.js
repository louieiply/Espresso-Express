import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Nav.Item>
      {Auth.loggedIn() ? (
        <>
          <Nav.Item>
            <Nav.Link onClick={logout}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/signup" >
              Signup
            </Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
};

export default Header;
