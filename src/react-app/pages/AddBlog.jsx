import React, { useState, useEffect } from 'react';

// This app uses localStorage as a simple no-backend CMS.
// New blog posts are stored under the key `poe_blogs` so they persist in the browser.

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
      id: Date.now().toString(),
      title,
      content,
      author,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('poe_blogs') || '[]');
      existing.unshift(newBlog);
      localStorage.setItem('poe_blogs', JSON.stringify(existing));
      alert('Blog yazısı tarayıcıda kaydedildi. (localStorage)');
      setTitle('');
      setContent('');
      // navigate back to blog list
      window.location.href = '/blog';
    } catch (err) {
      console.error('Yerel kaydetme başarısız: ', err);
      alert('Kaydetme başarısız. Konsolu kontrol edin.');
    }
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
