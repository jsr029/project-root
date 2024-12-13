import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../api/api';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      const { data } = await getProjectById(id);
      setProject(data);
    }
    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Img variant="top" src={`http://localhost:5000${project.imageUrl}`} alt={project.title} />
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.description}</Card.Text>
              <a href={project.appUrl} target="_blank" rel="noopener noreferrer">
                {project.appUrl}
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetailsPage;
