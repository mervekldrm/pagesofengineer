import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Pages of Engineer — Merve',
  description: 'Kodla yaz, kalemle çiz, kelimelerle anlat. Merve\'nin kişisel blog ve portföy sitesi.',
  openGraph: {
    title: 'Pages of Engineer',
    description: 'Biyoinformatik, cloud, yazılım testi ve daha fazlası.',
    url: 'https://pagesofengineer.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
