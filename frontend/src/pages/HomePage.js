import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ProjectFormModal from '../components/ProjectFormModal';
import { getProjects, createProject, updateProject, deleteProject } from '../api/api';

const HomePage = ({ isAdmin, role }) => {
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setSelectedProject(null);
    setShow(false);
  };

  const handleSubmit = async (project) => {
    if (selectedProject) {
      await updateProject(selectedProject._id, project);
    } else {
      await createProject(project);
    }
    const { data } = await getProjects();
    setProjects(data);
    handleClose();
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    handleShow();
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    const { data } = await getProjects();
    setProjects(data);
  };

  return (
    <Container>
        {isAdmin && (
          <Col sm={4} className="m-3">
            <Button variant="success" onClick={handleShow}>Create Project</Button>
          </Col>
        )}
      <Row className="my-4">
        {projects.map((project) => (
          <Col key={project._id} sm={4} className="mb-4">
            <ProjectCard project={project} isAdmin={isAdmin} handleEdit={handleEdit} handleDelete={handleDelete} />
          </Col>
        ))}
      </Row>
      <ProjectFormModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        project={selectedProject}
        role={role}
      />
    </Container>
  );
};

export default HomePage;

