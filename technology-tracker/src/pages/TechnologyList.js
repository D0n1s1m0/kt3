import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TechnologyList.css';

const TechnologyList = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <h1>💻 Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          ➕ Добавить технологию
        </Link>
      </div>

      <div className="technologies-grid">
        {technologies.map(tech => (
          <div key={tech.id} className="technology-item">
            <div className="technology-item-header">
              <h3>{tech.title}</h3>
              <span className={`status-badge ${tech.status}`}>
                {tech.status === 'not-started' && 'Не начато'}
                {tech.status === 'in-progress' && 'В процессе'}
                {tech.status === 'completed' && 'Завершено'}
              </span>
            </div>
            <p className="technology-description">{tech.description}</p>
            <div className="technology-meta">
              <span className="notes-indicator">
                {tech.notes ? `📝 ${tech.notes.length} симв.` : '📝 Нет заметок'}
              </span>
              <Link to={`/technology/${tech.id}`} className="btn-link">
                Подробнее →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <h3>Технологий пока нет</h3>
          <p>Добавьте первую технологию для отслеживания прогресса</p>
          <Link to="/add-technology" className="btn btn-primary">
            ➕ Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  );
};

export default TechnologyList;