import React from 'react';
import './ProjectCard.css'; // Assuming there's a CSS file for styles

const ProjectCard = ({ title, description, imageUrl, link }) => {
  return (
    <div className="project-card">
      <img src={imageUrl} alt={title} className="project-image" />
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      <a href={link} className="project-link">View Project</a>
    </div>
  );
};

export default ProjectCard;