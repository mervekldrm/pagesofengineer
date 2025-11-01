import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author] = useState('Merve'); // Yazar bilgisi her zaman siz olacak

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      title,
      description,
      author
    };

    // No-backend: localStorage'a kaydet
    try {
      const existing = JSON.parse(localStorage.getItem('poe_projects') || '[]');
      const projectToSave = {
        id: Date.now().toString(),
        title,
        description,
        author,
        createdAt: new Date().toISOString()
      };
      const updated = [projectToSave, ...existing];
      localStorage.setItem('poe_projects', JSON.stringify(updated));
      alert('Proje başarıyla eklendi! (local)');
      setTitle('');
      setDescription('');
      // Yönlendir
      window.location.href = '/projects';
    } catch (err) {
      console.error('LocalStorage yazılamadı, backende denenecek:', err);
      // Fallback: attempt backend POST
      axios.post('http://localhost:5000/api/projects', newProject)
        .then(response => {
          alert('Proje başarıyla eklendi!');
          setTitle('');
          setDescription('');
          window.location.href = '/projects';
        })
        .catch(error => {
          console.error("Proje eklenirken hata oluştu: ", error);
          alert('Proje eklenirken hata oluştu. Konsola bakınız.');
        });
    }
  };

  return (
    <div>
      <h2>Yeni Proje Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-cinnamon text-white p-2 rounded">Ekle</button>
      </form>
    </div>
  );
};

export default AddProject;
