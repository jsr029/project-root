import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProjectFormModal = ({ show, handleClose, handleSubmit, project, role }) => {
  const [form, setForm] = useState(project || {});
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    if (e.target.name === 'image') {
      setFile(e.target.files[0]);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (file) {
      formData.append('image', file);
    }
    handleSubmit(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{project ? "Edit Project" : "Create Project"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={form.title || ''} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" value={form.description || ''} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>App URL</Form.Label>
            <Form.Control type="text" name="appUrl" value={form.appUrl || ''} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Technologies</Form.Label>
            <Form.Control type="text" name="tecno" value={form.tecno || ''} onChange={onChange} />
          </Form.Group>
          {role === 'admin' && (
            <Form.Group>
              <Form.Label>Admin-Only Field</Form.Label>
              <Form.Control type="text" name="adminOnlyField" value={form.adminOnlyField || ''} onChange={onChange} />
            </Form.Group>
          )}
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit">{project ? "Save Changes" : "Create Project"}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectFormModal;
