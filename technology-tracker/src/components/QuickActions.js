import React from 'react';
import './QuickActions.css';

const QuickActions = ({ 
  onMarkAllCompleted, 
  onResetAll, 
  onRandomNext,
  technologies 
}) => {
  // Проверяем, есть ли доступные технологии для рандомного выбора
  const hasAvailableTech = technologies.some(tech => 
    tech.status === 'not-started' || tech.status === 'in-progress'
  );

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="action-btn complete-all">
          ✅ Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="action-btn reset-all">
          🔄 Сбросить все статусы
        </button>
        <button 
          onClick={onRandomNext} 
          className="action-btn random-next"
          disabled={!hasAvailableTech}
          title={!hasAvailableTech ? "Все технологии уже завершены" : "Выбрать случайную технологию"}
        >
          🎲 Случайный выбор следующей технологии
          {!hasAvailableTech && <span className="tooltip">Все завершены</span>}
        </button>
      </div>
    </div>
  );
};

export default QuickActions;