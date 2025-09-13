interface RoomCardProps {
    id: string
    name: string
    image: string
    originalPrice: number
    discountedPrice: number
    discount: number
    roomsLeft: number
    description: string
    amenities: string[]
    reverse: boolean
}

export default function RoomCard({
    id, name, image, originalPrice, discountedPrice, discount, roomsLeft, description, amenities, reverse
}: RoomCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price)
    }

    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
            <div className="md:w-1/2">
                
                <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105">
                    <img
                        src={image}
                        alt={name}
                        className="rounded-2xl shadow-xl w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-teal-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4">{name}</h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Amenities */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Fasilitas:</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {amenities.map((amenity, index) => (
                            <span key={index} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-red-500 font-semibold mb-1">Diskon Spesial {discount}%!</p>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="text-gray-400 text-xl md:text-2xl line-through">
                            {formatPrice(originalPrice)}
                        </span>
                        <span className="text-teal-700 text-2xl md:text-4xl font-bold">
                            {formatPrice(discountedPrice)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 font-semibold mt-2">{roomsLeft} kamar tersisa</p>
                </div>
                <a href="#main-search" className="bg-teal-700 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-teal-800 transition-colors transform hover:scale-105 inline-block">
                    Pesan Sekarang
                </a>
            </div>
        </div>
    )
}