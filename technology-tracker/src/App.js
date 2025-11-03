import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import TechnologyFilter from './components/TechnologyFilter';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и лучших практик', 
      status: 'completed',
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript в разметке', 
      status: 'completed',
    },
    { 
      id: 3, 
      title: 'Props and State', 
      description: 'Работа со свойствами и состоянием компонентов, управление данными', 
      status: 'in-progress',
    },
    { 
      id: 4, 
      title: 'Event Handling', 
      description: 'Обработка событий в React компонентах', 
      status: 'in-progress',
    },
    { 
      id: 5, 
      title: 'Hooks', 
      description: 'Изучение хуков: useState, useEffect, useContext и создание собственных хуков', 
      status: 'not-started',
    },
    { 
      id: 6, 
      title: 'Routing', 
      description: 'Настройка маршрутизации с React Router', 
      status: 'not-started',
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  // Функция изменения статуса технологии
  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          const statusOrder = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...tech, status: statusOrder[nextIndex] };
        }
        return tech;
      })
    );
  };

  // Функции для быстрых действий
  const markAllAsCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const randomizeNextTechnology = () => {
    const notStartedTech = technologies.filter(tech => tech.status === 'not-started');
    if (notStartedTech.length > 0) {
      const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
      updateTechnologyStatus(randomTech.id);
      alert(`Следующая технология для изучения: ${randomTech.title}`);
    } else {
      alert('Все технологии уже начаты или завершены!');
    }
  };

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started':
        return tech.status === 'not-started';
      case 'in-progress':
        return tech.status === 'in-progress';
      case 'completed':
        return tech.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="app">
      <div className="app__container">
        <ProgressHeader technologies={technologies} />
        
        <QuickActions 
          onMarkAllCompleted={markAllAsCompleted}
          onResetAll={resetAllStatuses}
          onRandomNext={randomizeNextTechnology}
        />

        <TechnologyFilter 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          technologies={technologies}
        />
        
        <div className="technologies-grid">
          {filteredTechnologies.map(technology => (
            <TechnologyCard
              key={technology.id}
              technology={technology}
              onStatusChange={updateTechnologyStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;;
