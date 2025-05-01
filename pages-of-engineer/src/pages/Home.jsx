const Home = () => {
    return (
      <div className="min-h-screen font-sans bg-white">
  
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  
          {/* LEFT IMAGE BLOCK */}
          <div
            className="bg-cover bg-center min-h-[500px]"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/desk-horizontal.jpeg)`
            }}
          ></div>
  
          {/* CENTER SECTION */}
          <div className="flex flex-col gap-6">
            <div className="bg-rose-100 p-6">
              <h1 className="text-3xl sm:text-5xl font-bold text-rose-700 mb-4 break-words">
                Mühendislik <br className="block sm:hidden" /> Defterim
              </h1>
              <p className="text-gray-700 mb-6">Kodla yaz, kalemle çiz, kelimelerle anlat.</p>
            </div>
  
            <div className="bg-white shadow-md p-4 flex items-start gap-4 border-l-4 border-rose-300">
              <img
                src={`${process.env.PUBLIC_URL}/images/ghibliMe.jpeg`}
                alt="Author"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">
                  Merhaba, ben Merve. Merak ettiklerimi, ürettiklerimi ve öğrendiklerimi burada paylaşıyorum.
                </h3>
                <p className="text-sm text-gray-600">
                  Bu blogda biraz merak ettiklerim, biraz denediklerim, bolca da “üretme hali” var.
                </p>
                <a href="#" className="text-rose-500 text-sm font-medium mt-1 inline-block">
                  Hakkımda daha fazla...
                </a>
              </div>
            </div>
  
            <div
              className="bg-cover bg-center h-64 relative"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/desk1.jpeg)`
              }}
            >
              <div className="absolute bottom-2 left-2 bg-white px-3 py-1 text-sm font-semibold">Journaling</div>
            </div>
          </div>
  
          {/* RIGHT SECTION */}
          <div className="flex flex-col gap-6">
            <div
              className="bg-cover bg-center h-64 relative"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/ghibliMe.jpeg)`
              }}
            >
              <div className="bg-white px-3 py-1 absolute m-2 text-sm font-semibold inline-block">Thinking</div>
            </div>
  
            <div className="bg-rose-200 p-6 text-white flex flex-col justify-between h-64">
              <h2 className="text-lg font-bold mb-2"></h2>
              <p className="text-sm">
                Yazılım, çizim, kitaplar, bazen de sadece güzel görünen şeyler...
                Hepsinin arasında kendime ait bir alan yaratmaya çalışıyorum.
              </p>
              <a href="#" className="underline font-semibold text-white mt-4">Daha fazlası için göz at</a>
            </div>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default Home;
  