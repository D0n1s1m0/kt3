import React from 'react';
import './TechnologyCard.css';

const TechnologyCard = ({ technology, onStatusChange, onNotesChange }) => {
  return (
    <div 
      className={`technology-card status-${technology.status}`}
      onClick={() => onStatusChange(technology.id)}
    >
      <div className="card-header">
        <h3>{technology.title}</h3>
        <span className={`status-badge ${technology.status}`}>
          {technology.status === 'not-started' && 'Не начато'}
          {technology.status === 'in-progress' && 'В процессе'}
          {technology.status === 'completed' && 'Завершено'}
        </span>
      </div>
      <p className="description">{technology.description}</p>
      
      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={technology.notes}
          onChange={(e) => onNotesChange(technology.id, e.target.value)}
          placeholder="Записывайте сюда важные моменты..."
          rows="3"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="notes-hint">
          {technology.notes.length > 0 
            ? `Заметка сохранена (${technology.notes.length} символов)` 
            : 'Добавьте заметку'
          }
        </div>
      </div>
    </div>
  );
};

export default TechnologyCard;