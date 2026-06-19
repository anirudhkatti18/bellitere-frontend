//Movie Catalog Grid
"use client";
import MovieCard from "@/components/MovieCard";

import { mockCatalog } from "@/lib/catalog";

export default function BrowsePage() {
    return (
        <main className="min-h-screen bg-[#08080c] text-white pt-24 pb-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            ಪ್ರೀಮಿಯಂ <span className="text-amber-500">ಕ್ಯಾಟಲಾಗ್</span>
                        </h1>
                        <p className="text-neutral-400 mt-2 text-lg">
                            ನಿಮ್ಮ 48 ಗಂಟೆಗಳ ವೀಕ್ಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ಒಂದು ಚಲನಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.
                        </p>
                    </div>

                    {/* Quick Filter/Sort Mockup */}
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-neutral-500">ಹೀಗೆ ವಿಂಗಡಿಸಿ:</span>
                        <select className="bg-neutral-900 border border-neutral-800 text-white px-3 py-1.5 rounded-lg outline-none focus:border-amber-500">
                            <option>ಇತ್ತೀಚಿನ ಚಿತ್ರಗಳು</option>
                            <option>ಅತ್ಯಂತ ಜನಪ್ರಿಯ</option>
                            <option>ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚಿಗೆ</option>
                        </select>
                    </div>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {mockCatalog.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

            </div>
        </main>
    );
}
