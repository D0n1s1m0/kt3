import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddTechnology = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not-started',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const saved = localStorage.getItem('techTrackerData');
    const technologies = saved ? JSON.parse(saved) : [];
    
    const newTechnology = {
      id: Date.now(),
      ...formData
    };

    const updatedTechnologies = [...technologies, newTechnology];
    localStorage.setItem('techTrackerData', JSON.stringify(updatedTechnologies));
    
    navigate('/technologies');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <h1>➕ Добавить технологию</h1>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="title">Название технологии *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Например: React Hooks"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Опишите, что нужно изучить..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Начальный статус</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Первоначальные заметки</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Любые начальные мысли или ресурсы..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            ✅ Добавить технологию
          </button>
          <button type="button" onClick={() => navigate('/technologies')} className="btn">
            ❌ Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTechnology;