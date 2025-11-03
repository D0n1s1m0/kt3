import React from 'react';
import './TechnologyFilter.css';

function TechnologyFilter({ activeFilter, onFilterChange, technologies }) {
  const getStatusCount = (status) => {
    return technologies.filter(tech => tech.status === status).length;
  };

  const filters = [
    { key: 'all', label: 'Все технологии', count: technologies.length },
    { key: 'not-started', label: 'Не начатые', count: getStatusCount('not-started') },
    { key: 'in-progress', label: 'В процессе', count: getStatusCount('in-progress') },
    { key: 'completed', label: 'Выполненные', count: getStatusCount('completed') }
  ];

  return (
    <div className="technology-filter">
      <h3 className="technology-filter__title">Фильтр по статусу</h3>
      <div className="technology-filter__buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`technology-filter__button ${
              activeFilter === filter.key ? 'technology-filter__button--active' : ''
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
            <span className="technology-filter__count">({filter.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TechnologyFilter;