//Global navigation bar
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");

    const handleSendOTP = (e) => {
        e.preventDefault();
        setStep(2); // Move to OTP input screen
    };

    const handleVerify = (e) => {
        e.preventDefault();
        // Simulate successful login for the prototype
        alert("Authentication Successful! Session token generated.");
        setIsOpen(false);
        setStep(1);
        setPhone("");
    };

    return (
        <>
            {/* Global Navigation Bar */}
            <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-black tracking-widest text-amber-500">
                        BELLITERE
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/browse" className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors">
                            Catalog
                        </Link>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* OTP Login Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl shadow-amber-500/5">

                        <button
                            onClick={() => { setIsOpen(false); setStep(1); }}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            {step === 1 ? "Welcome Back" : "Verify Number"}
                        </h2>
                        <p className="text-sm text-neutral-400 mb-6">
                            {step === 1 ? "Enter your mobile number to sign in or create an account." : `We sent a 6-digit code to ${phone}`}
                        </p>

                        {step === 1 ? (
                            <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                                <input
                                    type="tel"
                                    required
                                    placeholder="+91 Mobile Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                                />
                                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-colors">
                                    Send OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerify} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    placeholder="000000"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white tracking-[1em] text-center font-mono focus:outline-none focus:border-amber-500"
                                />
                                <button type="submit" className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-3 rounded-lg transition-colors">
                                    Verify & Sign In
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}