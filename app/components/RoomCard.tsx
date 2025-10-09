
interface RoomCardProps {
    id: string;
    name: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
    roomsLeft: number;
    description: string;
    amenities: string[];
    reverse: boolean;
}

const BE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_ROUTE;

export default function RoomCard({
    id, name, image, originalPrice, discountedPrice, discount, roomsLeft, description, amenities, reverse
}: RoomCardProps) {
    // Fungsi untuk memformat harga ke Rupiah
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 bg-white rounded-xl shadow-2xl p-6 md:p-10 mb-12`}>
            <div className="md:w-1/2">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.03]">
                    <img
                        src={BE_STORAGE_URL + image[0]} //adding NEXT_PUBLIC_IMAGE_STORAGE_ROUTE from .env.local
                        alt={name}
                        className="w-full h-full object-cover aspect-video md:aspect-square"
                    />
                    <div className="absolute inset-0 bg-teal-700 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4">{name}</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {description}
                </p>

                {/* Amenities */}
                <div className="mb-6 border-t border-b border-gray-200 py-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Fasilitas Termasuk:</h3>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {amenities.map((amenity, index) => (
                            <span key={index} className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Price and Discount */}
                <div className="mb-6">
                    <p className="text-sm text-red-500 font-bold mb-2 p-1 px-3 bg-red-50 rounded-full inline-block">Diskon Spesial {discount}%!</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                        <span className="text-gray-400 text-xl md:text-2xl line-through">
                            {formatPrice(originalPrice)}
                        </span>
                        <span className="text-purple-700 text-3xl md:text-4xl font-extrabold">
                            {formatPrice(discountedPrice)}
                        </span>
                    </div>
                    <p className="text-sm text-red-500 font-semibold mt-3 flex items-center justify-center md:justify-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        {roomsLeft} kamar tersisa - Pesan Sekarang!
                    </p>
                </div>
                <a
                    href="#main-search"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('main-search')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-teal-700 text-white px-10 py-3 rounded-full font-semibold text-lg hover:bg-teal-800 transition-colors transform hover:scale-105 inline-block shadow-lg shadow-teal-500/50"
                >
                    Pesan Sekarang
                </a>
            </div>
        </div>
    )
}