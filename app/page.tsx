'use client'

import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import RoomCard from './components/RoomCard'
import { hotel, room_hotel } from "./API/APIhotel";

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
  const [hotelData, setHotelData] = useState<any>(Object);
  const [roomTypeData, setRoomTypeData] = useState<any>(Array);

  const [isFading, setIsFading] = useState<boolean>(false);
  const [prevImageIndex, setPrevImageIndex] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  
    // STATE BARU UNTUK CROSS-FADE
    const [oldImageIndex, setOldImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1);



  async function getHotelData() {
    const result: any = await hotel();

    if (result && result.status === 200) {
      console.log(result.data);
      setHotelData(result.data);

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
    getRoomTypeData();
  }, []);

  useEffect(() => {
        if (images.length < 2) return; // Tidak perlu transisi jika kurang dari 2 gambar

        const transitionDuration = 1000; // 1 detik transisi
        const displayDuration = 4000;   // 4 detik gambar stabil
        
        const heroInterval = setInterval(() => {
            // 1. Mulai fade-in gambar berikutnya (Lapisan Atas)
            setIsFading(true); 
            
            // 2. Setelah durasi transisi, update indeks dan reset trigger
            setTimeout(() => {
                const newOldIndex = nextImageIndex;
                const newNextIndex = (newOldIndex + 1) % images.length;

                setOldImageIndex(newOldIndex); // Gambar baru menjadi gambar lama
                setNextImageIndex(newNextIndex); // Tentukan gambar berikutnya
                setIsFading(false); // Reset opacity Lapisan Atas ke 0 untuk transisi selanjutnya
            }, transitionDuration); 
            
        }, displayDuration + transitionDuration); // Total siklus = 5 detik

        // Logika Navbar Scroll
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY;

                // Navbar Hide/Show
                if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                    setIsScrolled(true); // Sembunyikan
                } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
                    setIsScrolled(false); // Tampilkan
                }

                setLastScrollY(currentScrollY);
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
    }, [oldImageIndex, nextImageIndex, images.length]); // Dependencies memastikan logika berjalan lancar


  const heroImage: string = images[currentImageIndex]

  return (
    <>
      {/* Hero Section */}
      <section id="hero-section" className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Gambar Latar Belakang (Transisi Cross-Fade MULUS) */}
        <div className="absolute inset-0">
          {/* Gambar Lama (Lapisan Bawah, selalu opacity 1, ini memastikan layar tidak gelap) */}
          <img
            src={images[oldImageIndex]}
            alt="Hotel View Old"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          />
          {/* Gambar Baru (Lapisan Atas, transisi opacity 0 -> 1) */}
          <img
            src={images[nextImageIndex]}
            alt="Hotel View New"
            // Ketika isFading=TRUE, opacity=1 (fading in). Ketika isFading=FALSE, opacity=0 (invisible, ready for next transition)
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isFading ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Overlay Hitam untuk Keterbacaan Teks */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Konten Hero */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
            {hotelData?.name || "Hotel Hebat"}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 drop-shadow-md font-medium">
            {hotelData?.tagline || "Kenyamanan dan Kemewahan di Jantung Kota"}
          </p>

          {/* Search Form component */}

          {/* <SearchForm isScrolled={isScrolled} /> */}


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

          {roomTypeData.map((room, index) => (
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