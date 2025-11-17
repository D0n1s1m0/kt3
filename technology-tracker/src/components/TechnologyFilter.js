import React from 'react';
import './TechnologyFilter.css';

const TechnologyFilter = ({ 
  filter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  filteredCount,
  totalCount 
}) => {
  return (
    <div className="technology-filter">
      <h3>Фильтр и поиск</h3>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="search-results">
          <span>Найдено: </span>
          <span className="results-count">
            {filteredCount} из {totalCount}
          </span>
        </div>
      </div>
      
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => onFilterChange('all')}
        >
          Все
        </button>
        <button 
          className={filter === 'not-started' ? 'active' : ''}
          onClick={() => onFilterChange('not-started')}
        >
          Не начатые
        </button>
        <button 
          className={filter === 'in-progress' ? 'active' : ''}
          onClick={() => onFilterChange('in-progress')}
        >
          В процессе
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => onFilterChange('completed')}
        >
          Завершённые
        </button>
      </div>
    </div>
  );
};

export default TechnologyFilter;