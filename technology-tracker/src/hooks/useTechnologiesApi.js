import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка технологий
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);

      const saved = localStorage.getItem('techTrackerData');
      if (saved) {
        const localData = JSON.parse(saved);
        setTechnologies(localData);
      } else {
        // Мок данные по умолчанию
        const mockTechnologies = [
          {
            id: 1,
            title: 'React',
            description: 'Библиотека для создания пользовательских интерфейсов',
            category: 'frontend',
            difficulty: 'beginner',
            status: 'not-started',
            resources: ['https://react.dev', 'https://ru.reactjs.org'],
            notes: '',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Node.js',
            description: 'Среда выполнения JavaScript на сервере',
            category: 'backend',
            difficulty: 'intermediate',
            status: 'not-started',
            resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'],
            notes: '',
            createdAt: new Date().toISOString()
          }
        ];
        setTechnologies(mockTechnologies);
        localStorage.setItem('techTrackerData', JSON.stringify(mockTechnologies));
      }
    } catch (err) {
      setError('Не удалось загрузить технологии');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

const updateTechnologies = (updatedTechnologies) => {
  try {
    setTechnologies(updatedTechnologies);
    localStorage.setItem('techTrackerData', JSON.stringify(updatedTechnologies));
  } catch (err) {
    console.error('Ошибка при обновлении технологий:', err);
    throw new Error('Не удалось обновить технологии');
  }
};

  // Добавление новой технологии
  const addTechnology = async (techData) => {
    const newTech = {
      id: Date.now(),
      status: 'not-started',
      notes: '',
      ...techData,
      createdAt: new Date().toISOString()
    };

    const updatedTech = [...technologies, newTech];
    updateTechnologies(updatedTech);
    return newTech;
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    updateTechnologies
  };
}

export default useTechnologiesApi;