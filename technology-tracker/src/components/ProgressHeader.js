import React from 'react';
import './ProgressHeader.css';

const ProgressHeader = ({ technologies }) => {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h1>Трекер изучения технологий</h1>
      
      <div className="progress-stats">
        <div className="stat">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Всего</span>
        </div>
        <div className="stat">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Завершено</span>
        </div>
        <div className="stat">
          <span className="stat-number">{inProgress}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat">
          <span className="stat-number">{notStarted}</span>
          <span className="stat-label">Не начато</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="progress-text">{completionPercentage}% выполнено</span>
      </div>
    </div>
  );
};

export default ProgressHeader;