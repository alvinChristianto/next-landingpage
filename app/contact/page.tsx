'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function ContactPage() {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleWhatsApp = (): void => {
        const defaultPhone: string = "6281234567890"
        const fullMessage: string = `Halo, saya ${name}. Nomor telepon saya ${phone}. Saya ingin menanyakan tentang: ${message}`
        const encodedMessage: string = encodeURIComponent(fullMessage)

        try {
            window.open(`https://wa.me/${defaultPhone}?text=${encodedMessage}`, '_blank')
        } catch (error) {
            console.error("Gagal membuka WhatsApp:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 md:pt-28">
            <section className="container mx-auto py-16 px-6 md:px-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-6">Hubungi Kami</h1>
                <p className="max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed mb-12">
                    Untuk pertanyaan, pemesanan, atau informasi lebih lanjut, silakan isi formulir di bawah ini. Kami akan segera merespons Anda.
                </p>
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                                placeholder="Masukkan nama Anda"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-left mb-1">Nomor Telepon</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                                placeholder="Contoh: 081234567890"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-left mb-1">Pesan</label>
                            <textarea
                                id="message"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                                placeholder="Tuliskan pesan Anda di sini"
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            onClick={handleWhatsApp}
                            className="w-full bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
                        >
                            Kirim Pesan via WhatsApp
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}