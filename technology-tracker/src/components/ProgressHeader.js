import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  const getProgressLevel = () => {
    if (progressPercentage === 0) return 'low';
    if (progressPercentage < 50) return 'medium';
    if (progressPercentage < 100) return 'high';
    return 'complete';
  };

  return (
    <div className="progress-header">
      <h1 className="progress-header__title">Трекер изучения технологий</h1>
      
      <div className="progress-header__stats">
        <div className="progress-stat">
          <span className="progress-stat__value">{totalTechnologies}</span>
          <span className="progress-stat__label">Всего</span>
        </div>
        
        <div className="progress-stat progress-stat--completed">
          <span className="progress-stat__value">{completedTechnologies}</span>
          <span className="progress-stat__label">Изучено</span>
        </div>
        
        <div className="progress-stat progress-stat--in-progress">
          <span className="progress-stat__value">{inProgressTechnologies}</span>
          <span className="progress-stat__label">В процессе</span>
        </div>
        
        <div className="progress-stat progress-stat--not-started">
          <span className="progress-stat__value">{notStartedTechnologies}</span>
          <span className="progress-stat__label">Не начато</span>
        </div>
        
        <div className="progress-stat progress-stat--percentage">
          <span className="progress-stat__value">{progressPercentage}%</span>
          <span className="progress-stat__label">Прогресс</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className={`progress-bar__fill progress-bar__fill--${getProgressLevel()}`}
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="progress-bar__text">{progressPercentage}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;