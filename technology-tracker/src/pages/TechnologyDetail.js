import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NotesEditor from '../components/NotesEditor';

function TechnologyDetail({ technologies, onStatusChange, onNotesChange }) {
  const { techId } = useParams();
  const [quickNote, setQuickNote] = useState('');
  
  const technology = technologies.find(t => t.id === parseInt(techId));

  if (!technology) {
    return (
      <div className="technology-not-found">
        <h2>Технология не найдена</h2>
        <p>Запрашиваемая технология не существует или была удалена.</p>
      </div>
    );
  }

  const handleAddQuickNote = () => {
    if (quickNote.trim()) {
      const currentNotes = technology.notes || '';
      const newNotes = currentNotes ? `${currentNotes}\n• ${quickNote}` : `• ${quickNote}`;
      onNotesChange(technology.id, newNotes);
      setQuickNote('');
    }
  };

  const handleQuickNoteKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddQuickNote();
    }
  };

  const handleSaveNotes = (techId, newNotes) => {
    onNotesChange(techId, newNotes);
  };

  return (
    <div className="technology-detail">
      <div className="tech-header">
        <h1>{technology.title}</h1>
        <button 
          onClick={() => onStatusChange(technology.id)}
          className={`status-btn status-${technology.status}`}
        >
          {technology.status === 'not-started' && '🔴 Не начато'}
          {technology.status === 'in-progress' && '🟡 В процессе'}
          {technology.status === 'completed' && '✅ Изучено'}
        </button>
      </div>
      
      <div className="tech-info">
        <div className="info-card">
          <h3>📋 Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <strong>🏷️ Категория:</strong> 
            <span className={`category ${technology.category}`}>
              {technology.category}
            </span>
          </div>
          <div className="info-item">
            <strong>📊 Сложность:</strong> 
            <span className={`difficulty ${technology.difficulty}`}>
              {technology.difficulty}
            </span>
          </div>
          <div className="info-item">
            <strong>📅 Добавлено:</strong> 
            <span>{new Date(technology.createdAt).toLocaleDateString('ru-RU')}</span>
          </div>
        </div>
      </div>

      {/* Быстрое добавление заметки */}
      <div className="quick-note-section">
        <h3>📝 Быстрая заметка</h3>
        <div className="quick-note-input">
          <input
            type="text"
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            onKeyPress={handleQuickNoteKeyPress}
            placeholder="Добавить быструю заметку..."
            className="quick-note-field"
          />
          <button 
            onClick={handleAddQuickNote}
            disabled={!quickNote.trim()}
            className="add-note-btn"
          >
            ➕ Добавить
          </button>
        </div>
      </div>

      {/* Редактор заметок */}
      <div className="notes-section">
        <h3>📒 Заметки</h3>
        <NotesEditor
          techId={technology.id}
          currentNotes={technology.notes}
          onSaveNotes={handleSaveNotes}
        />
      </div>

      {/* Ресурсы */}
      {technology.resources && technology.resources.length > 0 && (
        <div className="resources-section">
          <h3>🔗 Ресурсы для изучения</h3>
          <div className="resources-list">
            {technology.resources.map((resource, index) => (
              <a 
                key={index}
                href={resource} 
                target="_blank" 
                rel="noopener noreferrer"
                className="resource-link"
              >
                🌐 {resource}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyDetail;