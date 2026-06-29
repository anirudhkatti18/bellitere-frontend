"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import { useLanguage } from "@/context/LanguageContext";

import { mockCatalog } from "@/lib/catalog";

// Bilingual content translation object for movies-only digital theatre
const content = {
    en: {
        hero: {
            playBtn: "▶ Play Movie",
            listBtn: "＋ Watchlist",
        },
        categories: {
            trailers: "Exclusive Trailers",
            trending: "Top Content Today",
            newReleases: "Trending Movies",
            classics: "Top Rated Movies",
            comedy: "Blockbuster Hits"
        }
    },
    kn: {
        hero: {
            playBtn: "▶ ಪ್ಲೇ ಮಾಡಿ",
            listBtn: "＋ ವೀಕ್ಷಣಾ ಪಟ್ಟಿ",
        },
        categories: {
            trailers: "ವಿಶೇಷ ಟ್ರೇಲರ್‌ಗಳು",
            trending: "ಇಂದು ಟಾಪ್ 10",
            newReleases: "ಟ್ರೆಂಡಿಂಗ್ ಚಲನಚಿತ್ರಗಳು",
            classics: "ಟಾಪ್ ರೇಟೆಡ್ ಚಿತ್ರಗಳು",
            comedy: "ಬ್ಲಾಕ್‌ಬಸ್ಟರ್ ಹಿಟ್‌ಗಳು"
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
        }, 9000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#08080c] text-white selection:bg-zinc-500/30 relative overflow-hidden pb-16">
            {/* Ambient Radial Glowing Accents */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-zinc-300/[0.03] blur-[150px] pointer-events-none z-0" />
            <div className="absolute top-[20%] left-[-15vw] w-[50vw] h-[50vw] rounded-full bg-zinc-400/[0.02] blur-[120px] pointer-events-none z-0" />

            {/* Split Showcase Hero Section */}
            <header className="relative w-full z-10 pt-28 pb-12">
                <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[55vh]">
                    
                    {/* Left Column: Movie Details Pane (Less prominent) */}
                    <div className="md:col-span-5 flex flex-col gap-3.5 text-left order-last md:order-first">
                        {/* Rating and tags */}
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-black uppercase tracking-widest">
                            <span className="text-zinc-100 bg-white/10 px-2 py-0.5 rounded border border-white/10">★ {activeMovie.rating}</span>
                            <span>•</span>
                            <span>{activeMovie.genre}</span>
                            <span>•</span>
                            <span>{activeMovie.year}</span>
                            <span>•</span>
                            <span>{activeMovie.duration}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl">
                            {lang === "kn" && activeMovie.kannadaTitle ? activeMovie.kannadaTitle : activeMovie.title}
                        </h1>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed max-w-md line-clamp-3">
                            {activeMovie.description}
                        </p>

                        {/* CTAs */}
                        <div className="flex items-center gap-3 mt-2">
                            <Link
                                href={`/movies/${activeMovie.id}`}
                                className="flex items-center justify-center gap-2 bg-chrome text-black px-5 py-2 rounded-lg font-black hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_15px_rgba(226,232,240,0.25)] text-xs uppercase cursor-pointer"
                            >
                                {t.hero.playBtn}
                            </Link>
                            <Link
                                href={`/movies/${activeMovie.id}`}
                                className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/15 transition-all text-xs uppercase cursor-pointer"
                            >
                                {t.hero.listBtn}
                            </Link>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex gap-2.5 mt-4">
                            {heroMovies.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-1.5 h-1.5 rotate-45 transition-all duration-300 ${
                                        index === currentSlide ? "bg-zinc-300 scale-125 shadow-[0_0_8px_white]" : "bg-white/20 hover:bg-white/40"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Large Landscape Widescreen Frame (Dominant Element) */}
                    <div className="md:col-span-7 flex justify-center items-center order-first md:order-last w-full">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-400/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group/hero transition-all duration-500 hover:scale-[1.02]">
                            {/* Widescreen Landscape Poster Still */}
                            <img 
                                src={activeMovie.poster} 
                                alt={activeMovie.title} 
                                className="w-full h-full object-cover z-0"
                            />
                            {/* Glass shine and shadow overlays */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
                        </div>
                    </div>

                </div>
            </header>

            {/* Promotional Billboard */}
            <section className="w-full bg-gradient-to-r from-black via-neutral-950 to-black border-y border-white/5 py-8 px-6 text-center relative overflow-hidden z-20 my-4">
                <div className="max-w-4xl mx-auto flex flex-col gap-1.5 relative z-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-zinc-400 via-slate-200 to-zinc-500 bg-clip-text text-transparent uppercase tracking-tight">
                        ಕನ್ನಡದ ಪ್ರಥಮ ಡಿಜಿಟಲ್ ಥಿಯೇಟರ್ ಮತ್ತು ಕನ್ನಡ ಮನರಂಜನಾ ವೇದಿಕೆ
                    </h2>
                    <p className="text-[10px] sm:text-xs text-neutral-400 font-bold uppercase tracking-[0.2em]">
                        Kannada's First Digital Theatre & Kannada Entertainment Platform
                    </p>
                </div>
            </section>

            {/* High Density Movie-Only Categories */}
            <main className="relative z-20 bg-transparent -mt-2">
                <div className="max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col gap-10 md:gap-14">
                    {/* Top Content Row: Translucent ranking watermarks layout */}
                    <CarouselRow 
                        title={t.categories.trending} 
                        items={mockCatalog.slice(0, 5)} 
                        showRank={true} 
                        isLandscape={true}
                    />
                    
                    {/* Standard High-Density Rows */}
                    <CarouselRow title={t.categories.trailers} items={mockCatalog} isLandscape={true} />
                    <CarouselRow title={t.categories.newReleases} items={mockCatalog.slice(5, 10)} isLandscape={true} />
                    <CarouselRow title={t.categories.classics} items={mockCatalog.slice(1, 6)} isLandscape={true} />
                    <CarouselRow title={t.categories.comedy} items={mockCatalog.slice(3, 8)} isLandscape={true} />
                </div>
            </main>
        </div>
    );
}

// Custom Carousel Row Component supporting layout shifts
function CarouselRow({ title, items, isLandscape = true, showRank = false }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full flex flex-col gap-3 group">
            {/* Row Title */}
            <div className="flex justify-between items-end mb-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase">
                    {title}
                </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/85 text-white p-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -ml-3 backdrop-blur-md border border-white/5 cursor-pointer"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/85 text-white p-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -mr-3 backdrop-blur-md border border-white/5 cursor-pointer"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Scrollable grid strip */}
            <div
                ref={scrollRef}
                className="flex overflow-x-scroll scrollbar-hide gap-1.5 px-2 md:px-0 pb-6 pt-2 -mt-2"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {items.map((movie, index) => {
                    if (showRank) {
                        return (
                            <div 
                                key={`rank-${title}-${movie.id}`} 
                                className={`shrink-0 flex items-center relative pl-8 select-none ${
                                    isLandscape 
                                        ? "w-[240px] sm:w-[290px] md:w-[360px] lg:w-[420px]" 
                                        : "w-[170px] sm:w-[210px] md:w-[270px] lg:w-[310px]"
                                }`}
                                style={{ scrollSnapAlign: "start" }}
                            >
                                {/* Giant stylized translucent watermark rank number */}
                                <div className="absolute left-0 bottom-[-30px] sm:bottom-[-40px] z-0 text-[160px] sm:text-[200px] md:text-[240px] font-black text-white/5 select-none leading-none pointer-events-none tracking-tighter">
                                    {index + 1}
                                </div>
                                {/* Poster card overlapping on top of the number's right side */}
                                <div className={`ml-auto relative z-10 ${
                                    isLandscape 
                                        ? "w-[180px] sm:w-[220px] md:w-[270px] lg:w-[320px]" 
                                        : "w-[110px] sm:w-[140px] md:w-[185px] lg:w-[220px]"
                                }`}>
                                    <MovieCard movie={movie} isLandscape={isLandscape} />
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div 
                            key={`row-${title}-${movie.id}`} 
                            className={`shrink-0 transition-all duration-300 ${
                                isLandscape 
                                    ? "w-[200px] sm:w-[240px] md:w-[320px] lg:w-[380px]" 
                                    : "w-[120px] sm:w-[140px] md:w-[170px] lg:w-[210px]"
                            }`} 
                            style={{ scrollSnapAlign: "start" }}
                        >
                            <MovieCard movie={movie} isLandscape={isLandscape} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}