import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('user');
  };

  return (
    <Router>
      <NavigationBar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<HomePage isAdmin={role === 'superAdmin' || role === 'admin'} />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
