"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import { useLanguage } from "@/context/LanguageContext";

import { mockCatalog } from "@/lib/catalog";

// Bilingual content translation object
const content = {
    en: {
        hero: {
            title: "KANTARA",
            kannadaTitle: "ಕಾಂತಾರ",
            tagline: "A Legend of Sacred Groves and Divine Justice",
            description: "A fiery local rebel clashes with a strict forest officer in a coastal hamlet. When ancient spirits and tribal folklore intersect with human greed, a mystical battle for survival begins.",
            playBtn: "▶ Play",
            moreBtn: "ⓘ See More",
        },
        categories: {
            trending: "Top 10 Today",
            newReleases: "Trending Today",
            classics: "Top rated",
            comedy: "Comedy"
        },
        footer: {
            rights: "Bellitere.\nThis site does not store any files on our server, we only link to media hosted on 3rd party services.\ncontact@bellitere.com",
        }
    },
    kn: {
        hero: {
            title: "ಕಾಂತಾರ",
            kannadaTitle: "Kantara",
            tagline: "ಪವಿತ್ರ ಕಾಡುಗಳು ಮತ್ತು ದೈವಿಕ ನ್ಯಾಯದ ದಂತಕಥೆ",
            description: "ಕರಾವಳಿಯ ಒಂದು ಸಣ್ಣ ಹಳ್ಳಿಯಲ್ಲಿ ಸ್ಥಳೀಯ ಬಂಡಾಯಗಾರ ಮತ್ತು ಕಟ್ಟುನಿಟ್ಟಾದ ಅರಣ್ಯ ಅಧಿಕಾರಿಯ ನಡುವೆ ಘರ್ಷಣೆ ನಡೆಯುತ್ತದೆ. ಪುರಾತನ ಶಕ್ತಿಗಳು ಮತ್ತು ಬುಡಕಟ್ಟು ಜಾನಪದಗಳು ಮಾನವನ ದುರಾಶೆಯೊಂದಿಗೆ ಸಂಧಿಸಿದಾಗ, ಉಳಿವಿಗಾಗಿ ನಿಗೂಢ ಯುದ್ಧ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
            playBtn: "▶ ಪ್ಲೇ",
            moreBtn: "ⓘ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ",
        },
        categories: {
            trending: "ಇಂದು ಟಾಪ್ 10",
            newReleases: "ಇಂದು ಟ್ರೆಂಡಿಂಗ್",
            classics: "ಟಾಪ್ ರೇಟೆಡ್",
            comedy: "ಕಾಮಿಡಿ"
        },
        footer: {
            rights: "ಬೆಳ್ಳಿತ್ತೆರೆ.\nಈ ಸೈಟ್ ನಮ್ಮ ಸರ್ವರ್‌ನಲ್ಲಿ ಯಾವುದೇ ಫೈಲ್‌ಗಳನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ, ನಾವು 3ನೇ ವ್ಯಕ್ತಿಯ ಸೇವೆಗಳಲ್ಲಿ ಹೋಸ್ಟ್ ಮಾಡಲಾದ ಮಾಧ್ಯಮಕ್ಕೆ ಮಾತ್ರ ಲಿಂಕ್ ಮಾಡುತ್ತೇವೆ.\ncontact@bellitere.com",
        }
    }
};

export default function Home() {
    const { lang } = useLanguage();
    const t = content[lang];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
            {/* The Immersive Homepage Hero */}
            <header className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-[#0a0a0a]">
                {/* Simulated Video/Image Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <img 
                        src="/bellitere-frontend/hero-bg.png" 
                        alt="Hero Background" 
                        className="w-full h-full object-cover object-top scale-105 animate-[pulse_10s_ease-in-out_infinite] opacity-80"
                    />
                    {/* Aggressive Gradients for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-16">
                    <div className="max-w-2xl animate-fade-in-up">
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl mb-4">
                            {t.hero.title}
                        </h1>

                        <div className="flex items-center gap-3 text-gray-300 font-bold mb-6 text-sm md:text-base drop-shadow-md">
                            <span className="text-blue-400">★ 8.6</span>
                            <span>•</span>
                            <span>2022</span>
                            <span>•</span>
                            <span>2h 30m</span>
                            <span>•</span>
                            <span>Action Thriller</span>
                        </div>

                        <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-8 drop-shadow-md max-w-xl line-clamp-3">
                            {t.hero.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href={`/movies/1`}
                                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                {t.hero.playBtn}
                            </Link>
                            <Link
                                href={`/movies/1`}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-8 py-3 hover:bg-white/20 transition-all font-bold cursor-pointer"
                            >
                                {t.hero.moreBtn}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Catalog Sections */}
            <main className="relative z-20 pb-24 -mt-16 bg-transparent">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16">
                    <CarouselRow title={t.categories.trending} items={mockCatalog.slice(0, 5)} />
                    <CarouselRow title={t.categories.newReleases} items={mockCatalog.slice(5, 10)} isLandscape={true} />
                    <CarouselRow title={t.categories.classics} items={mockCatalog.slice(1, 6)} isLandscape={true} />
                    <CarouselRow title={t.categories.comedy} items={mockCatalog.slice(3, 8)} isLandscape={true} />
                </div>
            </main>

            {/* Global Footer */}
            <footer className="w-full border-t border-white/5 py-12 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-start items-start gap-4">
                    <div className="flex items-center gap-2 opacity-90">
                        <Image src="/bellitere-frontend/Bellitere.png" alt="Bellitere" width={160} height={50} className="object-contain w-auto h-8 -my-2" />
                    </div>
                    <p className="text-xs font-medium text-neutral-500 whitespace-pre-line leading-relaxed">
                        {t.footer.rights}
                    </p>
                </div>
            </footer>
        </div>
    );
}

// Carousel Component with colored accent line and Movies/Series toggle
function CarouselRow({ title, items }) {
    const scrollRef = useRef(null);
    const [activeTab, setActiveTab] = useState("Movies");

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full flex flex-col gap-4 group">
            {/* Header Area */}
            <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
                    <h2 className="text-lg md:text-2xl font-bold tracking-tight text-white/90">
                        {title}
                    </h2>
                </div>
                
                {/* Right-Side Text Toggles */}
                <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <button 
                        onClick={() => setActiveTab("Movies")}
                        className={`transition-colors hover:text-white ${activeTab === "Movies" ? "text-white border-b-2 border-blue-500 pb-1" : ""}`}
                    >
                        Movies
                    </button>
                    <button 
                        onClick={() => setActiveTab("Series")}
                        className={`transition-colors hover:text-white ${activeTab === "Series" ? "text-white border-b-2 border-blue-500 pb-1" : ""}`}
                    >
                        Series
                    </button>
                </div>
            </div>

            {/* Scroll Controls (Hidden on Mobile) */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -ml-4 backdrop-blur-md"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -mr-4 backdrop-blur-md"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Horizontally Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 md:gap-6 hide-scrollbar pb-8 pt-4 -mt-4 px-1"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {items.map((movie) => (
                    <div key={`row-${title}-${movie.id}`} className="shrink-0 w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px]" style={{ scrollSnapAlign: "start" }}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </section>
    );
}