import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tentang Kami - Hotel Hebat',
    description: 'Pelajari lebih lanjut tentang Hotel Hebat, visi, misi, dan komitmen kami untuk memberikan pengalaman menginap terbaik.',
}

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

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 md:pt-28">
            <section className="relative container mx-auto py-16 px-6 md:px-12 text-center overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571003102266-932c0288f348?q=80&w=2800&auto=format&fit=crop')" }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="relative z-10 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Tentang Hotel Kami</h1>
                    <p className="max-w-4xl mx-auto text-gray-200 text-lg leading-relaxed mb-8">
                        Hotel Hebat didirikan dengan satu tujuan: untuk memberikan pengalaman menginap yang tak tertandingi di tengah kota. Dengan perpaduan antara desain modern dan sentuhan lokal yang hangat, kami menciptakan ruang di mana setiap tamu merasa seperti di rumah.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-gray-800">
                        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-teal-700 mb-4">Visi Kami</h2>
                            <p className="text-gray-600">
                                Menjadi destinasi pilihan utama bagi para pelancong yang mencari kemewahan, kenyamanan, dan layanan personal yang luar biasa. Kami berdedikasi untuk melampaui ekspektasi setiap tamu, menciptakan kenangan yang tak terlupakan.
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-teal-700 mb-4">Fasilitas Kelas Dunia</h2>
                            <p className="text-gray-600">
                                Kami menawarkan berbagai fasilitas lengkap untuk memenuhi setiap kebutuhan Anda, termasuk pusat kebugaran 24 jam, kolam renang outdoor yang menakjubkan, restoran gourmet, dan layanan spa untuk relaksasi total.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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
        </div>
    )
}