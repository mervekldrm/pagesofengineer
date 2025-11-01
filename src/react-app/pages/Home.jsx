import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Projeleri backend'den al (backend removed earlier; this will fail if no API)
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching projects: ", error));
  }, []);
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-skyblue via-background to-lilacSoft">
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

        {/* LEFT IMAGE BLOCK */}
        <div
          className="bg-cover bg-center min-h-[500px] rounded-lg shadow"
          style={{
              backgroundImage: `url(/images/desk-horizontal.jpeg)`
          }}
        ></div>

        {/* CENTER SECTION */}
        <div className="flex flex-col gap-6">
          {/* Başlık Bloğu */}
          <div className="bg-background p-6 rounded-lg shadow transition transform duration-300 hover:scale-[1.015]">
            <h1 className="text-3xl sm:text-5xl font-bold text-cinnamon mb-4 break-words">
              Mühendislik <br className="block sm:hidden" /> Defterim
            </h1>
            <p className="text-peachAccent mb-6">Kodla yaz, kalemle çiz, kelimelerle anlat.</p>
          </div>

          {/* Yazar Kartı */}
          <div className="bg-white shadow-md p-4 flex items-start gap-4 border-l-4 border-cinnamon rounded-lg transition transform duration-300 hover:scale-[1.015]">
            <img
              src={`/images/ghibliMe.jpeg`}
              alt="Author"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-skyblue">
                Merhaba, ben Merve. Merak ettiklerimi, ürettiklerimi ve öğrendiklerimi burada paylaşıyorum.
              </h3>
              <p className="text-sm text-navyDark">
                Bu blogda biraz merak ettiklerim, biraz denediklerim, bolca da “üretme hali” var.
              </p>
              <Link to="/about" className="text-cinnamon text-sm font-medium mt-1 inline-block hover:underline">
                Hakkımda daha fazla...
              </Link>
            </div>
          </div>

          {/* Alt Orta Görsel */}
          <div
            className="bg-cover bg-center h-64 relative rounded-lg shadow transition transform duration-300 hover:scale-[1.015]"
            style={{
              backgroundImage: `url(/images/desk1.jpeg)`
            }}
          >
            <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-cinnamon px-3 py-1 text-sm font-semibold rounded shadow">
              Journaling
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-6">
          {/* Üst Sağ Görsel */}
          <div
            className="bg-cover bg-center h-64 relative rounded-lg shadow transition transform duration-300 hover:scale-[1.015]"
            style={{
              backgroundImage: `url(/images/ghibliMe.jpeg)`
            }}
          >
            <div className="bg-white/80 backdrop-blur-sm text-cinnamon px-3 py-1 absolute m-2 text-sm font-semibold inline-block rounded shadow">
              Thinking
            </div>
          </div>

          {/* Alt Sağ Kart */}
          <div className="bg-lilacSoft p-6 text-navyDark flex flex-col justify-between h-64 rounded-lg shadow transition transform duration-300 hover:scale-[1.015]">
            <p className="text-sm sm:text-base ">
            🌱 Bu Site Neden Var?
Burası projelerimi, düşüncelerimi ve ilhamlarımı bir araya getirdiğim kişisel alanım.
Zamanla hem üretimlerimi hem de içsel yolculuğumu taşıyan bir haritaya dönüşmesini istiyorum.
Eğer burada bir fikirle, yazıyla ya da projeyle bağ kurarsan—ne mutlu bana.


            </p>
            <a
              href="#"
              className="mt-4 inline-block bg-cinnamon text-white px-4 py-2 text-sm font-semibold rounded hover:bg-navyDark transition"
            >
              Daha fazlası için göz at
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
