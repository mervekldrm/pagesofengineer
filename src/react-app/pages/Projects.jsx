import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Öncelikle localStorage'dan oku (no-backend kullanım)
    try {
      const local = JSON.parse(localStorage.getItem('poe_projects') || '[]');
      if (local && local.length) {
        setProjects(local);
        return;
      }
    } catch (err) {
      console.error('LocalStorage okunamadı:', err);
    }

    // Eğer localStorage boşsa, varsa backend'den çekmeyi dene (geriye dönük uyumluluk)
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data); // Projeleri state'e ekle
      })
      .catch(error => {
        console.error("Projeler alınırken hata oluştu: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Projelerim</h1>
      {projects.length > 0 ? (
        projects.map(project => (
          <div key={project.id || project._id} className="my-4 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold text-cinnamon">{project.title}</h2>
            <p className="text-sm text-navyDark">{project.description}</p>
            <p className="text-sm text-gray-500">Yazar: {project.author}</p>
          </div>
        ))
      ) : (
        <p>Henüz proje bulunmuyor.</p>
      )}
    </div>
  );
};

export default Projects;
