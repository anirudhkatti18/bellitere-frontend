"use client";

import { useRef, useState, useEffect } from "react";
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
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroMovies = mockCatalog.slice(0, 5);
    const activeMovie = heroMovies[currentSlide];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 5);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#08080c] text-white selection:bg-blue-500/30">
            {/* The Immersive Homepage Hero Carousel */}
            <header className="w-full bg-[#08080c] pt-24 pb-16 px-6 md:px-16 flex items-center justify-center min-h-[70vh] mb-8">
                <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column (The Text & Actions Zone) */}
                    <div className="flex flex-col gap-4 text-left justify-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tighter drop-shadow-2xl mb-2">
                            {activeMovie.title}
                        </h1>

                        <div className="flex items-center gap-3 text-gray-300 font-bold mb-2 text-sm md:text-base drop-shadow-md">
                            <span className="text-blue-400">★ {activeMovie.rating}</span>
                            <span>•</span>
                            <span>{activeMovie.year}</span>
                            <span>•</span>
                            <span>{activeMovie.duration}</span>
                            <span>•</span>
                            <span>{activeMovie.genre}</span>
                        </div>

                        <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed mb-4 drop-shadow-md max-w-xl line-clamp-3">
                            {activeMovie.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href={`/movies/${activeMovie.id}`}
                                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                ▶ ಪ್ಲೇ
                            </Link>
                            <Link
                                href={`/movies/${activeMovie.id}`}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-8 py-3 hover:bg-white/20 transition-all font-bold cursor-pointer"
                            >
                                ⓘ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (The Uncropped Poster Zone) */}
                    <div className="flex justify-center md:justify-end items-center h-full max-h-[500px] relative w-full md:pr-4 order-first md:order-last">
                        {heroMovies.map((movie, index) => (
                            <img 
                                key={movie.id}
                                src={movie.poster} 
                                alt={movie.title} 
                                className={`rounded-xl shadow-2xl border border-white/10 h-[280px] sm:h-[350px] md:h-[450px] w-auto mx-auto object-contain transition-all duration-1000 ease-in-out ${
                                    index === currentSlide ? "opacity-100 scale-100 relative" : "opacity-0 scale-95 absolute pointer-events-none"
                                }`}
                            />
                        ))}
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
        </div>
    );
}

// Carousel Component with colored accent line
function CarouselRow({ title, items }) {
    const scrollRef = useRef(null);

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
                className="flex overflow-x-scroll scrollbar-hide gap-4 px-4 md:px-0 pb-8 pt-4 -mt-4"
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