"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

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
            <nav
                className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
                    isScrolled
                        ? "bg-[#050505]/75 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/50"
                        : "bg-gradient-to-b from-black/90 via-black/40 to-transparent border-b border-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    {/* Brand Logo Link */}
                    <Link href="/" className="flex items-center gap-2 group transition-transform duration-300 active:scale-95">
                        <div className="relative h-10 w-36 md:h-12 md:w-44 flex items-center justify-center">
                            <Image
                                src="/Bellitere.png"
                                alt="Bellitere"
                                fill
                                sizes="(max-width: 768px) 144px, 176px"
                                className="object-contain filter brightness-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-[1.02]"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex gap-8 items-center">
                        <Link
                            href="/browse"
                            className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors duration-200 relative group py-1"
                        >
                            Catalog
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/#pricing"
                            className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors duration-200 relative group py-1"
                        >
                            Rentals
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/#faq"
                            className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors duration-200 relative group py-1"
                        >
                            FAQ
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 transition-all duration-300 group-hover:w-full"></span>
                        </Link>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-gradient-to-r from-neutral-200 via-white to-neutral-300 hover:from-white hover:via-neutral-100 hover:to-neutral-200 text-black px-6 py-2 rounded-sm text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu & Sign In Controls */}
                    <div className="flex md:hidden gap-3 items-center">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-gradient-to-r from-neutral-200 to-neutral-100 hover:from-white hover:to-neutral-200 text-black px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all border border-white/20 shadow-md cursor-pointer"
                        >
                            Sign In
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white hover:text-neutral-300 p-1.5 focus:outline-none transition-colors"
                            aria-label="Toggle Mobile Menu"
                        >
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 py-6 px-8 flex flex-col gap-5 animate-fade-in md:hidden">
                        <Link
                            href="/browse"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors"
                        >
                            Browse Catalog
                        </Link>
                        <Link
                            href="/#pricing"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors"
                        >
                            Rentals & Pricing
                        </Link>
                        <Link
                            href="/#faq"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors"
                        >
                            Frequently Asked Questions
                        </Link>
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
                            <div className="relative h-8 w-24 mb-6">
                                <Image
                                    src="/Bellitere.png"
                                    alt="Bellitere"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-white tracking-wide mb-1">
                                {step === 1 ? "Welcome Back" : "Security Verification"}
                            </h2>
                            <p className="text-xs text-neutral-400 mb-6">
                                {step === 1
                                    ? "Enter your mobile number to sign in or create an account instantly."
                                    : `Enter the 6-digit confirmation code sent to +91 ${phone}`}
                            </p>

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
        </>
    );
}