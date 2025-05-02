import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBlog = () => {
  // Admin giriş kontrolü
  useEffect(() => {
    if (!sessionStorage.getItem('admin')) {
      window.location.href = '/admin-login'; // Admin girişi yapılmadıysa AdminLogin sayfasına yönlendir
    }
  }, []);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author] = useState('Merve'); // Yazar bilgisi her zaman siz olacak

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      author
    };

    axios.post('http://localhost:5000/api/blogs', newBlog)
      .then(response => {
        alert('Blog yazısı başarıyla eklendi!');
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error("Blog yazısı eklenirken hata oluştu: ", error);
      });
  };

  return (
    <div>
      <h2>Yeni Blog Yazısı Ekle</h2>
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="İçerik"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-cinnamon text-white p-2 rounded">Ekle</button>
      </form>
    </div>
  );
};

export default AddBlog;
