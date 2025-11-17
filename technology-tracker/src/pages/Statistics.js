import React, { useState, useEffect } from 'react';
import './Statistics.css';

const Statistics = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="statistics-page">
      <h1>📈 Статистика прогресса</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-number">{total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{completed}</div>
          <div className="stat-label">Завершено</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-number">{inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-number">{notStarted}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>

      <div className="progress-section">
        <h2>Общий прогресс: {completionPercentage}%</h2>
        <div className="progress-bar-large">
          <div 
            className="progress-fill-large"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="distribution-chart">
        <h2>Распределение по статусам</h2>
        <div className="chart-bars">
          <div className="chart-bar completed" style={{ height: `${(completed/total)*100}%` }}>
            <span>Завершено ({completed})</span>
          </div>
          <div className="chart-bar in-progress" style={{ height: `${(inProgress/total)*100}%` }}>
            <span>В процессе ({inProgress})</span>
          </div>
          <div className="chart-bar not-started" style={{ height: `${(notStarted/total)*100}%` }}>
            <span>Не начато ({notStarted})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;