import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function RoadmapImporter({ onImportComplete }) {
  const { technologies, updateTechnologies } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState(null);

  const handleImportRoadmap = async () => {
    try {
      setImporting(true);
      setError(null);

      // Имитация загрузки дорожной карты из API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Мок данные дорожной карты
      const roadmapData = {
        technologies: [
          {
            id: Date.now() + 1,
            title: 'Vue.js',
            description: 'Прогрессивный фреймворк для создания пользовательских интерфейсов',
            category: 'frontend',
            difficulty: 'beginner',
            status: 'not-started',
            resources: ['https://vuejs.org', 'https://ru.vuejs.org'],
            notes: '',
            createdAt: new Date().toISOString()
          },
          {
            id: Date.now() + 2,
            title: 'Express.js',
            description: 'Минималистичный веб-фреймворк для Node.js',
            category: 'backend',
            difficulty: 'intermediate',
            status: 'not-started',
            resources: ['https://expressjs.com', 'https://expressjs.com/ru/'],
            notes: '',
            createdAt: new Date().toISOString()
          },
          {
            id: Date.now() + 3,
            title: 'MongoDB',
            description: 'Документоориентированная система управления базами данных',
            category: 'database',
            difficulty: 'intermediate',
            status: 'not-started',
            resources: ['https://www.mongodb.com'],
            notes: '',
            createdAt: new Date().toISOString()
          }
        ]
      };

      // Объединяем существующие технологии с новыми
      const existingIds = new Set(technologies.map(tech => tech.title.toLowerCase()));
      const newTechnologies = roadmapData.technologies.filter(
        tech => !existingIds.has(tech.title.toLowerCase())
      );

      if (newTechnologies.length === 0) {
        alert('Все технологии из этой дорожной карты уже есть в вашем списке');
        return;
      }

      const updatedTech = [...technologies, ...newTechnologies];
      updateTechnologies(updatedTech);

      alert(`Успешно импортировано ${newTechnologies.length} технологий`);
      
      // Вызываем колбэк для обновления родительского компонента
      if (onImportComplete) {
        onImportComplete();
      }

    } catch (err) {
      setError(err.message);
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>

      <div className="import-actions">
        <button
          onClick={handleImportRoadmap}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="import-info">
        <p>Добавит: Vue.js, Express.js, MongoDB</p>
      </div>
    </div>
  );
}

export default RoadmapImporter;