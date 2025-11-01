import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
    const sizes = ["w-40 h-40", "w-48 h-48", "w-32 h-32"];

  return (
<section className="flex flex-col md:flex-row justify-center  bg-gradient-to-br from-skyblue via-blue-100 to-skyblue p-8 gap-6">
{/* Sol fotoğraf kutusu */}
<div className="hidden md:flex flex-col justify-around gap-6">
        {["1", "2", "3", "4", "5"].map((n, i) => {
          const size = sizes[Math.floor(Math.random() * sizes.length)];
          return (
            <div key={i} className={`${size} rounded-xl bg-lilacSoft shadow-xl/20 overflow-hidden p-1`}>
              <div className="w-full h-full overflow-hidden rounded-lg shadow-xl/20">
                <img
                  src={`/images/about-left-${n}.jpeg`}
                  alt={`About Left ${n}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>


      {/* Metin kutusu */}
      <div className="max-w-3xl text-navyDark text-center md:text-left space-y-6  indent-8 p-4">
        <h2 className="text-3xl font-bold text-cinnamon">Ben Kimim?</h2>
            <p>
            Merhaba, ben Merve. Bilgisayar Mühendisliği öğrencisiyim.
    </p>
            <p>Biraz biraz her şeye ilgi duyan biri olduğum için, sevdiğim her şeyi aynı anda yapmak hem heyecan verici hem de zaman zaman zorlayıcı olabiliyor. Bunları tek bir noktada toplamak da kolay değil—ama bu çok yönlülüğümü bir avantaja çevirmeye çalışıyorum.
    </p>
            İşte bu yüzden bu kişisel web sitesini ve <Link className="text-peachAccent underline" to="https://www.instagram.com/pagesofengineer/" target="_blank" rel="noopener noreferrer">
            @pagesofengineer</Link> adlı Instagram sayfamı oluşturdum. Kod yazmayı, yeni şeyler öğrenmeyi, yazı yazmayı, renkleri bir araya getirmeyi, bazen de sadece düşünmeyi seviyorum. Kişisel gelişimimi her alanda ilerletmeye ve bu hayatta var olma yolculuğumu anlamlandırmaya çalışıyorum.

            <p>Bu site; mühendislik projelerimi, blog yazılarımı, okuduğum kitaplardan aldığım ilhamları ve zamanla biriktirdiğim fikirleri paylaşabileceğim bir alan olarak şekilleniyor. Teknolojinin içinde olsam da sanatla, tasarımla ve insan hikâyeleriyle olan bağımı koparmak istemiyorum.
    </p>        
        <h3 className="text-2xl font-semibold text-peachAccent mt-4">🎓 Teknik Meraklarım</h3>
            <p>
            Bilgisayar Mühendisliği yolculuğum boyunca farklı alanlara dokunma şansım oldu. Zorunlu stajımda React ile frontend geliştirme deneyimi kazandım. Bu siteyi de tamamen React ile geliştirerek, hem öğrendiklerimi pekiştiriyor hem de kendimi ifade edebileceğim bir alan oluşturuyorum.        
            </p>
            <p>
            Yapay zekâ ve veri bilimiyle özellikle ilgileniyorum. Algoritmalar, modelleme ve veri ön işleme üzerine çalışıyor, öğrendiklerimi projelerle pekiştiriyorum. Şu anda arkadaşlarımla, görsellerin yapay zekâ üretimi olup olmadığını tespit eden bir makine öğrenmesi modeli geliştiriyoruz. Bu proje sayesinde teorik bilgileri pratiğe dönüştürme fırsatı buluyorum.
            </p>
            <p>
            Ayrıca üniversitede üç yıla yakın süredir aktif olduğum Bilgisayar ve Bilişim Topluluğu'nda önce üye, ardından yönetim ekibinde yer alarak birçok etkinlikte, projede ve organizasyonda görev aldım. Bu topluluk deneyimi hem teknik açıdan yeni şeyler öğrenmemi sağladı, hem de takım çalışması, organizasyon ve iletişim becerilerimi geliştirdi.
            </p>
            <h3 className="text-2xl font-semibold text-peachAccent mt-4">✨ Renkli Yönlerim</h3>
            <p>
            Teknolojiyle iç içe olsam da, hayatımın yaratıcı ve duygusal yönünü besleyen başka alanlar da var.       
            </p>
            <p>
            Kitap okumayı, yazı yazmayı ve resim yapmayı çok seviyorum. Özellikle iç dünyamı dışa vurabildiğim anları değerli buluyorum. Son zamanlarda journaling—yani günlük tutma—alışkanlığını da edindim. Bu hem zihinsel bir boşaltım hem de kendimle daha derin bir bağ kurma yolu haline geldi.
            </p>
            <p>
            Yeni deneyimlere her zaman açığım. Hayatta karşılaştığım her şeyi birer deneyim, hatta çoğu zaman birer hikâye olarak görmeyi seviyorum. Boş zamanlarımda yeni yerler keşfetmek, farklı insanlardan hayat hikâyeleri dinlemek ve bunlar üzerine düşünmek bana ilham veriyor.
            </p>
            <p>
            İlişkiler, duygular, kişisel gelişim, sanat, teknoloji... Tüm bu başlıklar üzerine düşünüyor, yazıyor, bazen de sadece izliyorum. Blog kısmında da zamanla hemen her konuda bir şeyler yazıyor olacağım—çünkü sınırlanmak yerine, keşfederek yaşamak bana daha çok uyuyor.
            </p>
      </div>

      {/* Sağ fotoğraf kutusu */}
      <div className="hidden md:flex flex-col justify-around gap-6">
        {["1", "2", "3", "4", "5"].map((n, i) => {
          const size = sizes[Math.floor(Math.random() * sizes.length)];
          return (
            <div key={i} className={`${size} rounded-xl bg-lilacSoft shadow-xl/20 overflow-hidden p-1`}>
              <div className="w-full h-full overflow-hidden rounded-lg shadow-xl/20">
                <img
                  src={`/images/about-right-${n}.jpeg`}
                  alt={`About Right ${n}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
