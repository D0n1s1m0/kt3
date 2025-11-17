import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes } = technology;

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'not-started':
        return '⏳';
      default:
        return '📝';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return 'Не определено';
    }
  };

  const handleStatusClick = () => {
    onStatusChange(id);
  };

  const handleNotesChange = (e) => {
    onNotesChange(id, e.target.value);
  };

  return (
    <div className={`technology-card technology-card--${status}`}>
      <div className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <span 
          className="technology-card__status-icon"
          onClick={handleStatusClick}
          title="Кликните для изменения статуса"
        >
          {getStatusIcon()}
        </span>
      </div>
      <p className="technology-card__description">{description}</p>
      
      {/* Секция заметок */}
      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Записывайте сюда важные моменты..."
          rows="3"
          className="notes-textarea"
        />
        <div className="notes-hint">
          {notes.length > 0 
            ? `Заметка сохранена (${notes.length} символов)` 
            : 'Добавьте заметку'
          }
        </div>
      </div>

      <div className="technology-card__footer">
        <span 
          className={`technology-card__status technology-card__status--${status}`}
          onClick={handleStatusClick}
        >
          {getStatusText()} (кликните для изменения)
        </span>
      </div>
    </div>
  );
}

export default TechnologyCard;