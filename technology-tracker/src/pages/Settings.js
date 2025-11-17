import React from 'react';

function Settings({ onRefreshData, onMarkAllCompleted, onResetAll }) {
  const handleMarkAllCompleted = () => {
    if (window.confirm('Вы уверены, что хотите отметить все технологии как изученные?')) {
      onMarkAllCompleted();
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Вы уверены, что хотите сбросить статусы всех технологий?')) {
      onResetAll();
    }
  };

  return (
    <div className="settings-page">
      <h1>Настройки</h1>
      
      <div className="settings-section">
        <h2>Управление данными</h2>
        
        <div className="settings-actions">
          <button onClick={onRefreshData} className="settings-btn">
            🔄 Обновить данные
          </button>
          
          <button onClick={handleMarkAllCompleted} className="settings-btn warning">
            ✅ Отметить все как изучено
          </button>
          
          <button onClick={handleResetAll} className="settings-btn danger">
            🔄 Сбросить все статусы
          </button>
        </div>
      </div>

      {/* Другие настройки... */}
    </div>
  );
}

export default Settings;