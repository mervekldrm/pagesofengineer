/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cinnamon: "#D2691E",     // Ana vurgu (sıcak)
        skyblue: "#457B9D",      // Açık mavi - yazı/metin
        lilacSoft: "#E1A4C4",    // Yumuşak pembe-lila
        peachAccent: "#F4A261",  // Şeftali detay
        background: "#FFF2E6",   // Zemin/bej
        navyDark: "#1D3557",     // Koyu mavi - hover/buton
        lilacSoftTrans: "rgba(225, 164, 196, 0.2)",
        skyblueTrans: "rgba(17, 38, 52, 0.2)",
      },
    }
    
  },
  plugins: [],
}
