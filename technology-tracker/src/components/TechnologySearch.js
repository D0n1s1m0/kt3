import { useState, useEffect, useRef } from 'react';

function TechnologySearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const handleSearch = async (query) => {
    // Отменяем предыдущий запрос, если он существует
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Создаем новый AbortController для текущего запроса
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      if (!query.trim()) {
        onSearch([]);
        setLoading(false);
        return;
      }

      // Имитация API запроса с поиском
      await new Promise(resolve => setTimeout(resolve, 500));

      // Мок результаты поиска
      const mockResults = [
        {
          id: 4,
          title: 'JavaScript',
          description: 'Язык программирования для веб-разработки',
          category: 'language',
          difficulty: 'beginner',
          resources: ['https://developer.mozilla.org/ru/docs/Web/JavaScript']
        },
        {
          id: 5,
          title: 'Python',
          description: 'Высокоуровневый язык программирования',
          category: 'language',
          difficulty: 'beginner',
          resources: ['https://www.python.org', 'https://python.org/doc/']
        }
      ].filter(tech => 
        tech.title.toLowerCase().includes(query.toLowerCase()) ||
        tech.description.toLowerCase().includes(query.toLowerCase())
      );

      onSearch(mockResults);

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка при поиске технологий:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Очищаем предыдущий таймер
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Устанавливаем новый таймер для debounce (500ms)
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 500);
  };

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="technology-search">
      <h3>Поиск технологий</h3>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Введите название технологии..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {loading && <span className="search-loading">⏳</span>}
      </div>
    </div>
  );
}

export default TechnologySearch;