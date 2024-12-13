import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import LoginFormModal from './LoginFormModal';
import RegisterFormModal from './RegisterFormModal';

const NavigationBar = ({ isLoggedIn, handleLogout, setIsLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">My Projects</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button variant="outline-light" onClick={handleShowLogin}>Login</Button>
                <Button variant="outline-light" onClick={handleShowRegister}>Register</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginFormModal show={showLogin} handleClose={handleCloseLogin} setIsLoggedIn={setIsLoggedIn} />
      <RegisterFormModal show={showRegister} handleClose={handleCloseRegister} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};

export default NavigationBar;

