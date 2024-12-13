import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { login, register } from '../api/api';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await register({ email, password });
      handleLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
            <Button variant="secondary" onClick={handleRegister}>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
