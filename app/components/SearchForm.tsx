'use client'

import { useState, useEffect } from 'react'

// Helper function to format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function SearchForm({ isScrolled }: { isScrolled: boolean }) {
    const today = new Date();
    const minDate = formatDate(today);

    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')
    const [stayDuration, setStayDuration] = useState<number>(0)
    const [dateError, setDateError] = useState<string>('');
    const minCheckOutDate = checkIn ? formatDate(new Date(new Date(checkIn).getTime() + (24 * 60 * 60 * 1000))) : minDate;


    useEffect(() => {
        if (checkIn && checkOut) {
            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);
            if (endDate <= startDate) {
                setDateError('Tanggal check-out harus setelah tanggal check-in.');
                setStayDuration(0);
            } else {
                const timeDiff = endDate.getTime() - startDate.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                setStayDuration(daysDiff);
                setDateError('');
            }
        } else {
            setStayDuration(0);
            setDateError('');
        }
    }, [checkIn, checkOut]);


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (dateError || !checkIn || !checkOut) {
            alert('Mohon perbaiki tanggal yang Anda masukkan.');
            return;
        }
        // Lakukan pencarian kamar
        alert(`Mencari kamar dari ${checkIn} sampai ${checkOut} (${stayDuration} malam)`);
    };


    const formBgClass = isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-white';

    return (
        <div id="main-search" className="sticky top-20 md:top-24 z-40 w-full">
            <div className="container mx-auto px-4">
                <div className={`${formBgClass} rounded-2xl shadow-xl p-6 md:p-8 transform -translate-y-1/2`}>

                    <form onSubmit={handleSearch} >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                            <div className="col-span-1">
                                <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                <input
                                    type="date"
                                    id="check-in"
                                    value={checkIn}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setCheckIn(e.target.value);
                                        if (e.target.value > checkOut && checkOut) {
                                            setCheckOut('');
                                        }
                                    }}
                                    min={minDate}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                <input
                                    type="date"
                                    id="check-out"
                                    value={checkOut}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckOut(e.target.value)}
                                    min={minCheckOutDate}
                                    disabled={!checkIn}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 disabled:bg-gray-200"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lama Menginap</label>
                                <div className="w-full px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">
                                    {stayDuration} {stayDuration === 1 ? 'malam' : 'malam'}
                                </div>
                            </div>
                            <div className="col-span-1">
                                <button
                                    type="submit"
                                    className="w-full bg-teal-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-teal-800 transition-colors"
                                >
                                    Cari Kamar
                                </button>
                            </div>
                        </div>
                    </form>
                    {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}

                </div>
            </div>
        </div >
    )
}