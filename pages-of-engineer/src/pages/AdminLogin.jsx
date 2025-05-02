import React, { useState } from 'react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Basit admin kontrolü (şifreyi localStorage'a kaydediyoruz)
    if (password === 'admin123') {
      // Admin giriş yaptıysa, sessionStorage'a "admin" bilgisi kaydediliyor
      sessionStorage.setItem('admin', 'true');
      window.location.href = '/add-blog'; // Admin giriş yaptıysa AddBlog sayfasına yönlendir
    } else {
      alert('Yanlış şifre!');
    }
  };

  return (
    <div>
      <h2>Admin Girişi</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default AdminLogin;
