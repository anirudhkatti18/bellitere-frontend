//High-conversion Landing Page (SSG) 
"use client";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
    const [lang, setLang] = useState("kn"); // Default to Kannada ('kn' or 'en') [cite: 149]

    // Dynamic content dictionary for investor presentation mapping
    const content = {
        en: {
            badge: "STREAMING EXCLUSIVELY ON BELLITERE",
            title: "The Ultimate Destination for Kannada Cinema",
            subtitle: "Experience premium storytelling. Rent individual cinematic blockbusters with seamless digital access for 48 hours.",
            cta: "Browse Movies",
            investorNote: "Pay-Per-View MVP Architecture Powered by Next.js & Java Spring Boot",
        },
        kn: {
            badge: "ಬೆಳ್ಳಿತೆರೆಯಲ್ಲಿ ಮಾತ್ರ ಪ್ರಸಾರವಾಗುತ್ತಿದೆ",
            title: "ಕನ್ನಡ ಚಿತ್ರರಂಗದ ಅಂತಿಮ ತಾಣ",
            subtitle: "ಪ್ರೀಮಿಯಂ ಕಥೆಗಳನ್ನು ಅನುಭವಿಸಿ. 48 ಗಂಟೆಗಳ ತಡೆರಹಿತ ವೀಕ್ಷಣೆಗಾಗಿ ವೈಯಕ್ತಿಕ ಬ್ಲಾಕ್‌ಬಸ್ಟರ್ ಚಲನಚಿತ್ರಗಳನ್ನು ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ.",
            cta: "ಚಲನಚಿತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
            investorNote: "ಪೇ-ಪರ್-ವ್ಯೂ MVP ಆರ್ಕಿಟೆಕ್ಚರ್ (Next.js ಮತ್ತು ಜಾವಾ ಸ್ಪ್ರಿಂಗ್ ಬೂಟ್ ಆಧಾರಿತ)",
        },
    };

    const t = content[lang];

    return (
        <main className="relative min-h-screen bg-neutral-950 text-white flex flex-col justify-between overflow-hidden">
            {/* Background Gradient Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

            {/* Top Navbar Layer */}
            <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center">
                <div className="text-2xl font-black tracking-wider text-amber-500 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    BELLITERE
                </div>

                {/* Language Selection Toggle Switch [cite: 149] */}
                <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-1 shadow-inner">
                    <button
                        onClick={() => setLang("kn")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${lang === "kn" ? "bg-amber-500 text-neutral-950 shadow" : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        ಕನ್ನಡ
                    </button>
                    <button
                        onClick={() => setLang("en")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${lang === "en" ? "bg-amber-500 text-neutral-950 shadow" : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        English
                    </button>
                </div>
            </header>

            {/* Hero Body Content Area */}
            <section className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto py-12 flex flex-col items-center space-y-6">
                <span className="text-amber-500 text-xs font-bold tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase animate-fade-in">
                    {t.badge}
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl">
                    {t.title}
                </h1>

                <p className="text-neutral-400 text-base md:text-xl max-w-2xl leading-relaxed">
                    {t.subtitle}
                </p>

                <div className="pt-4">
                    <Link href="/browse">
                        <button className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-lg shadow-lg shadow-amber-500/10">
                            {t.cta}
                        </button>
                    </Link>
                </div>
            </section>

            {/* Technical Investor Guardrail Footer Footer */}
            <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950/50 backdrop-blur px-6 py-4 text-center">
                <p className="text-xs font-mono text-neutral-500 tracking-wide">
                    🛡️ {t.investorNote}
                </p>
            </footer>
        </main>
    );
}