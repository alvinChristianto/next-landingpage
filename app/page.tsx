'use client'

import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import RoomCard from './components/RoomCard'
import { hotel, room_hotel } from "./API/APIhotel";
import Image from 'next/image';

interface HotelData {
  name: string;
  description: string;
}

// Props untuk Hero Section Component
interface HeroSectionProps {
  hotelData?: HotelData;
  images: string[];
  intervalDuration?: number; // dalam milliseconds, default 5000ms (5 detik)
}


const images: string[] = [
  'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661876290667-0612447870d5?q=80&w=963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
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

function LoadingSkeleton() {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-200 animate-pulse">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="h-16 bg-gray-300 rounded-lg mb-4 w-3/4 mx-auto"></div>
        <div className="h-8 bg-gray-300 rounded-lg w-1/2 mx-auto"></div>
      </div>
    </section>
  );
}


export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "contact">('home');
  const [hotelData, setHotelData] = useState<any>(Object);
  const [roomTypeData, setRoomTypeData] = useState<any>(Array);

  const [prevImageIndex, setPrevImageIndex] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // STATE BARU UNTUK CROSS-FADE
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);



  async function getHotelData() {
    setIsLoading(true);
    const result: any = await hotel();

    if (result && result.status === 200) {
      console.log(result.data);
      setHotelData(result.data);

      setIsLoading(false);

    } else {
      console.log("error");
    }

  }


  async function getRoomTypeData() {
    const result: any = await room_hotel();

    if (result && result.status === 200) {
      console.log(result.data);
      setRoomTypeData(result.data);

    } else {
      console.log("error");
    }

  }

  useEffect(() => {
    // Validasi: pastikan ada minimal 2 gambar
    if (images.length < 2) {
      console.warn('HeroSection membutuhkan minimal 2 gambar untuk transisi');
      return;
    }

    const interval = setInterval(() => {
      // Mulai transisi fade-out
      setIsFading(true);

      // Tunggu transisi selesai, kemudian ganti gambar dan fade-in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 200); // Durasi harus sama dengan duration-1000 di className
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, 5000]);


  useEffect(() => {
    getHotelData();
    getRoomTypeData();
  }, []);

  // Render loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <section id="hero-section" className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Gambar Latar Belakang (Transisi Cross-Fade MULUS) */}
        <div className="absolute inset-0">
          {/* Gambar Utama - Menggunakan Next.js Image */}
          <div className="absolute inset-0">
            <Image
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Hotel View ${currentImageIndex + 1}`}
              fill
              priority
              quality={90}
              sizes="100vw"
              className={`object-cover transition-opacity duration-200 ${isFading ? 'opacity-0' : 'opacity-100'
                }`}
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Overlay Hitam untuk Keterbacaan Teks */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Konten Hero */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg animate-fade-in">
            {hotelData?.name || 'Hotel Hebat'}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 drop-shadow-md font-medium animate-fade-in-delay">
            {hotelData?.description || 'Kenyamanan dan Kemewahan di Jantung Kota'}
          </p>

          {/* Optional: Indikator Slide */}
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsFading(true);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setIsFading(false);
                  }, 1000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </section>

      {/* Search Form */}
      {/* <SearchForm isScrolled={isScrolled} /> */}
      {hotelData?.is_transaction_allowed ? (
        <SearchForm isScrolled={isScrolled} />
      ) : (
        null
      )}
      {/* Room Sections */}
      <section id="room-types" className="py-20 px-6 md:px-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-teal-700 mb-12 text-center">Pilihan Tipe Kamar Kami</h2>

          {roomTypeData.map((room: any, index: any) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.type_name}
              image={room.image_room}
              originalPrice={2000}
              discountedPrice={1900}
              discount={10}
              roomsLeft={1}
              description={room.description}
              amenities={"AC, TV LED, Wi-Fi, Kamar Mandi Pribadi".split(", ")}
              reverse={index % 2 !== 0} // Mengganti layout setiap item
            />
          ))}

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