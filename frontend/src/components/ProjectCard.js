import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, isAdmin, handleEdit, handleDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project._id}`);
  };

  return (
    <Card style={{ width: '25rem', cursor: 'pointer' }} onClick={handleClick}>
      <Card.Img variant="top" src={`http://localhost:5000${project.imageUrl}`} alt={project.title} height={200} />
      <Card.Body>
        <Card.Title style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{project.title}</Card.Title>
        <Card.Text style={{height:"100px"}}>{project.description}</Card.Text>
        <Card.Text>
            <a href={project.appUrl} target="_blank" rel="noopener noreferrer">
          {project.appUrl}
            </a>
        </Card.Text> 
        {isAdmin && (
          <>
            <Button variant="warning" onClick={(e) => { e.stopPropagation(); handleEdit(project); }}>Edit</Button>
            <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(project._id); }}>Delete</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
