"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import MovieCard from "./MovieCard";

import { mockCatalog } from "@/lib/catalog";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const { lang, setLang } = useLanguage();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMovies = searchQuery.trim() !== ""
        ? mockCatalog.filter(m =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (m.kannadaTitle && m.kannadaTitle.includes(searchQuery))
        )
        : [];

    // Monitor scroll to handle transparent-to-opaque navbar transition
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on mount to capture initial state
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (phone.trim().length >= 10) {
            setStep(2); // Move to OTP input screen
        } else {
            alert("Please enter a valid 10-digit mobile number.");
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            alert("Authentication Successful! Session token generated.");
            setIsOpen(false);
            setStep(1);
            setPhone("");
            setOtp("");
        } else {
            alert("Please enter the 6-digit OTP code.");
        }
    };

    return (
        <>
            {/* Global Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5 py-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
                    {/* Brand Logo Link (Far Left) */}
                    <Link href="/" className="relative z-50 flex-shrink-0 cursor-pointer">
                        <Image
                            src="/Bellitere.png"
                            alt="Bellitere"
                            width={240}
                            height={80}
                            className="object-contain w-auto h-12 sm:h-14 lg:h-16 -my-4 hover:scale-105 transition-transform duration-300 drop-shadow-md"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation & Controls (Right Aligned) */}
                    <div className="hidden md:flex items-center gap-5">
                        <div className="flex items-center gap-6 mr-2">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-sm font-bold tracking-wide text-neutral-300 hover:text-white transition-colors duration-200 py-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                Home
                            </Link>
                            <Link
                                href="/browse"
                                className="flex items-center gap-2 text-sm font-bold tracking-wide text-neutral-300 hover:text-white transition-colors duration-200 py-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                API
                            </Link>
                            <Link
                                href="/browse"
                                className="flex items-center gap-2 text-sm font-bold tracking-wide text-neutral-300 hover:text-white transition-colors duration-200 py-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                Browse
                            </Link>
                        </div>

                        {/* Search Icon */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-neutral-300 hover:text-white transition-colors p-1 hover:scale-110 transform"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Language Toggle */}
                        <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-0.5 shadow-sm">
                            <button
                                onClick={() => setLang("kn")}
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${lang === "kn"
                                    ? "bg-white text-black shadow-md"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                ಕನ್ನಡ
                            </button>
                            <button
                                onClick={() => setLang("en")}
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${lang === "en"
                                    ? "bg-white text-black shadow-md"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-white hover:bg-neutral-200 text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu Controls */}
                    <div className="flex md:hidden gap-3 items-center">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-neutral-300 hover:text-white transition-colors p-1"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-white text-black px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white hover:text-neutral-300 p-1.5 focus:outline-none transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 py-6 px-8 flex flex-col gap-5 animate-fade-in md:hidden">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/browse" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors">
                            Catalog
                        </Link>
                        <Link href="/browse" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors">
                            Browse
                        </Link>
                        {/* Mobile Language Toggle */}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-medium text-neutral-500">Language:</span>
                            <button onClick={() => setLang("kn")} className={`px-2 py-1 rounded text-xs font-bold ${lang === "kn" ? "text-white" : "text-neutral-500"}`}>ಕನ್ನಡ</button>
                            <span className="text-neutral-700">|</span>
                            <button onClick={() => setLang("en")} className={`px-2 py-1 rounded text-xs font-bold ${lang === "en" ? "text-white" : "text-neutral-500"}`}>English</button>
                        </div>
                    </div>
                )}
            </nav>

            {/* OTP Login Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300">
                    <div
                        className="bg-[#050505]/95 border border-white/10 rounded-sm w-full max-w-md p-6 sm:p-8 relative shadow-2xl shadow-white/5 animate-scale-up overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative Gradient Background inside Card */}
                        <div className="absolute -top-20 -left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-neutral-900/40 rounded-full blur-2xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setStep(1);
                                setPhone("");
                                setOtp("");
                            }}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-sm flex items-center justify-center bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700"
                        >
                            ✕
                        </button>

                        <div className="relative z-10">
                            {/* Logo inside modal */}
                            <div className="flex items-center justify-center mb-6">
                                <Image
                                    src="/Bellitere.png"
                                    alt="Bellitere"
                                    width={300}
                                    height={100}
                                    className="object-contain w-auto h-12"
                                />
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                                    {step === 1 ? "Welcome Back" : "Verify Number"}
                                </h2>
                                <p className="text-sm text-neutral-400 mt-2 font-medium">
                                    {step === 1
                                        ? "Enter your mobile number to sign in or create an account."
                                        : `We sent a 6-digit code to +91 ${phone}`}
                                </p>
                            </div>

                            {step === 1 ? (
                                <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-semibold text-sm">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            placeholder="Mobile Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                            className="w-full bg-neutral-900/80 border border-neutral-800 rounded-sm pl-14 pr-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white focus:border-white/80 transition-all font-medium placeholder-neutral-600"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-neutral-200 via-white to-neutral-300 hover:from-white hover:to-neutral-200 active:scale-98 text-black font-extrabold py-3 rounded-sm transition-all duration-200 text-sm tracking-wider uppercase cursor-pointer shadow-lg shadow-white/10"
                                    >
                                        Send Verification Code
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleVerify} className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        placeholder="••••••"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                        className="w-full bg-neutral-900/80 border border-neutral-800 rounded-sm px-4 py-3 text-white tracking-[0.6em] text-center font-mono focus:outline-none focus:ring-1 focus:ring-white focus:border-white/80 transition-all text-lg"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-neutral-200 via-white to-neutral-300 hover:from-white hover:to-neutral-200 text-black font-extrabold py-3 rounded-sm transition-all duration-200 text-sm tracking-wider uppercase cursor-pointer shadow-lg shadow-white/10"
                                    >
                                        Verify & Sign In
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs text-neutral-400 hover:text-white font-semibold tracking-wide transition-colors mt-2 text-center underline"
                                    >
                                        Edit Phone Number
                                    </button>
                                </form>
                            )}

                            <p className="text-[10px] text-neutral-500 mt-6 leading-relaxed text-center">
                                By signing in, you agree to our Terms of Service. Standard messaging and data rates may apply.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center pt-24 px-6 md:px-12 transition-all">
                    <button
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                        className="absolute top-8 right-8 text-neutral-500 hover:text-white text-3xl font-light transition-colors"
                    >
                        ✕
                    </button>

                    <div className="w-full max-w-4xl flex flex-col gap-12">
                        {/* Search Input */}
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search movies, genres, or actors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-4xl md:text-6xl font-black tracking-tighter text-white placeholder-neutral-700 outline-none border-b-2 border-white/10 focus:border-white pb-4 transition-colors rounded-none"
                        />

                        {/* Search Results */}
                        <div className="w-full">
                            {searchQuery.trim() !== "" ? (
                                filteredMovies.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
                                        {filteredMovies.map(movie => (
                                            <div key={`search-${movie.id}`} onClick={() => setIsSearchOpen(false)}>
                                                <MovieCard movie={movie} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-neutral-500 text-lg font-bold tracking-widest uppercase">No results found.</p>
                                )
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
