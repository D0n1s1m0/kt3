import React, { useState, useEffect } from 'react';
import './WindowSizeTracker.css';

const WindowSizeTracker = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getScreenType = () => {
    if (windowSize.width < 768) return { type: 'мобильный', class: 'mobile' };
    if (windowSize.width < 1024) return { type: 'планшет', class: 'tablet' };
    return { type: 'десктоп', class: 'desktop' };
  };

  const screenInfo = getScreenType();

  return (
    <div className="window-tracker">
      <h2>Отслеживание размера окна</h2>
      <div className="size-info">
        <p>
          Ширина: <strong>{windowSize.width}px</strong>
        </p>
        <p>
          Высота: <strong>{windowSize.height}px</strong>
        </p>
        <p>
          <span className={`screen-type-indicator screen-type-${screenInfo.class}`}></span>
          Тип экрана: <strong>{screenInfo.type}</strong>
        </p>
      </div>
    </div>
  );
};

export default WindowSizeTracker;