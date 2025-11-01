import React, { useState } from 'react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Basit admin kontrolü (şifreyi sessionStorage'a kaydediyoruz)
    if (password === 'admin123') {
      // Admin giriş yaptıysa, sessionStorage'a "admin" bilgisi kaydediliyor
      sessionStorage.setItem('admin', 'true');
      // React Router kullandığımız için history/navigation yerine window.location ile yönlendirme yapılıyor.
      // Bu still works but if you'd prefer a programmatic navigation, we can use useNavigate from react-router.
      window.location.href = '/add-blog'; // Admin giriş yaptıysa AddBlog sayfasına yönlendir
    } else {
      alert('Yanlış şifre!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Girişi</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-cinnamon text-white px-4 py-2 rounded">Giriş Yap</button>
      </form>
    </div>
  );
};

export default AdminLogin;
