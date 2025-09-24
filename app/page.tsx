'use client'

import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import RoomCard from './components/RoomCard'
import { hotel } from "./API/APIhotel";

const images: string[] = [
  'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661876290667-0612447870d5?q=80&w=963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661876290667-0612447870d5?q=80&w=963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const features = [
  { icon: <span>📶</span>, title: "Wi-Fi Gratis", description: "Akses internet nirkabel berkecepatan tinggi di seluruh area hotel." },
  { icon: <span>🏊‍♂️</span>, title: "Kolam Renang", description: "Nikmati kolam renang outdoor yang menyegarkan dengan pemandangan indah." },
  { icon: <span>🍽️</span>, title: "Restoran Mewah", description: "Cicipi hidangan lezat di restoran kami yang menyajikan masakan lokal dan internasional." },
  { icon: <span>🏋️</span>, title: "Pusat Kebugaran", description: "Tetap aktif dengan peralatan modern di pusat kebugaran kami." },
  { icon: <span>🧖‍♀️</span>, title: "Layanan Spa", description: "Relaksasi dan manjakan diri dengan perawatan spa profesional." },
  { icon: <span>🛎️</span>, title: "Layanan Concierge", description: "Staf kami siap membantu Anda dengan reservasi dan informasi wisata." },
  { icon: <span>🅿️</span>, title: "Parkir Valet", description: "Parkir aman dan nyaman tersedia untuk semua tamu." },
  { icon: <span>☕</span>, title: "Layanan Kamar 24 Jam", description: "Nikmati hidangan atau minuman kapan saja di kenyamanan kamar Anda." },
]

const reviews = [
  { text: "Pengalaman menginap yang luar biasa! Stafnya sangat ramah dan kamarnya sangat bersih. Pasti akan kembali lagi.", author: "Adi Pratama", rating: 5 },
  { text: "Lokasi hotel sangat strategis, dekat dengan banyak tempat wisata. Sarapan paginya juga enak.", author: "Siti Rahma", rating: 5 },
  { text: "Fasilitasnya lengkap, terutama kolam renangnya. Sangat cocok untuk liburan keluarga.", author: "Budi Santoso", rating: 4 }
]

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "contact">('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);


  async function getHotelData() {
    const result = await hotel();
    console.log(result);
    if (result.status === 200) {


    } else {
      console.log("error");
    }
  }

  useEffect(() => {


    const heroInterval = setInterval(() => {
      setIsFading(true); // Mulai transisi
      const nextIndex = (currentImageIndex + 1) % images.length;

      // Tunggu transisi selesai sebelum mengganti gambar di bawahnya
      setTimeout(() => {
        setPrevImageIndex(currentImageIndex);
        setCurrentImageIndex(nextIndex);
        setIsFading(false); // Reset untuk transisi berikutnya
      }, 1000); // Sesuai dengan durasi transisi

    }, 5000);

    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          // Gulir ke bawah
          setIsScrolled(true);
        } else {
          // Gulir ke atas
          setIsScrolled(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      clearInterval(heroInterval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentImageIndex, lastScrollY, isFading]);

  useEffect(() => {
    getHotelData();
  }, []);

  const heroImage: string = images[currentImageIndex]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{ backgroundImage: `url(${prevImageIndex})`, opacity: isFading ? 0 : 1 }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{ backgroundImage: `url(${heroImage})`, opacity: isFading ? 1 : 0 }}
          ></div>
          {/* Lapisan overlay untuk meningkatkan keterbacaan teks */}
          <div className="absolute inset-0 bg-slate-700 opacity-50"></div>
        </div>
        <div className="relative z-10 text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Rasakan Liburan Tak Terlupakan</h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
            Hotel Hebat, tempat Anda menemukan ketenangan dan kenyamanan sejati.
          </p>
          <a href="#main-search" className="bg-teal-700 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-teal-800 transition-colors transform hover:scale-105">
            Lihat Kamar & Harga
          </a>
        </div>
      </section>

      {/* Search Form */}
      <SearchForm isScrolled={isScrolled} />

      {/* Room Sections */}
      <section id="deluxe-room" className="bg-white py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <RoomCard
            id="deluxe"
            name="Kamar Deluxe"
            image="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            originalPrice={1500000}
            discountedPrice={999000}
            discount={30}
            roomsLeft={3}
            description="Nikmati kenyamanan dan kemewahan sejati di kamar deluxe kami. Dengan interior yang dirancang dengan cermat dan pemandangan kota yang memukau, setiap sudut kamar ini akan memanjakan Anda. Sempurna untuk bersantai setelah seharian beraktivitas."
            amenities={['AC', 'TV LED', 'Mini Bar', 'Balkon Pribadi']}
            reverse={false}
          />
        </div>
      </section>

      <section id="standard-room" className="bg-gray-100 py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <RoomCard
            id="standard"
            name="Kamar Standard"
            image="https://plus.unsplash.com/premium_photo-1661902745118-a736d6956c03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            originalPrice={800000}
            discountedPrice={599000}
            discount={25}
            roomsLeft={5}
            description="Kamar standard kami menawarkan kenyamanan fungsional dengan sentuhan modern. Dirancang untuk para traveler cerdas, kamar ini memiliki semua yang Anda butuhkan untuk istirahat yang nyaman dengan harga terbaik."
            amenities={['AC', 'TV LED', 'Wi-Fi', 'Kamar Mandi Pribadi']}
            reverse={true}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Fasilitas Hotel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105">
                <div className="text-purple-500 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-purple-700 text-white py-16 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Apa Kata Tamu Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white text-gray-800 p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
                <p className="text-lg italic mb-4">"{review.text}"</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="font-semibold text-purple-500">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}