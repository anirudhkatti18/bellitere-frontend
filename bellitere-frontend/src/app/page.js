"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import { useLanguage } from "@/context/LanguageContext";

// Mock Database of Kannada Films with extra details for carousels
const mockCatalog = [
    {
        id: 1,
        title: "Kantara",
        kannadaTitle: "ಕಾಂತಾರ",
        description: "A fiery local deity clashes with a forestry officer in a coastal village.",
        price: "150.00",
        genre: "Coastal Folklore",
        rating: "U/A 16+",
        duration: "2h 30m"
    },
    {
        id: 2,
        title: "KGF: Chapter 2",
        kannadaTitle: "ಕೆ.ಜಿ.ಎಫ್: ಅಧ್ಯಾಯ 2",
        description: "The blood-soaked land of Kolar Gold Fields has a new overlord.",
        price: "200.00",
        genre: "Action Thriller",
        rating: "U/A 16+",
        duration: "2h 48m"
    },
    {
        id: 3,
        title: "Sapta Sagaradaache Ello",
        kannadaTitle: "ಸಪ್ತ ಸಾಗರದಾಚೆ ಎಲ್ಲೋ",
        description: "A poetic love story of Manu and Priya that traverses dreams and prison bars.",
        price: "120.00",
        genre: "Romantic Drama",
        rating: "U/A 13+",
        duration: "2h 22m"
    },
    {
        id: 4,
        title: "Lucia",
        kannadaTitle: "ಲೂಸಿಯಾ",
        description: "An usher at a theater experiences a blurring of reality and dreams.",
        price: "120.00",
        genre: "Psychological Sci-Fi",
        rating: "U/A 13+",
        duration: "2h 15m"
    },
    {
        id: 5,
        title: "Charlie 777",
        kannadaTitle: "ಚಾರ್ಲಿ 777",
        description: "An emotional journey of a lonely factory worker and a stray dog.",
        price: "150.00",
        genre: "Adventure Drama",
        rating: "U",
        duration: "2h 44m"
    },
    {
        id: 6,
        title: "Ulidavaru Kandanthe",
        kannadaTitle: "ಉಳಿದವರು ಕಂಡಂತೆ",
        description: "A journalist pieces together the truth behind a murder during a coastal festival.",
        price: "99.00",
        genre: "Neo-Noir Crime",
        rating: "U/A 13+",
        duration: "2h 34m"
    },
    {
        id: 7,
        title: "Garuda Gamana V V",
        kannadaTitle: "ಗರುಡ ಗಮನ ವೃಷಭ ವಾಹನ",
        description: "Two childhood friends rise to power in the underworld of Mangaluru.",
        price: "150.00",
        genre: "Gangster Drama",
        rating: "A",
        duration: "2h 31m"
    },
    {
        id: 8,
        title: "Rangitaranga",
        kannadaTitle: "ರಂಗಿತರಂಗ",
        description: "A novelist investigates mysterious occurrences in his ancestral village.",
        price: "100.00",
        genre: "Mystery Thriller",
        rating: "U/A 13+",
        duration: "2h 29m"
    },
    {
        id: 9,
        title: "Sarkari Hi. Pra. Shaale",
        kannadaTitle: "ಸರ್ಕಾರಿ ಹಿ. ಪ್ರಾ. ಶಾಲೆ",
        description: "A nostalgic comedy drama set in a school near Kasaragod border.",
        price: "99.00",
        genre: "Nostalgic Comedy",
        rating: "U",
        duration: "2h 20m"
    },
    {
        id: 10,
        title: "Kirik Party",
        kannadaTitle: "ಕಿರಿಕ್ ಪಾರ್ಟಿ",
        description: "A fun-filled college romance and life-defining moments of Karna and gang.",
        price: "120.00",
        genre: "College Comedy",
        rating: "U",
        duration: "2h 45m"
    }
];

// Bilingual content translation object
const content = {
    en: {
        hero: {
            title: "KANTARA",
            kannadaTitle: "ಕಾಂತಾರ",
            tagline: "A Legend of Sacred Groves and Divine Justice",
            description: "A fiery local rebel clashes with a strict forest officer in a coastal hamlet. When ancient spirits and tribal folklore intersect with human greed, a mystical battle for survival begins.",
            rentBtn: "▶ Rent • ₹150",
            trailerBtn: "ⓘ More Info",
        },
        categories: {
            trending: "Trending Now",
            newReleases: "New Releases",
            classics: "Critically Acclaimed",
        },
        footer: {
            rights: "© 2026 Bellitere. All rights reserved.",
        }
    },
    kn: {
        hero: {
            title: "ಕಾಂತಾರ",
            kannadaTitle: "Kantara",
            tagline: "ಪವಿತ್ರ ಕಾಡುಗಳು ಮತ್ತು ದೈವಿಕ ನ್ಯಾಯದ ದಂತಕಥೆ",
            description: "ಕರಾವಳಿಯ ಒಂದು ಸಣ್ಣ ಹಳ್ಳಿಯಲ್ಲಿ ಸ್ಥಳೀಯ ಬಂಡಾಯಗಾರ ಮತ್ತು ಕಟ್ಟುನಿಟ್ಟಾದ ಅರಣ್ಯ ಅಧಿಕಾರಿಯ ನಡುವೆ ಘರ್ಷಣೆ ನಡೆಯುತ್ತದೆ. ಪುರಾತನ ಶಕ್ತಿಗಳು ಮತ್ತು ಬುಡಕಟ್ಟು ಜಾನಪದಗಳು ಮಾನವನ ದುರಾಶೆಯೊಂದಿಗೆ ಸಂಧಿಸಿದಾಗ, ಉಳಿವಿಗಾಗಿ ನಿಗೂಢ ಯುದ್ಧ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
            rentBtn: "▶ ಬಾಡಿಗೆ • ₹150",
            trailerBtn: "ⓘ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ",
        },
        categories: {
            trending: "ಈಗ ಪ್ರಚಲಿತದಲ್ಲಿರುವ ಚಿತ್ರಗಳು",
            newReleases: "ಹೊಸ ಬಿಡುಗಡೆಗಳು",
            classics: "ವಿಮರ್ಶಕರ ಮೆಚ್ಚುಗೆ",
        },
        footer: {
            rights: "© 2026 ಬೆಳ್ಳಿತೆರೆ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
        }
    }
};

// Reusable Scrolling Carousel Row Component
const CarouselRow = ({ title, movies, isLandscape = false }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = direction === "left"
                ? scrollLeft - clientWidth * 0.75
                : scrollLeft + clientWidth * 0.75;
            rowRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative group/row my-6">
            {/* Header Line with title and far-right navigation controls */}
            <div className="flex justify-between items-center mb-4 px-6 md:px-12">
                <div className="flex items-center">
                    <span className="w-1 h-5 bg-white mr-2 inline-block"></span>
                    <h2 className="text-sm md:text-base font-extrabold uppercase tracking-widest text-neutral-200 group-hover/row:text-white transition-colors duration-200">
                        {title}
                    </h2>
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => scroll("left")}
                        className="w-7 h-7 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white flex items-center justify-center text-xs transition-colors duration-250 cursor-pointer"
                        aria-label="Scroll Left"
                    >
                        ❮
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-7 h-7 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white flex items-center justify-center text-xs transition-colors duration-250 cursor-pointer"
                        aria-label="Scroll Right"
                    >
                        ❯
                    </button>
                </div>
            </div>

            <div className="relative px-6 md:px-12">
                {/* Horizontal Scrolling Area */}
                <div
                    ref={rowRef}
                    className="flex gap-2 overflow-x-auto scrollbar-hide py-4 px-2 -mx-2 scroll-smooth"
                >
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className={`flex-shrink-0 transition-transform duration-300 ${
                                isLandscape
                                    ? "w-[240px] sm:w-[300px] md:w-[350px]"
                                    : "w-[150px] sm:w-[180px] md:w-[210px]"
                            }`}
                        >
                            <MovieCard movie={movie} isLandscape={isLandscape} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function LandingPage() {
    const { lang } = useLanguage();
    const [trailerOpen, setTrailerOpen] = useState(false);

    const t = content[lang];

    // Filtered data lists for categorizing the rows
    const trendingMovies = mockCatalog.slice(0, 5);
    const coastalMovies = [mockCatalog[0], mockCatalog[5], mockCatalog[6], mockCatalog[7], mockCatalog[2]];
    const classicMovies = [mockCatalog[3], mockCatalog[8], mockCatalog[9], mockCatalog[4], mockCatalog[2]];

    return (
        <main className="relative min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
            
            {/* Cinematic Full-Screen Hero Backdrop Section */}
            <section className="relative w-full h-[80vh] flex flex-col justify-end bg-black">
                {/* Background Image Container */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <Image
                        src="/hero-bg.png"
                        alt="Kantara Background"
                        fill
                        priority
                        className="object-cover object-center scale-105 filter brightness-[0.75] saturate-[0.8]"
                    />
                    {/* Dark Vignette Overlays - heavy directional left-to-right black gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent z-1" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent z-1" />
                </div>

                {/* Volumetric Radial Glow for Silver Screen Effect */}
                <div className="absolute top-[30%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-white/5 blur-[120px] pointer-events-none z-1" />

                {/* Hero Content Area - aligned bottom-left */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16 flex flex-col items-start gap-4 md:gap-5">
                    {/* Movie Title */}
                    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 animate-fade-in">
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white font-sans drop-shadow-lg leading-none">
                            {t.hero.title}
                        </h1>
                        <span className="text-neutral-400 text-lg md:text-2xl font-medium tracking-wide pb-1">
                            ({t.hero.kannadaTitle})
                        </span>
                    </div>

                    {/* Tagline */}
                    <p className="bg-gradient-to-r from-neutral-100 via-neutral-305 to-neutral-500 bg-clip-text text-transparent text-sm md:text-base font-extrabold tracking-wider uppercase drop-shadow">
                        {t.hero.tagline}
                    </p>

                    {/* Movie Description */}
                    <p className="text-neutral-300 text-xs md:text-sm max-w-xl leading-relaxed drop-shadow-md">
                        {t.hero.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 items-center text-[10px] md:text-xs font-semibold text-neutral-400">
                        <span className="border border-neutral-800 px-1.5 py-0.5 rounded text-[9px] text-neutral-300">
                            U/A 16+
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-800" />
                        <span>2h 30m</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-800" />
                        <span className="text-neutral-350 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">Dolby Atmos</span>
                    </div>

                    {/* Hero Action Buttons - Sharp Edge OTT Style */}
                    <div className="flex gap-3 mt-2">
                        <Link href="/movies/1">
                            <button className="bg-white hover:bg-neutral-200 text-black font-extrabold px-6 py-2 rounded-sm text-xs md:text-sm transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                                {t.hero.rentBtn}
                            </button>
                        </Link>
                        <button
                            onClick={() => setTrailerOpen(true)}
                            className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-2 rounded-sm border border-white/10 backdrop-blur-md text-xs md:text-sm transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                            {t.hero.trailerBtn}
                        </button>
                    </div>
                </div>
            </section>

            {/* Movie Category Scrolling Sections Container */}
            <section className="relative z-10 bg-[#050505] py-4 flex flex-col gap-2">
                <CarouselRow title={t.categories.trending} movies={trendingMovies} isLandscape={true} />
                <CarouselRow title={t.categories.newReleases} movies={coastalMovies} isLandscape={false} />
                <CarouselRow title={t.categories.classics} movies={classicMovies} isLandscape={false} />
            </section>

            {/* Premium Investor Guardrail & Platform Footer */}
            <footer className="relative z-10 border-t border-white/5 bg-[#020202]/70 backdrop-blur-xl px-6 md:px-12 py-10">
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center justify-center">
                        <Image
                            src="/Bellitere.png"
                            alt="Bellitere"
                            width={300}
                            height={300}
                            className="object-contain w-24 sm:w-32 h-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                    <p className="text-neutral-500 text-xs mt-2">
                        {t.footer.rights}
                    </p>
                </div>
            </footer>

            {/* Video Trailer Overlay Modal */}
            {trailerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                    <div
                        className="bg-[#050505]/95 border border-white/10 rounded-sm w-full max-w-4xl p-2 relative shadow-2xl shadow-white/5 animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setTrailerOpen(false)}
                            className="absolute -top-12 right-0 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-bold flex items-center gap-1.5"
                        >
                            ✕ Close
                        </button>
                        
                        {/* 16:9 Aspect Video Container */}
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                            <iframe
                                className="absolute inset-0 w-full h-full border-none"
                                src="https://www.youtube.com/embed/8Fip7y1RyH0?autoplay=1"
                                title="Kantara Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}