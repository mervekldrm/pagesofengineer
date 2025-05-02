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

    axios.post('http://localhost:5000/api/projects', newProject)
      .then(response => {
        alert('Proje başarıyla eklendi!');
        setTitle('');
        setDescription('');
      })
      .catch(error => {
        console.error("Proje eklenirken hata oluştu: ", error);
      });
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
