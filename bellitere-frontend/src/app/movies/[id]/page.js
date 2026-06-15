"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

// Simulated catalog data
const mockMovie = {
    id: 1,
    title: "Kantara",
    kannadaTitle: "ಕಾಂತಾರ",
    year: "2022",
    duration: "2h 30m",
    rating: "U/A 16+",
    genre: "Action Thriller",
    description: "A fiery local rebel clashes with a strict forest officer in a coastal hamlet. When ancient spirits and tribal folklore intersect with human greed, a mystical battle for survival begins. Experience the legend of sacred groves and divine justice.",
    price: "150.00",
    poster: "/kantaratrailer.jpg", // Using a known image placeholder
    heroBg: "/hero-bg.png"
};

export default function MovieDetail() {
    const router = useRouter();
    const { lang } = useLanguage();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, success
    const [isPurchased, setIsPurchased] = useState(false);

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
                router.push(`/watch/${mockMovie.id}`);
            }, 1500);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col">

            {/* The Cinematic Hero Section */}
            <section className="relative w-full h-[70vh] flex flex-col justify-end bg-black">
                {/* Background Image Container */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <Image
                        src={mockMovie.heroBg}
                        alt={mockMovie.title}
                        fill
                        priority
                        className="object-cover object-center scale-105 filter brightness-[0.5] saturate-[0.8]"
                    />
                    {/* Heavy Gradient Mask blending into the page background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-1" />
                </div>
            </section>

            {/* The Content Grid (Below the fold) */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 -mt-32 md:-mt-48 pb-24 w-full flex flex-col md:flex-row gap-8 md:gap-16">

                {/* Left Column (Action) */}
                <div className="flex flex-col w-full md:w-1/3 max-w-[320px] shrink-0">
                    <div className="w-full aspect-[2/3] relative rounded-sm overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10 bg-neutral-900 mb-6">
                        <Image
                            src={mockMovie.heroBg} // using heroBg as poster for simulation
                            alt={mockMovie.title}
                            fill
                            className="object-cover object-center"
                        />
                    </div>

                    {!isPurchased ? (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleRentClick}
                                className="w-full bg-white hover:bg-neutral-200 text-black font-extrabold px-6 py-4 rounded-sm text-sm transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg uppercase tracking-wider"
                            >
                                Rent for 48 Hours • ₹{mockMovie.price}
                            </button>
                            <button className="w-full bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-4 rounded-sm border border-white/20 backdrop-blur-md text-sm transition-all duration-300 transform active:scale-95 cursor-pointer uppercase tracking-wider">
                                Watch Trailer
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white/5 border border-white/10 p-5 rounded-sm">
                            <p className="text-emerald-400 font-bold text-sm tracking-wider uppercase mb-1">Rental Active</p>
                            <p className="text-neutral-400 text-xs">48 hours remaining</p>
                            <button className="w-full mt-5 bg-white hover:bg-neutral-200 text-black font-extrabold px-6 py-3 rounded-sm text-sm transition-all duration-300 transform active:scale-95 cursor-pointer uppercase tracking-wider">
                                ▶ Play Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column (Information) */}
                <div className="flex flex-col w-full md:w-2/3 pt-4 md:pt-12">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-lg leading-none mb-6">
                        {lang === "kn" ? mockMovie.kannadaTitle : mockMovie.title}
                    </h1>

                    <div className="flex items-center text-xs md:text-sm font-semibold tracking-widest text-neutral-400 uppercase mb-10 flex-wrap gap-y-2">
                        <span>{mockMovie.year}</span>
                        <span className="mx-3 text-neutral-600">|</span>
                        <span>{mockMovie.duration}</span>
                        <span className="mx-3 text-neutral-600">|</span>
                        <span className="border border-neutral-700 px-1.5 py-0.5 rounded-sm text-[10px] md:text-xs text-neutral-300">{mockMovie.rating}</span>
                        <span className="mx-3 text-neutral-600">|</span>
                        <span>{mockMovie.genre}</span>
                    </div>

                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl font-medium tracking-wide">
                        {mockMovie.description}
                    </p>
                </div>
            </section>

            {/* The Razorpay Simulation Modal */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300">
                    <div
                        className="bg-[#050505]/95 border border-white/10 rounded-sm w-full max-w-md p-8 relative shadow-2xl shadow-white/5 flex flex-col items-center text-center animate-scale-up overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative background glow inside modal */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-white/5 rounded-full blur-[60px] pointer-events-none" />

                        {paymentStatus === "idle" && (
                            <>
                                <button
                                    onClick={() => setIsCheckoutOpen(false)}
                                    className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center text-xl font-light"
                                >
                                    ✕
                                </button>

                                <h2 className="text-xl font-bold tracking-wide mb-2 uppercase text-white relative z-10">Complete Purchase</h2>
                                <p className="text-neutral-400 text-sm mb-8 relative z-10">Scan QR Code or pay with UPI to unlock <strong className="text-white">{mockMovie.title}</strong></p>

                                {/* Mock QR Code Box */}
                                <div className="w-48 h-48 border border-white/20 bg-white/5 flex items-center justify-center mb-8 rounded-sm relative z-10">
                                    <div className="w-40 h-40 bg-white/10 flex items-center justify-center">
                                        <span className="text-neutral-500 text-xs uppercase tracking-widest font-bold">MOCK QR</span>
                                    </div>
                                </div>

                                <button
                                    onClick={processPayment}
                                    className="w-full bg-gradient-to-r from-neutral-200 via-white to-neutral-300 hover:from-white hover:to-neutral-200 text-black font-extrabold px-6 py-4 rounded-sm text-sm transition-all duration-300 transform active:scale-95 cursor-pointer uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10"
                                >
                                    Simulate Payment
                                </button>
                            </>
                        )}

                        {paymentStatus === "processing" && (
                            <div className="py-12 flex flex-col items-center relative z-10">
                                <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-6" />
                                <h2 className="text-lg font-bold tracking-wide uppercase text-neutral-200">Processing Payment...</h2>
                                <p className="text-neutral-500 text-xs mt-3 uppercase tracking-wider">Please do not close this window</p>
                            </div>
                        )}

                        {paymentStatus === "success" && (
                            <div className="py-12 flex flex-col items-center relative z-10">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-in">
                                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold tracking-wide uppercase text-white">Payment Successful!</h2>
                                <p className="text-neutral-400 text-sm mt-3 uppercase tracking-wider animate-pulse">Redirecting to Player...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}