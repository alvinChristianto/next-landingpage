import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 px-6 md:px-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-teal-500">Hotel Hebat</h3>
                    <p className="text-gray-400">Jalan Bahagia No. 123, Kota Ramah, Indonesia</p>
                    <p className="text-gray-400">Tel: +62 812 3456 7890</p>
                    <p className="text-gray-400">Email: info@hotelhebat.com</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Navigasi</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Beranda</Link></li>
                        <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</Link></li>
                        <li><a href="/#deluxe-room" className="text-gray-400 hover:text-white transition-colors">Kamar Deluxe</a></li>
                        <li><a href="/#standard-room" className="text-gray-400 hover:text-white transition-colors">Kamar Standard</a></li>
                        <li><a href="/#features" className="text-gray-400 hover:text-white transition-colors">Fasilitas</a></li>
                        <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Kontak</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
                    <div className="flex justify-center md:justify-start space-x-4 text-2xl">
                        <a href="#" className="text-purple-300 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.013 4.858.071 3.298.157 5.166 1.966 5.323 5.323.057 1.274.07 1.654.07 4.858s-.013 3.584-.07 4.858c-.157 3.298-1.966 5.165-5.323 5.323-1.274.057-1.654.07-4.858.07s-3.584-.013-4.858-.07c-3.298-.158-5.166-1.967-5.323-5.323-.057-1.274-.07-1.654-.07-4.858s.013-3.584.07-4.858c.158-3.298 1.967-5.165 5.323-5.323 1.274-.057 1.654-.07 4.858-.07zm0-2.163c-3.259 0-3.667.014-4.942.071-4.786.223-7.468 2.906-7.691 7.691-.057 1.275-.07 1.683-.07 4.942s.014 3.667.07 4.942c.223 4.786 2.905 7.468 7.691 7.691 1.275.057 1.683.07 4.942.07s3.667-.014 4.942-.07c4.786-.223 7.468-2.905 7.691-7.691.057-1.275.07-1.683.07-4.942s-.014-3.667-.07-4.942c-.223-4.786-2.905-7.468-7.691-7.691-1.275-.057-1.683-.07-4.942-.07z" />
                                <path d="M12 6.865c-2.821 0-5.135 2.314-5.135 5.135s2.314 5.135 5.135 5.135 5.135-2.314 5.135-5.135-2.314-5.135-5.135-5.135zm0 8.435c-1.828 0-3.3-1.472-3.3-3.3s1.472-3.3 3.3-3.3 3.3 1.472 3.3 3.3-1.472 3.3-3.3 3.3zm5.727-8.775c-.963 0-1.745.782-1.745 1.745s.782 1.745 1.745 1.745 1.745-.782 1.745-1.745-.782-1.745-1.745-1.745z" />
                            </svg>
                        </a>
                        <a href="#" className="text-purple-300 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="#" className="text-purple-300 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-500">
                &copy; 2024 Hotel Hebat. Semua Hak Cipta Dilindungi.
            </div>
        </footer>
    )
}