import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import Lottie from 'lottie-react';

const iconStyle =
  "transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg";

const FloatingIcons = () => {
  const icons = [
    { icon: <FaLinkedin />, color: "text-skyblue", link: "https://www.linkedin.com/in/mervekaldirim/" },
    { icon: <FaInstagram />, color: "text-pink-500", link: "https://www.instagram.com/pagesofengineer/" },
    { icon: <FaGithub />, color: "text-gray-800", link: "https://github.com/mervekldrm" },
  ];
  const positions = [
    "top-10 left-1/4 animate-float-slow",
    "top-1/2 right-10 animate-float-medium",
    "bottom-10 left-10 animate-float-fast",
  ];
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {icons.map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute text-6xl opacity-20 ${item.color} ${positions[i]} pointer-events-auto`}
          style={{ filter: "blur(0.5px)" }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

const AnimatedBubbles = () => (
  <div className="fixed inset-0 -z-20 pointer-events-none">
    <div className="absolute top-10 left-10 w-24 h-24 bg-skyblue opacity-30 rounded-full animate-bubble1"></div>
    <div className="absolute bottom-20 right-20 w-32 h-32 bg-cinnamon opacity-20 rounded-full animate-bubble2"></div>
    <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-peachAccent opacity-30 rounded-full animate-bubble3"></div>
    <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-navyDark opacity-20 rounded-full animate-bubble4"></div>
  </div>
);

const useLottieFromPublic = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);
  return data;
};

const Contact = () => {
  const coffeeAnim = useLottieFromPublic('/images/coffee.json');
  const bookAnim = useLottieFromPublic('/images/book.json');
  const laptopAnim = useLottieFromPublic('/images/laptop.json');

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-skyblue/10 via-white to-lilacSoft/30 overflow-hidden">
      <AnimatedBubbles />
      <FloatingIcons />
      {/* Lottie Animasyonları */}
        {coffeeAnim && (
          <div className="absolute left-8 top-8 w-44 h-44 z-10 opacity-90 hidden md:block">
            <Lottie animationData={coffeeAnim} loop={true} />
          </div>
        )}
        {bookAnim && (
          <div className="absolute right-8 top-1/2 w-52 h-52 z-10 opacity-90 hidden md:block">
            <Lottie animationData={bookAnim} loop={true} />
          </div>
        )}
        {laptopAnim && (
          <div className="absolute left-8 top-1/2 w-52 h-52 z-10 opacity-90 hidden md:block">
            <Lottie animationData={laptopAnim} loop={true} />
          </div>
        )}
      <div className="max-w-xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-10 mt-8 animate-fade-in relative z-20 border-2 border-cinnamon/20 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-cinnamon mb-4 animate-bounce flex items-center gap-2">
          <span role="img" aria-label="wave" className="animate-wiggle">👩‍💻</span>
          Merve ile Bağlantı Kur!
        </h1>
        <p className="text-navyDark mb-8 animate-fade-in-slow text-lg">
          Üretmeyi seven bir mühendis olma yolculuğuma göz attığın için teşekkürler..<br />
          <span className="text-peachAccent">Soruların, önerilerin veya sadece selam vermek için</span> aşağıdaki bağlantılardan bana ulaşabilirsin!
        </p>
        <div className="flex justify-center gap-10 mt-8 text-5xl">
          <a
            href="https://www.linkedin.com/in/mervekaldirim/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-skyblue hover:text-navyDark ${iconStyle}`}
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/pagesofengineer/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-pink-500 hover:text-navyDark ${iconStyle}`}
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/mervekldrm"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-800 hover:text-navyDark ${iconStyle}`}
            title="GitHub"
          >
            <FaGithub />
          </a>
        </div>
        <div className="mt-10 text-center">
          <span className="inline-block animate-wiggle text-3xl mr-2">✉️</span>
          <a
            href="mailto:mervekaldirim@pagesofengineer.com"
            className="text-skyblue underline text-xl hover:text-cinnamon transition-colors duration-300"
          >
            mervekaldirim@pagesofengineer.com
          </a>
        </div>
        <div className="mt-8 text-center text-peachAccent font-semibold animate-fade-in-slow">
          <span role="img" aria-label="coffee">☕</span> Bir kahve eşliğinde sohbet etmek istersen, her zaman beklerim!
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px);} 
            to { opacity: 1; transform: translateY(0);} 
          }
          .animate-fade-in {
            animation: fade-in 1s ease;
          }
          @keyframes fade-in-slow {
            from { opacity: 0;} 
            to { opacity: 1;} 
          }
          .animate-fade-in-slow {
            animation: fade-in-slow 2s 0.5s both;
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(-10deg);} 
            50% { transform: rotate(10deg);} 
          }
          .animate-wiggle {
            animation: wiggle 1.2s infinite;
            display: inline-block;
          }
          @keyframes bubble1 {
            0% { transform: translateY(0) scale(1);} 
            50% { transform: translateY(-30px) scale(1.1);} 
            100% { transform: translateY(0) scale(1);} 
          }
          .animate-bubble1 {
            animation: bubble1 6s ease-in-out infinite;
          }
          @keyframes bubble2 {
            0% { transform: translateY(0) scale(1);} 
            50% { transform: translateY(40px) scale(1.15);} 
            100% { transform: translateY(0) scale(1);} 
          }
          .animate-bubble2 {
            animation: bubble2 8s ease-in-out infinite;
          }
          @keyframes bubble3 {
            0% { transform: translateY(0) scale(1);} 
            50% { transform: translateY(-20px) scale(0.95);} 
            100% { transform: translateY(0) scale(1);} 
          }
          .animate-bubble3 {
            animation: bubble3 7s ease-in-out infinite;
          }
          @keyframes bubble4 {
            0% { transform: translateY(0) scale(1);} 
            50% { transform: translateY(25px) scale(1.08);} 
            100% { transform: translateY(0) scale(1);} 
          }
          .animate-bubble4 {
            animation: bubble4 9s ease-in-out infinite;
          }
          @keyframes float-slow {
            0% { transform: translateY(0) rotate(-10deg);} 
            50% { transform: translateY(-30px) rotate(10deg);} 
            100% { transform: translateY(0) rotate(-10deg);} 
          }
          .animate-float-slow {
            animation: float-slow 10s ease-in-out infinite;
          }
          @keyframes float-medium {
            0% { transform: translateY(0) rotate(0deg);} 
            50% { transform: translateY(-20px) rotate(15deg);} 
            100% { transform: translateY(0) rotate(0deg);} 
          }
          .animate-float-medium {
            animation: float-medium 7s ease-in-out infinite;
          }
          @keyframes float-fast {
            0% { transform: translateY(0) rotate(5deg);} 
            50% { transform: translateY(-40px) rotate(-10deg);} 
            100% { transform: translateY(0) rotate(5deg);} 
          }
          .animate-float-fast {
            animation: float-fast 5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
