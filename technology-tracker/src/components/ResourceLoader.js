import { useState } from 'react';

function ResourceLoader({ technologyId, onResourcesLoaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAdditionalResources = async () => {
    try {
      setLoading(true);
      setError(null);

      // Имитация загрузки дополнительных ресурсов из API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Мок дополнительные ресурсы
      const additionalResources = [
        'https://github.com/topics/' + technologyId,
        'https://stackoverflow.com/questions/tagged/' + technologyId,
        'https://www.npmjs.com/package/' + technologyId
      ];

      onResourcesLoaded(additionalResources);

    } catch (err) {
      setError('Не удалось загрузить дополнительные ресурсы');
      console.error('Ошибка загрузки ресурсов:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resource-loader">
      <button 
        onClick={loadAdditionalResources} 
        disabled={loading}
        className="load-resources-btn"
      >
        {loading ? 'Загрузка...' : 'Загрузить дополнительные ресурсы'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ResourceLoader;