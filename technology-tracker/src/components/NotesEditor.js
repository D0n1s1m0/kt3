import React, { useState, useEffect, useRef } from 'react';

function NotesEditor({ techId, currentNotes, onSaveNotes }) {
  const [notes, setNotes] = useState(currentNotes || '');
  const textareaRef = useRef(null);

  // Синхронизируем состояние только при изменении techId или currentNotes
  useEffect(() => {
    setNotes(currentNotes || '');
  }, [techId, currentNotes]);

  const handleSave = () => {
    if (onSaveNotes) {
      onSaveNotes(techId, notes);
    }
  };

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="notes-editor">
      <textarea
        ref={textareaRef}
        value={notes}
        onChange={handleChange}
        placeholder="Введите ваши заметки здесь..."
        className="notes-textarea"
        rows={8}
      />
      <div className="notes-actions">
        <button onClick={handleSave} className="save-btn">
          💾 Сохранить заметки
        </button>
      </div>
      <div className="notes-info">
        <small>Символов: {notes.length}</small>
      </div>
    </div>
  );
}

export default NotesEditor;