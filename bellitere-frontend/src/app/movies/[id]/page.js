"use client";

import { useState } from "react";
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
        <main className="min-h-screen bg-[#050505] text-white">
            {/* The Immersive Hero Section */}
            <section className="relative w-full h-[85vh] min-h-[600px] bg-[#050505] overflow-hidden">
                {/* Background Media */}
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover z-0 animate-pulse-slow scale-105"
                    src={movie.trailer}
                />
                
                {/* Dual Gradients for Text Legibility & Fade Out */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                {/* The Overlay Content (Left-Aligned) */}
                <div className="relative z-10 flex flex-col justify-end h-full pb-20 px-8 lg:px-16 max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter drop-shadow-2xl">
                        {lang === "kn" ? movie.kannadaTitle : movie.title}
                    </h1>
                    
                    <div className="flex items-center gap-3 text-gray-300 font-medium mb-6 text-sm md:text-base drop-shadow-md">
                        <span className="text-blue-400 font-bold">★ {movie.rating}</span>
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
                    <div className="flex flex-wrap items-center gap-4">
                        {!isPurchased ? (
                            <button 
                                onClick={handleRentClick}
                                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                Rent • ₹{movie.price}
                            </button>
                        ) : (
                            <button 
                                onClick={() => router.push(`/watch/${movie.id}`)}
                                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                Play Now
                            </button>
                        )}

                        <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-3 hover:bg-white/20 transition-all cursor-pointer font-medium">
                            <span className="text-xl leading-none">+</span>
                            <span className="hidden sm:inline">Watchlist</span>
                        </button>
                        <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-3 hover:bg-white/20 transition-all cursor-pointer font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            <span className="hidden sm:inline">Download</span>
                        </button>
                        <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-3 hover:bg-white/20 transition-all cursor-pointer font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                            <span className="hidden sm:inline">Similars</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Below the Fold Content */}
            <section className="px-8 lg:px-16 pb-24 space-y-16 -mt-8 relative z-20">
                {/* Actors Section */}
                <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-white tracking-wide border-l-4 border-blue-500 pl-3 uppercase">
                        Actors
                    </h2>
                    <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
                        {movieActors.map(actor => (
                            <div key={actor.id} className="flex-shrink-0 flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pr-6 pl-1.5 py-1.5 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm">
                                <img src={actor.img} alt={actor.name} className="w-12 h-12 rounded-full object-cover border border-white/20" />
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
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-white tracking-wide border-l-4 border-blue-500 pl-3 uppercase">
                        You may like
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
                                <h3 className="text-xl font-bold text-white mb-4">Complete Payment</h3>
                                <div className="bg-black/50 p-4 rounded-lg mb-6 border border-white/5">
                                    <p className="text-neutral-400 mb-2">Item</p>
                                    <p className="text-white font-semibold text-lg">{movie.title} - 48h Rental</p>
                                    <div className="w-full h-px bg-white/10 my-4"></div>
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span>Total</span>
                                        <span>₹{movie.price}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={processPayment}
                                    className="w-full bg-[#3399cc] hover:bg-[#2b88b7] text-white font-bold py-3 rounded-sm transition-colors uppercase tracking-widest shadow-lg shadow-[#3399cc]/20"
                                >
                                    Pay via Razorpay
                                </button>
                                <button 
                                    onClick={() => setIsCheckoutOpen(false)}
                                    className="mt-4 text-neutral-500 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        
                        {paymentStatus === "processing" && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="w-12 h-12 border-4 border-white/20 border-t-[#3399cc] rounded-full animate-spin mb-6"></div>
                                <h3 className="text-lg font-bold text-white tracking-widest uppercase">Processing Payment</h3>
                                <p className="text-neutral-400 text-sm mt-2">Please do not close this window.</p>
                            </div>
                        )}

                        {paymentStatus === "success" && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-2">Payment Successful!</h3>
                                <p className="text-emerald-400 text-sm font-medium">Rental activated. Starting player...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}