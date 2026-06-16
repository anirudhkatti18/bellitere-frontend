"use client";

import MovieCard from "@/components/MovieCard";

// Mock Active Rentals
const mockRentals = [
    { id: 1, title: "Kantara", kannadaTitle: "ಕಾಂತಾರ", expiresIn: "42h" },
    { id: 3, title: "Sapta Sagaradaache Ello", kannadaTitle: "ಸಪ್ತ ಸಾಗರದಾಚೆ ಎಲ್ಲೋ", expiresIn: "12h" }
];

// Mock Watchlist
const mockWatchlist = [
    { id: 4, title: "Lucia", kannadaTitle: "ಲೂಸಿಯಾ", price: "120.00" },
    { id: 5, title: "Charlie 777", kannadaTitle: "ಚಾರ್ಲಿ 777", price: "150.00" },
    { id: 7, title: "Mufti", kannadaTitle: "ಮಫ್ತಿ", price: "110.00" },
    { id: 8, title: "Tagaru", kannadaTitle: "ಟಗರು", price: "130.00" },
    { id: 9, title: "Dia", kannadaTitle: "ದಿಯಾ", price: "99.00" }
];

export default function RentalsPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* Active Rentals Section */}
                <section>
                    <div className="flex items-center mb-8">
                        <span className="w-1 h-8 bg-white mr-4 inline-block shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">My Rentals</h1>
                    </div>

                    {mockRentals.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {mockRentals.map(movie => (
                                <div key={`rental-${movie.id}`}>
                                    <MovieCard movie={movie} expiresIn={movie.expiresIn} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/5 border border-white/10 p-12 rounded-sm text-center">
                            <p className="text-neutral-500 font-bold uppercase tracking-widest">No Active Rentals</p>
                        </div>
                    )}
                </section>

                {/* Watchlist Section */}
                <section>
                    <div className="flex items-center mb-8">
                        <span className="w-1 h-6 bg-neutral-600 mr-4 inline-block"></span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-300 uppercase">Saved for Later</h2>
                    </div>

                    <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
                        <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
                            {mockWatchlist.map(movie => (
                                <div key={`watchlist-${movie.id}`} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0">
                                    <MovieCard movie={movie} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
