import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserFormModal = ({ show, handleClose, handleSubmit }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login / Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={onChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={() => handleSubmit(form)}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserFormModal;
