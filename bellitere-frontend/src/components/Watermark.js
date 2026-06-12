//Phase 1 moving overlay for piracy deterrence

"use client";
import { useEffect, useState } from "react";

export default function Watermark({ userPhone }) {
    const [position, setPosition] = useState({ top: "20%", left: "20%" });

    useEffect(() => {
        // Moves the watermark to a random screen sector every 15 seconds to deter screen recording
        const interval = setInterval(() => {
            const randomTop = Math.floor(Math.random() * 70) + 10; // Stays between 10% and 80%
            const randomLeft = Math.floor(Math.random() * 70) + 10;
            setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute pointer-events-none select-none text-white/20 font-mono text-sm sm:text-base z-50 transition-all duration-1000 ease-in-out font-bold tracking-widest bg-black/10 px-2 py-1 rounded"
            style={{
                top: position.top,
                left: position.left,
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            }}
        >
            {userPhone} | CONFIDENTIAL
        </div>
    );
}