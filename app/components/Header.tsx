'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-80 backdrop-blur-sm shadow-md py-4 px-6 md:px-12">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl md:text-2xl font-bold text-teal-700 hover:text-teal-800 transition-colors">
                    Hotel Hebat
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 lg:space-x-10">
                    <Link
                        href="/about"
                        className={`transition-colors ${isActive('/about') ? 'text-teal-700 font-semibold' : 'text-gray-600 hover:text-teal-700'}`}
                    >
                        Tentang Kami
                    </Link>
                    <a href="/#deluxe-room" className="text-gray-600 hover:text-teal-700 transition-colors">Kamar Deluxe</a>
                    <a href="/#standard-room" className="text-gray-600 hover:text-teal-700 transition-colors">Kamar Standard</a>
                    <a href="/#features" className="text-gray-600 hover:text-teal-700 transition-colors">Fitur</a>
                    <Link
                        href="/contact"
                        className={`transition-colors ${isActive('/contact') ? 'text-teal-700 font-semibold' : 'text-gray-600 hover:text-teal-700'}`}
                    >
                        Kontak
                    </Link>
                </div>

                <a href="/#main-search" className="bg-teal-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-teal-800 transition-colors hidden md:block">
                    Pesan Sekarang
                </a>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        className="text-gray-600 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 py-4">
                    <div className="container mx-auto px-6 space-y-4">
                        <Link
                            href="/about"
                            className={`block transition-colors ${isActive('/about') ? 'text-teal-700 font-semibold' : 'text-gray-600'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Tentang Kami
                        </Link>
                        <a href="/#deluxe-room" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>Kamar Deluxe</a>
                        <a href="/#standard-room" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>Kamar Standard</a>
                        <a href="/#features" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>Fitur</a>
                        <Link
                            href="/contact"
                            className={`block transition-colors ${isActive('/contact') ? 'text-teal-700 font-semibold' : 'text-gray-600'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Kontak
                        </Link>
                        <a href="/#main-search" className="block bg-teal-700 text-white px-5 py-2 rounded-full font-semibold text-center" onClick={() => setMobileMenuOpen(false)}>
                            Pesan Sekarang
                        </a>
                    </div>
                </div>
            )}
        </header>
    )
}