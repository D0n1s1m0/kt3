function TechnologyList({ technologies }) {
  if (!technologies || technologies.length === 0) {
    return (
      <div className="technology-list empty">
        <p>Технологии не найдены</p>
      </div>
    );
  }

  return (
    <div className="technology-list">
      <h2>Список технологий ({technologies.length})</h2>
      
      <div className="technologies-grid">
        {technologies.map(tech => (
          <div key={tech.id} className="technology-card">
            <h3>{tech.title}</h3>
            <p className="tech-description">{tech.description}</p>
            <div className="tech-meta">
              <span className={`category ${tech.category}`}>{tech.category}</span>
              <span className={`difficulty ${tech.difficulty}`}>{tech.difficulty}</span>
            </div>
            {tech.resources && tech.resources.length > 0 && (
              <div className="tech-resources">
                <strong>Ресурсы:</strong>
                <ul>
                  {tech.resources.map((resource, index) => (
                    <li key={index}>
                      <a href={resource} target="_blank" rel="noopener noreferrer">
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologyList;