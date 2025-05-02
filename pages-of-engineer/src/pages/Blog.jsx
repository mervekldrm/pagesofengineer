import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Blog yazılarını backend'den al
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        setBlogs(response.data); // Veriyi React state'e ekle
      })
      .catch(error => {
        console.error("Blog yazıları alınırken hata oluştu: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Blog Yazılarım</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <div key={blog._id} className="my-4 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold text-cinnamon">{blog.title}</h2>
            <p className="text-sm text-navyDark">{blog.content}</p>
            <p className="text-sm text-gray-500">Yazar: {blog.author}</p>
          </div>
        ))
      ) : (
        <p>Henüz blog yazısı yok.</p>
      )}
    </div>
  );
};

export default Blog;
