import React from 'react';
import { Link } from 'react-router-dom';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import TechnologyFilter from '../components/TechnologyFilter';
import TechnologyCard from '../components/TechnologyCard';
import './Home.css';

const Home = ({ 
  technologies, 
  filter, 
  setFilter, 
  searchQuery, 
  setSearchQuery,
  onStatusChange,
  onNotesChange,
  onMarkAllCompleted,
  onResetAll,
  onRandomNext 
}) => {
  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = filter === 'all' || tech.status === filter;
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="home-page">
      <ProgressHeader technologies={technologies} />
      
      <div className="controls-section">
        <TechnologyFilter
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredCount={filteredTechnologies.length}
          totalCount={technologies.length}
        />
        <QuickActions
          onMarkAllCompleted={onMarkAllCompleted}
          onResetAll={onResetAll}
          onRandomNext={onRandomNext}
          technologies={technologies}
        />
      </div>

      <div className="technologies-container">
        {filteredTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            technology={tech}
            onStatusChange={onStatusChange}
            onNotesChange={onNotesChange}
          />
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <div className="empty-state">
          <h3>Технологии не найдены</h3>
          <p>Попробуйте изменить фильтры или добавить новые технологии</p>
          <Link to="/add-technology" className="btn btn-primary">
            ➕ Добавить технологию
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;