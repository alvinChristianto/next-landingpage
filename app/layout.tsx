import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Hotel Jaya Abadi, Hotel Berkualitas, Nyaman dan Harga terjangkau",
    template: "%s | EzHotel",
  },
  description:
    "Hotel Jaya Abadi, Nyaman dan Harga terjangkau untuk traveler dan keluarga di Jawa  ",
  keywords:
    "Hotel Nyaman dan Harga terjangkau,  hotel berkualitas, hotel murah, penginapan, jogja, yogyakarta, bali, lovina, wonosobo, malioboro, tugu jogja,cabin hotel, the cabin hotel, hotel, nyaman, hotel nyaman",
  openGraph: {
    title: "Hotel Jaya Abadi",
    siteName: "Hotel Jaya Abadi",
    type: "website",
    url: "https://hoteljaya.ezhotel.site/",
    description:
      "Hotel Jaya Abadi Menginap nyaman dan terjangkau untuk traveler dan keluarga di Jawa dan Bali",
    images:
      "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} font-inter text-gray-800`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}