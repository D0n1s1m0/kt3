import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import ContentForm from './components/ContactForm';
import WindowSizeTracker from './components/WindowSizeTracker';
import RoadmapImporter from './components/RoadmapImporter';
import TechnologySearch from './components/TechnologySearch';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Используем кастомный хук для работы с API
  const { 
    technologies, 
    loading, 
    error, 
    refetch, 
    addTechnology: apiAddTechnology,
    updateTechnologies: apiUpdateTechnologies
  } = useTechnologiesApi();

  // Принудительное обновление при изменении technologies
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [technologies]);

  // Функции для управления технологиями
  const updateTechnologyStatus = (techId) => {
    const updatedTech = technologies.map(tech => {
      if (tech.id === techId) {
        const statuses = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statuses.indexOf(tech.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        return { ...tech, status: statuses[nextIndex] };
      }
      return tech;
    });
    
    apiUpdateTechnologies(updatedTech);
  };

const updateTechnologyNotes = (techId, newNotes) => {
  console.log('Updating notes for tech:', techId, 'Notes:', newNotes);
  
  const updatedTech = technologies.map(tech =>
    tech.id === techId ? { ...tech, notes: newNotes } : tech
  );
  
  apiUpdateTechnologies(updatedTech);
};

  const markAllAsCompleted = () => {
    const updatedTech = technologies.map(tech => ({ 
      ...tech, 
      status: 'completed' 
    }));
    apiUpdateTechnologies(updatedTech);
  };

  const resetAllStatuses = () => {
    const updatedTech = technologies.map(tech => ({ 
      ...tech, 
      status: 'not-started' 
    }));
    apiUpdateTechnologies(updatedTech);
  };

  const randomNextTechnology = () => {
    const availableTech = technologies.filter(tech => 
      tech.status === 'not-started' || tech.status === 'in-progress'
    );
    
    if (availableTech.length > 0) {
      const randomTech = availableTech[Math.floor(Math.random() * availableTech.length)];
      updateTechnologyStatus(randomTech.id);
    }
  };

  // Функция для добавления технологии через API
  const addTechnology = async (techData) => {
    try {
      await apiAddTechnology(techData);
    } catch (err) {
      console.error('Ошибка при добавлении технологии:', err);
      throw err;
    }
  };

  // Функция для принудительного обновления данных
  const handleRefresh = () => {
    refetch();
    setSearchResults(null);
  };

  // Определяем какие технологии показывать (поиск или все)
  const displayedTechnologies = searchResults || technologies;

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Загрузка технологий...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App" key={forceUpdate}>
        <Navigation />
        <WindowSizeTracker />
        
        <main className="main-content">
          {/* Компоненты для работы с API */}
          <div className="api-components">
            <RoadmapImporter onImportComplete={handleRefresh} />
            <TechnologySearch 
              technologies={technologies}
              onSearch={setSearchResults} 
            />
          </div>

          {error && (
            <div className="app-error">
              <p>{error}</p>
              <button onClick={handleRefresh}>Попробовать снова</button>
            </div>
          )}

          <Routes>
            <Route path="/" element={
              <Home 
                technologies={displayedTechnologies}
                filter={filter}
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onStatusChange={updateTechnologyStatus}
                onNotesChange={updateTechnologyNotes}
                onMarkAllCompleted={markAllAsCompleted}
                onResetAll={resetAllStatuses}
                onRandomNext={randomNextTechnology}
                onRefresh={handleRefresh}
              />
            } />
            <Route path="/technologies" element={
              <TechnologyList 
                technologies={displayedTechnologies}
                onRefresh={handleRefresh}
                onStatusChange={updateTechnologyStatus}
              />
            } />
            <Route path="/technology/:techId" element={
              <TechnologyDetail 
                technologies={technologies}
                onStatusChange={updateTechnologyStatus}
                onNotesChange={updateTechnologyNotes}
              />
            } />
            <Route path="/add-technology" element={
              <AddTechnology 
                onAddTechnology={addTechnology}
              />
            } />
            <Route path="/statistics" element={
              <Statistics 
                technologies={technologies}
              />
            } />
            <Route path="/settings" element={
              <Settings 
                onRefreshData={handleRefresh}
                onMarkAllCompleted={markAllAsCompleted}
                onResetAll={resetAllStatuses}
              />
            } />
          </Routes>
        </main>

        <ContentForm />
      </div>
    </Router>
  );
}


export default App;