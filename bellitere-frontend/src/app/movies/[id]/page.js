//Film Details (SSR) with "Watch Now" / Razorpay barrier

"use client";
import { useState } from "react";
import Watermark from "@/components/Watermark";

// Mock data representing a catalog response from your PostgreSQL/Java setup [cite: 153]
const mockMovie = {
    id: 1,
    title: "Master Kannada Film",
    description: "An incredible cinematic experience curated for global Kannada cinema lovers.",
    price: "100.00",
    poster: "/poster-placeholder.jpg",
};

export default function MovieDetail() {
    const [isPurchased, setIsPurchased] = useState(false);
    const [userPhone] = useState("+91 98765 43210"); // Simulated logged-in user session

    const handlePaymentSimulation = () => {
        // This will hook directly into the Razorpay checkout script in our next step
        alert("Triggering Razorpay payment overlay...");
        setIsPurchased(true);
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24 md:pt-32 pb-12 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">

                {/* Left Side: Video Player Container */}
                <div className="relative aspect-video w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 flex items-center justify-center">
                    {isPurchased ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-black relative">
                            {/* Dynamic Anti-Piracy Watermark  */}
                            <Watermark userPhone={userPhone} />

                            <div className="text-center z-10">
                                <p className="text-emerald-400 font-medium animate-pulse">🔒 Signed Stream Active (HLS Chunk Loading)</p>
                                <p className="text-xs text-neutral-400 mt-2">Simulating Mux Player Instance [cite: 119]</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-4">
                            <p className="text-neutral-400">Unlock this title to begin viewing</p>
                        </div>
                    )}
                </div>

                {/* Right Side: Metadata & Purchase Triggers */}
                <div className="flex flex-col space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">{mockMovie.title}</h1>
                    <p className="text-neutral-400 text-lg leading-relaxed">{mockMovie.description}</p>

                    <div className="pt-4">
                        {!isPurchased ? (
                            <button
                                onClick={handlePaymentSimulation}
                                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-8 py-4 rounded-lg transition-colors text-lg"
                            >
                                Rent for 48 Hours • ₹{mockMovie.price}
                            </button>
                        ) : (
                            <div className="bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg text-sm">
                                🎉 Rental Confirmed! You have 48 hours remaining to watch this title[cite: 140].
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}