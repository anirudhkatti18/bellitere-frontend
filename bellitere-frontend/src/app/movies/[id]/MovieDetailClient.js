"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import MovieCard from "@/components/MovieCard";
import { getMovieById, getRecommendations } from "@/lib/catalog";

export default function MovieDetail() {
    const router = useRouter();
    const params = useParams();
    const { lang } = useLanguage();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, success
    const [isPurchased, setIsPurchased] = useState(false);

    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
        }
    };

    const movieId = params?.id ? Number(params.id) : 1;
    const movie = getMovieById(movieId) || getMovieById(1);

    // Fallback cast/actors pool if not defined in catalog
    const movieActors = movie.actors || [
        { id: 1, name: "Rishab Shetty", role: "Shiva", img: "https://i.pravatar.cc/150?u=rishab" },
        { id: 2, name: "Sapthami Gowda", role: "Leela", img: "https://i.pravatar.cc/150?u=sapthami" },
        { id: 3, name: "Kishore", role: "Murali", img: "https://i.pravatar.cc/150?u=kishore" },
        { id: 4, name: "Achyuth Kumar", role: "Devendra Sutooru", img: "https://i.pravatar.cc/150?u=achyuth" },
    ];

    const movieRecommendations = getRecommendations(movie.id);

    const handleRentClick = () => {
        setIsCheckoutOpen(true);
        setPaymentStatus("idle");
    };

    const processPayment = () => {
        setPaymentStatus("processing");
        setTimeout(() => {
            setPaymentStatus("success");
            setTimeout(() => {
                setIsPurchased(true);
                setIsCheckoutOpen(false);
                router.push(`/watch/${movie.id}`);
            }, 1500);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-[#08080c] text-white pt-20 md:pt-28">
            {/* The Immersive Hero Section */}
            <section className="relative w-full h-[85vh] min-h-[600px] bg-[#08080c] overflow-hidden">
                {/* Background Media */}
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted={isMuted}
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
                    src={movie.trailerUrl}
                />
                
                {/* Subtle dark overlay masking box to ensure legibility */}
                <div className="absolute inset-0 z-0 bg-black/40" />

                {/* Dual Gradients for Text Legibility & Fade Out */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#08080c] via-[#08080c]/70 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent" />

                {/* Mute/Unmute Floating Button */}
                <button 
                    onClick={toggleMute}
                    className="absolute top-24 right-6 md:right-12 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full border border-white/10 backdrop-blur-md transition-all hover:scale-110 flex items-center justify-center cursor-pointer shadow-lg"
                    aria-label={isMuted ? "Unmute trailer" : "Mute trailer"}
                >
                    {isMuted ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    )}
                </button>

                {/* The Overlay Content (Left-Aligned) */}
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 justify-end items-start md:items-end h-full pb-20 px-8 lg:px-16 max-w-5xl">
                    <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-32 sm:w-40 md:w-48 rounded-lg shadow-2xl border border-white/10 shrink-0" 
                    />
                    <div className="flex flex-col">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter drop-shadow-2xl">
                            {lang === "kn" ? movie.kannadaTitle : movie.title}
                        </h1>
                        
                        <div className="flex items-center gap-3 text-gray-300 font-medium mb-6 text-sm md:text-base drop-shadow-md">
                            <span className="text-zinc-300 font-bold">★ {movie.rating}</span>
                            <span>•</span>
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.duration}</span>
                            <span>•</span>
                            <span>{movie.genre}</span>
                        </div>

                        <p className="max-w-2xl text-base md:text-lg text-gray-200 mb-8 leading-relaxed animate-fade-in drop-shadow-md">
                            {movie.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            {!isPurchased ? (
                                <button 
                                    onClick={handleRentClick}
                                    className="flex items-center gap-2 bg-chrome text-black px-8 py-3 rounded-lg font-extrabold hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(226,232,240,0.3)] glow-chrome"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    Rent • ₹{movie.price}
                                </button>
                            ) : (
                                <button 
                                    onClick={() => router.push(`/watch/${movie.id}`)}
                                    className="flex items-center gap-2 bg-chrome text-black px-8 py-3 rounded-lg font-extrabold hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(226,232,240,0.3)] glow-chrome"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    ಪ್ಲೇ ಮಾಡಿ
                                </button>
                            )}

                            <button className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-zinc-400/30 text-white rounded-lg px-5 py-3 hover:border-zinc-300 hover:bg-white/10 transition-all cursor-pointer font-medium">
                                <span className="text-xl leading-none">+</span>
                                <span className="hidden sm:inline">ವೀಕ್ಷಣಾ ಪಟ್ಟಿ</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Below the Fold Content */}
            <section className="px-8 lg:px-16 pb-24 space-y-16 -mt-8 relative z-20">
                {/* Actors Section */}
                <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-white tracking-wide border-l-4 border-zinc-400 pl-3 uppercase">
                        ಕಲಾವಿದರು
                    </h2>
                    <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
                        {movieActors.map(actor => (
                            <div key={actor.id} className="flex-shrink-0 flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg pr-4 pl-3 py-2 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm">
                                <img src={actor.img} alt={actor.name} className="w-12 h-12 rounded-md object-cover border border-white/20" />
                                <div className="flex flex-col justify-center">
                                    <span className="text-sm font-bold text-white leading-tight">{actor.name}</span>
                                    <span className="text-xs text-gray-400 font-medium">{actor.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* You may like Section */}
                <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-white tracking-wide border-l-4 border-zinc-400 pl-3 uppercase">
                        ನೀವು ಇಷ್ಟಪಡಬಹುದು
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {movieRecommendations.map(recMovie => (
                            <MovieCard key={`rec-${recMovie.id}`} movie={recMovie} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Simulated Razorpay Checkout Modal (Unchanged) */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="bg-neutral-900 border border-white/10 rounded-xl w-full max-w-md p-6 relative shadow-2xl overflow-hidden text-center">
                        {paymentStatus === "idle" && (
                            <>
                                <h3 className="text-xl font-bold text-white mb-4">ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿ / Complete Payment</h3>
                                <div className="bg-black/50 p-4 rounded-lg mb-6 border border-white/5">
                                    <p className="text-neutral-400 mb-2">ಅಂಶ / Item</p>
                                    <p className="text-white font-semibold text-lg">{movie.title} - 48h Rental</p>
                                    <div className="w-full h-px bg-white/10 my-4"></div>
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span>ಒಟ್ಟು / Total</span>
                                        <span>₹{movie.price}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={processPayment}
                                    className="w-full bg-chrome text-black font-extrabold py-3 rounded-sm transition-all uppercase tracking-widest shadow-lg hover:opacity-90 shadow-zinc-400/20"
                                >
                                    ರೇಜರ್‌ಪೇ ಮೂಲಕ ಪಾವತಿಸಿ / Pay via Razorpay
                                </button>
                                <button 
                                    onClick={() => setIsCheckoutOpen(false)}
                                    className="mt-4 text-neutral-500 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest"
                                >
                                    ರದ್ದುಗೊಳಿಸಿ / Cancel
                                </button>
                            </>
                        )}
                        
                        {paymentStatus === "processing" && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="w-12 h-12 border-4 border-white/20 border-t-zinc-400 rounded-full animate-spin mb-6"></div>
                                <h3 className="text-lg font-bold text-white tracking-widest uppercase">ಪಾವತಿ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ / Processing Payment</h3>
                                <p className="text-neutral-400 text-sm mt-2">ದಯವಿಟ್ಟು ಈ ವಿಂಡೋವನ್ನು ಮುಚ್ಚಬೇಡಿ. / Please do not close this window.</p>
                            </div>
                        )}

                        {paymentStatus === "success" && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-2">ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ! / Payment Successful!</h3>
                                <p className="text-emerald-400 text-sm font-medium">ಬಾಡಿಗೆ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. ಪ್ಲೇಯರ್ ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ... / Rental activated. Starting player...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
