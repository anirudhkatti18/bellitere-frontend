"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function WatchPage() {
    const params = useParams();
    const id = params?.id || 1;
    const [isControlsVisible, setIsControlsVisible] = useState(true);

    // Handle mouse movement to show/hide controls
    const handleMouseMove = () => {
        setIsControlsVisible(true);
    };

    useEffect(() => {
        let timeoutId;
        if (isControlsVisible) {
            timeoutId = setTimeout(() => {
                setIsControlsVisible(false);
            }, 3000);
        }
        return () => clearTimeout(timeoutId);
    }, [isControlsVisible]);

    return (
        <main 
            className="fixed inset-0 z-50 w-screen h-screen bg-black flex items-center justify-center overflow-hidden cursor-default"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsControlsVisible(false)}
        >
            {/* Sleek Back Button */}
            <div className={`absolute top-0 left-0 w-full p-6 md:p-12 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 z-50 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Link 
                    href={`/movies/${id}`}
                    className="inline-flex items-center gap-3 text-neutral-300 hover:text-white font-extrabold text-xs tracking-widest uppercase transition-colors drop-shadow-md"
                >
                    <span className="text-xl leading-none -mt-0.5">←</span> Back to Details
                </Link>
            </div>

            {/* Simulated Mux/HLS Player Container */}
            <div className="relative w-full h-full md:w-[95vw] md:h-[95vh] bg-[#050505] flex items-center justify-center border border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)]">
                
                {/* HTML5 Video Simulation Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                    <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <span className="text-white/50 text-[10px] font-mono uppercase tracking-[0.4em]">HLS Stream Encrypted</span>
                </div>

                {/* Anti-Piracy Watermark Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-10">
                    <div className="transform -rotate-12 select-none opacity-[0.04]">
                        <div className="flex flex-col items-center justify-center gap-24">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <p key={`row-${i}`} className="text-white text-3xl md:text-5xl font-black tracking-widest whitespace-nowrap">
                                    +91 98765 43210 <span className="mx-8 text-neutral-600">|</span> CONFIDENTIAL <span className="mx-8 text-neutral-600">|</span> +91 98765 43210 <span className="mx-8 text-neutral-600">|</span> CONFIDENTIAL
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Simulated Player Controls (Bottom) */}
                <div className={`absolute bottom-0 left-0 w-full p-6 md:px-12 md:py-8 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-500 z-50 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/20 mb-6 cursor-pointer relative group">
                        <div className="absolute top-0 left-0 h-full w-1/3 bg-white" />
                        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <button className="text-white hover:text-neutral-300 transition-colors">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                            </button>
                            <button className="text-white hover:text-neutral-300 transition-colors">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                            </button>
                            <span className="text-neutral-300 text-xs font-semibold tracking-wider font-mono">42:15 <span className="text-neutral-500">/ 2:30:00</span></span>
                        </div>
                        <div className="flex items-center gap-8">
                            <button className="text-white hover:text-neutral-300 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </button>
                            <button className="text-white hover:text-neutral-300 transition-colors">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}