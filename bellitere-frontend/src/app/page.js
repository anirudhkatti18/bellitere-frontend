"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";

// Mock Database of Kannada Films with extra details for carousels
const mockCatalog = [
    {
        id: 1,
        title: "Kantara",
        kannadaTitle: "ಕಾಂತಾರ",
        description: "A fiery local deity clashes with a forestry officer in a coastal village.",
        price: "150.00",
        genre: "Coastal Folklore",
        rating: "U/A 16+",
        duration: "2h 30m"
    },
    {
        id: 2,
        title: "KGF: Chapter 2",
        kannadaTitle: "ಕೆ.ಜಿ.ಎಫ್: ಅಧ್ಯಾಯ 2",
        description: "The blood-soaked land of Kolar Gold Fields has a new overlord.",
        price: "200.00",
        genre: "Action Thriller",
        rating: "U/A 16+",
        duration: "2h 48m"
    },
    {
        id: 3,
        title: "Sapta Sagaradaache Ello",
        kannadaTitle: "ಸಪ್ತ ಸಾಗರದಾಚೆ ಎಲ್ಲೋ",
        description: "A poetic love story of Manu and Priya that traverses dreams and prison bars.",
        price: "120.00",
        genre: "Romantic Drama",
        rating: "U/A 13+",
        duration: "2h 22m"
    },
    {
        id: 4,
        title: "Lucia",
        kannadaTitle: "ಲೂಸಿಯಾ",
        description: "An usher at a theater experiences a blurring of reality and dreams.",
        price: "120.00",
        genre: "Psychological Sci-Fi",
        rating: "U/A 13+",
        duration: "2h 15m"
    },
    {
        id: 5,
        title: "Charlie 777",
        kannadaTitle: "ಚಾರ್ಲಿ 777",
        description: "An emotional journey of a lonely factory worker and a stray dog.",
        price: "150.00",
        genre: "Adventure Drama",
        rating: "U",
        duration: "2h 44m"
    },
    {
        id: 6,
        title: "Ulidavaru Kandanthe",
        kannadaTitle: "ಉಳಿದವರು ಕಂಡಂತೆ",
        description: "A journalist pieces together the truth behind a murder during a coastal festival.",
        price: "99.00",
        genre: "Neo-Noir Crime",
        rating: "U/A 13+",
        duration: "2h 34m"
    },
    {
        id: 7,
        title: "Garuda Gamana V V",
        kannadaTitle: "ಗರುಡ ಗಮನ ವೃಷಭ ವಾಹನ",
        description: "Two childhood friends rise to power in the underworld of Mangaluru.",
        price: "150.00",
        genre: "Gangster Drama",
        rating: "A",
        duration: "2h 31m"
    },
    {
        id: 8,
        title: "Rangitaranga",
        kannadaTitle: "ರಂಗಿತರಂಗ",
        description: "A novelist investigates mysterious occurrences in his ancestral village.",
        price: "100.00",
        genre: "Mystery Thriller",
        rating: "U/A 13+",
        duration: "2h 29m"
    },
    {
        id: 9,
        title: "Sarkari Hi. Pra. Shaale",
        kannadaTitle: "ಸರ್ಕಾರಿ ಹಿ. ಪ್ರಾ. ಶಾಲೆ",
        description: "A nostalgic comedy drama set in a school near Kasaragod border.",
        price: "99.00",
        genre: "Nostalgic Comedy",
        rating: "U",
        duration: "2h 20m"
    },
    {
        id: 10,
        title: "Kirik Party",
        kannadaTitle: "ಕಿರಿಕ್ ಪಾರ್ಟಿ",
        description: "A fun-filled college romance and life-defining moments of Karna and gang.",
        price: "120.00",
        genre: "College Comedy",
        rating: "U",
        duration: "2h 45m"
    }
];

// Bilingual content translation object
const content = {
    en: {
        hero: {
            badge: "STREAMING EXCLUSIVELY ON BELLITERE",
            title: "KANTARA",
            kannadaTitle: "ಕಾಂತಾರ",
            tagline: "A Legend of Sacred Groves and Divine Justice",
            description: "A fiery local rebel clashes with a strict forest officer in a coastal hamlet. When ancient spirits and tribal folklore intersect with human greed, a mystical battle for survival begins.",
            metadata: "U/A 16+ • 2h 30m • Coastal Folklore & Action • Dolby Atmos",
            rentBtn: "Rent Movie • ₹150",
            trailerBtn: "Watch Trailer",
        },
        categories: {
            trending: "Trending Now",
            coastal: "Coastal Thrillers",
            classics: "Critically Acclaimed",
        },
        features: {
            badge: "THE BELLITERE EXPERIENCE",
            title: "Cinematic Quality, On Demand.",
            subtitle: "Bellitere delivers a state-of-the-art streaming experience tailormade for high-definition home theater setups.",
            cards: [
                {
                    title: "Ultra 4K HDR Visuals",
                    desc: "Experience native 4K resolutions with vibrant colors, high contrast levels, and rich details in every frame."
                },
                {
                    title: "Dolby Atmos Audio",
                    desc: "Feel the vibrations and ambient soundscapes of the coastal forest with immersive multichannel sound spatialization."
                },
                {
                    title: "48-Hour Rental Window",
                    desc: "Once you start watching, enjoy unlimited replays for 48 hours. No subscription chains, just pay for what you watch."
                },
                {
                    title: "Anti-Piracy Watermarking",
                    desc: "Every stream features a secure, dynamic digital watermark of your phone number, supporting and protecting our local creators."
                }
            ]
        },
        howItWorks: {
            badge: "TRANSACTIONAL VIDEO-ON-DEMAND (TVOD)",
            title: "How Bellitere Works",
            subtitle: "No monthly commitments or recurring credit card charges. Pay only for the movies you actually want to watch.",
            steps: [
                {
                    num: "01",
                    title: "Choose Your Film",
                    desc: "Explore our curated catalog of premium Kannada titles, from coastal thrillers to college romances."
                },
                {
                    num: "02",
                    title: "Secure Purchase",
                    desc: "Pay a one-off rental fee securely using credit cards, UPI, or net banking via our integrated Razorpay checkout."
                },
                {
                    num: "03",
                    title: "Enjoy for 48 Hours",
                    desc: "Play on any device. Your 48-hour viewing window starts only when you first hit play. Watch as many times as you like."
                }
            ]
        },
        faq: {
            badge: "GOT QUESTIONS?",
            title: "Frequently Asked Questions",
            questions: [
                {
                    q: "What is Bellitere?",
                    a: "Bellitere is a premium, transaction-based streaming platform (TVOD) dedicated exclusively to showcasing Kannada cinema in ultra-high visual and audio fidelity. We do not require a subscription—you simply rent the films you want."
                },
                {
                    q: "How long is my rental active?",
                    a: "After payment, you have 30 days to start watching the film. Once you start streaming (pressing play), your 48-hour unlimited viewing window begins. You can watch the film as many times as you want within these 48 hours."
                },
                {
                    q: "Can I watch Bellitere on my Smart TV?",
                    a: "Yes! Bellitere is designed to run smoothly on Smart TV browsers, laptops, tablets, and mobile phones. Simply log in and access your library from any modern web browser."
                },
                {
                    q: "Why does my phone number appear on screen?",
                    a: "To combat piracy and protect our regional Kannada filmmakers, Bellitere implements a dynamic digital watermark that displays a faint, semi-transparent overlay of your verified mobile number at random positions on the video player."
                }
            ]
        },
        footer: {
            text: "Bellitere is an investor-ready Next.js 15 & Spring Boot MVP, designed to bring transactional cinema access to Kannada films worldwide.",
            rights: "© 2026 Bellitere. All rights reserved. Made in Bengaluru.",
        }
    },
    kn: {
        hero: {
            badge: "ಬೆಳ್ಳಿತೆರೆಯಲ್ಲಿ ಮಾತ್ರ ಪ್ರಸಾರವಾಗುತ್ತಿದೆ",
            title: "ಕಾಂತಾರ",
            kannadaTitle: "Kantara",
            tagline: "ಪವಿತ್ರ ಕಾಡುಗಳು ಮತ್ತು ದೈವಿಕ ನ್ಯಾಯದ ದಂತಕಥೆ",
            description: "ಕರಾವಳಿಯ ಒಂದು ಸಣ್ಣ ಹಳ್ಳಿಯಲ್ಲಿ ಸ್ಥಳೀಯ ಬಂಡಾಯಗಾರ ಮತ್ತು ಕಟ್ಟುನಿಟ್ಟಾದ ಅರಣ್ಯ ಅಧಿಕಾರಿಯ ನಡುವೆ ಘರ್ಷಣೆ ನಡೆಯುತ್ತದೆ. ಪುರಾತನ ಶಕ್ತಿಗಳು ಮತ್ತು ಬುಡಕಟ್ಟು ಜಾನಪದಗಳು ಮಾನವನ ದುರಾಶೆಯೊಂದಿಗೆ ಸಂಧಿಸಿದಾಗ, ಉಳಿವಿಗಾಗಿ ನಿಗೂಢ ಯುದ್ಧ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
            metadata: "U/A 16+ • 2h 30m • ಕರಾವಳಿ ಜಾನಪದ ಮತ್ತು ಸಾಹಸ • ಡಾಲ್ಬಿ ಅಟ್ಮಾಸ್",
            rentBtn: "ಚಿತ್ರವನ್ನು ಬಾಡಿಗೆ ಪಡೆಯಿರಿ • ₹150",
            trailerBtn: "ಟ್ರೇಲರ್ ವೀಕ್ಷಿಸಿ",
        },
        categories: {
            trending: "ಈಗ ಪ್ರಚಲಿತದಲ್ಲಿರುವ ಚಿತ್ರಗಳು",
            coastal: "ಕರಾವಳಿ ರೋಮಾಂಚನ",
            classics: "ವಿಮರ್ಶಕರ ಮೆಚ್ಚುಗೆ",
        },
        features: {
            badge: "ಬೆಳ್ಳಿತೆರೆ ವಿಶೇಷತೆಗಳು",
            title: "ಸಿನಿಮ್ಯಾಟಿಕ್ ಗುಣಮಟ್ಟ, ಬೇಡಿಕೆಯ ಮೇರೆಗೆ.",
            subtitle: "ಬೆಳ್ಳಿತೆರೆಯು ಅತ್ಯಾಧುನಿಕ ಸಿನಿಮ್ಯಾಟಿಕ್ ವೀಕ್ಷಣೆಯ ಅನುಭವವನ್ನು ನಿಮ್ಮ ಮನೆಗೇ ತರುತ್ತದೆ.",
            cards: [
                {
                    title: "ಅಲ್ಟ್ರಾ 4K HDR ವಿಶುವಲ್ಸ್",
                    desc: "ಪ್ರತಿ ಫ್ರೇಮ್‌ನಲ್ಲಿ ರೋಮಾಂಚಕ ಬಣ್ಣಗಳು, ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್ ಮತ್ತು ಶ್ರೀಮಂತ ವಿವರಗಳೊಂದಿಗೆ ನೇಟಿವ್ 4K ರೆಸಲ್ಯೂಶನ್ ಅನುಭವಿಸಿ."
                },
                {
                    title: "ಡಾಲ್ಬಿ ಅಟ್ಮಾಸ್ ಧ್ವನಿ",
                    desc: "ಕರಾವಳಿ ಅರಣ್ಯದ ಧ್ವನಿಗಳು ಮತ್ತು ಪರಿಸರವನ್ನು ಅತ್ಯಾಧುನಿಕ ಮಲ್ಟಿಚಾನಲ್ ಸರೌಂಡ್ ಸೌಂಡ್ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಅನುಭವಿಸಿ."
                },
                {
                    title: "48 ಗಂಟೆಗಳ ವೀಕ್ಷಣೆ ಸಮಯ",
                    desc: "ಒಮ್ಮೆ ನೀವು ವೀಕ್ಷಿಸಲು ಪ್ರಾರಂಭಿಸಿದರೆ, 48 ಗಂಟೆಗಳ ಕಾಲ ಅನಿಯಮಿತವಾಗಿ ವೀಕ್ಷಿಸಿ. ಯಾವುದೇ ಚಂದಾದಾರಿಕೆ ಇಲ್ಲ."
                },
                {
                    title: "ಪೈರಸಿ ತಡೆಗಟ್ಟುವಿಕೆ (Watermarking)",
                    desc: "ನಮ್ಮ ಪ್ರಾದೇಶಿಕ ಚಲನಚಿತ್ರ ತಯಾರಕರನ್ನು ಬೆಂಬಲಿಸಲು ಮತ್ತು ರಕ್ಷಿಸಲು ಪ್ರತಿ ಸ್ಟ್ರೀಮ್ ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯ ಸುರಕ್ಷಿತ ವಾಟರ್‌ಮಾರ್ಕ್ ಅನ್ನು ಹೊಂದಿರುತ್ತದೆ."
                }
            ]
        },
        howItWorks: {
            badge: "ಪೇ-ಪರ್-ವಿ್ಯೂ ಮಾದರಿ",
            title: "ಬೆಳ್ಳಿತೆರೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?",
            subtitle: "ಯಾವುದೇ ಮಾಸಿಕ ಬದ್ಧತೆಗಳಿಲ್ಲ. ನೀವು ವೀಕ್ಷಿಸಲು ಬಯಸುವ ಚಲನಚಿತ್ರಗಳಿಗೆ ಮಾತ್ರ ಪಾವತಿಸಿ.",
            steps: [
                {
                    num: "01",
                    title: "ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
                    desc: "ಕರಾವಳಿ ಥ್ರಿಲ್ಲರ್‌ಗಳಿಂದ ಹಿಡಿದು ಕಾಲೇಜು ಪ್ರೇಮಕಥೆಗಳವರೆಗೆ ಪ್ರೀಮಿಯಂ ಕನ್ನಡ ಚಿತ್ರಗಳ ನಮ್ಮ ಸಂಗ್ರಹವನ್ನು ಅನ್ವೇಷಿಸಿ."
                },
                {
                    num: "02",
                    title: "ಸುರಕ್ಷಿತ ಪಾವತಿ",
                    desc: "ನಮ್ಮ ಇಂಟಿಗ್ರೇಟೆಡ್ ರೇಜರ್‌ಪೇ ಪಾವತಿ ಮೂಲಕ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್‌ಗಳು, ಯುಪಿಐ ಅಥವಾ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಬಳಸಿ ಸುಲಭವಾಗಿ ಪಾವತಿಸಿ."
                },
                {
                    num: "03",
                    title: "48 ಗಂಟೆಗಳ ವೀಕ್ಷಣೆ",
                    desc: "ಯಾವುದೇ ಸಾಧನದಲ್ಲಿ ಪ್ಲೇ ಮಾಡಿ. ನಿಮ್ಮ 48 ಗಂಟೆಗಳ ವೀಕ್ಷಣೆಯ ಅವಧಿಯು ನೀವು ಮೊದಲು ಪ್ಲೇ ಬಟನ್ ಒತ್ತಿದಾಗ ಮಾತ್ರ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ."
                }
            ]
        },
        faq: {
            badge: "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?",
            title: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
            questions: [
                {
                    q: "ಬೆಳ್ಳಿತೆರೆ ಎಂದರೇನು?",
                    a: "ಬೆಳ್ಳಿತೆರೆ ಎಂಬುದು ಪ್ರೀಮಿಯಂ, ಪೇ-ಪರ್-ವ್ಯೂ ಆಧಾರಿತ ಸ್ಟ್ರೀಮಿಂಗ್ ವೇದಿಕೆಯಾಗಿದೆ (TVOD). ಇದು ಕನ್ನಡ ಚಿತ್ರರಂಗದ ಅತ್ಯುತ್ತಮ ಚಲನಚಿತ್ರಗಳನ್ನು ಅತ್ಯುನ್ನತ ಗುಣಮಟ್ಟದಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲು ಮೀಸಲಾಗಿದೆ. ಯಾವುದೇ ಚಂದಾದಾರಿಕೆ ಅಗತ್ಯವಿಲ್ಲ."
                },
                {
                    q: "ನನ್ನ ಬಾಡಿಗೆ ಅವಧಿ ಎಷ್ಟು ದಿನ ಇರುತ್ತದೆ?",
                    a: "ಪಾವತಿಯ ನಂತರ, ಚಲನಚಿತ್ರವನ್ನು ವೀಕ್ಷಿಸಲು ಪ್ರಾರಂಭಿಸಲು ನಿಮಗೆ 30 ದಿನಗಳ ಕಾಲಾವಕಾಶವಿರುತ್ತದೆ. ಒಮ್ಮೆ ನೀವು ವೀಕ್ಷಿಸಲು ಪ್ರಾರಂಭಿಸಿದರೆ, ನಿಮ್ಮ 48 ಗಂಟೆಗಳ ಅನಿಯಮಿತ ವೀಕ್ಷಣೆಯ ಅವಧಿಯು ಪ್ರಾರಂಭವಾಗುತ್ತದೆ."
                },
                {
                    q: "ಸ್ಮಾರ್ಟ್ ಟಿವಿಯಲ್ಲಿ ವೀಕ್ಷಿಸಬಹುದೇ?",
                    a: "ಹೌದು! ಬೆಳ್ಳಿತೆರೆಯನ್ನು ಸ್ಮಾರ್ಟ್ ಟಿವಿ ಬ್ರೌಸರ್‌ಗಳು, ಲ್ಯಾಪ್‌ಟಾಪ್‌ಗಳು, ಟ್ಯಾಬ್ಲೆಟ್‌ಗಳು ಮತ್ತು ಮೊಬೈಲ್ ಫೋನ್‌ಗಳಲ್ಲಿ ಸುಲಭವಾಗಿ ವೀಕ್ಷಿಸಬಹುದು."
                },
                {
                    q: "ನನ್ನ ಫೋನ್ ಸಂಖ್ಯೆ ಪರದೆಯ ಮೇಲೆ ಏಕೆ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ?",
                    a: "ಪೈರಸಿ ತಡೆಗಟ್ಟಲು ಮತ್ತು ನಮ್ಮ ಕನ್ನಡ ಚಲನಚಿತ್ರ ನಿರ್ಮಾಪಕರ ಹಿತಾಸಕ್ತಿ ಕಾಯಲು, ವೀಡಿಯೊ ಪ್ಲೇಯರ್ ಮೇಲೆ ನಿಮ್ಮ ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯ ಸುರಕ್ಷಿತ ವಾಟರ್‌ಮಾರ್ಕ್ ಅನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ."
                }
            ]
        },
        footer: {
            text: "ಬೆಳ್ಳಿತೆರೆಯು ಹೂಡಿಕೆದಾರರಿಗೆ ಪ್ರಸ್ತುತಪಡಿಸಲು ಸಿದ್ಧವಾಗಿರುವ ಒಂದು ಪ್ರದರ್ಶನ ವೇದಿಕೆಯಾಗಿದೆ (Next.js 15 ಮತ್ತು ಸ್ಪ್ರಿಂಗ್ ಬೂಟ್ ಆಧಾರಿತ).",
            rights: "© 2026 ಬೆಳ್ಳಿತೆರೆ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
        }
    }
};

// Reusable Scrolling Carousel Row Component
const CarouselRow = ({ title, movies }) => {
    const rowRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const handleScroll = () => {
        if (rowRef.current) {
            setShowLeftArrow(rowRef.current.scrollLeft > 10);
        }
    };

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = direction === "left"
                ? scrollLeft - clientWidth * 0.75
                : scrollLeft + clientWidth * 0.75;
            rowRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative group/row my-10">
            {/* Category Title */}
            <h2 className="text-lg md:text-xl font-extrabold tracking-widest text-neutral-200 mb-5 px-6 md:px-12 group-hover/row:text-white transition-colors duration-200">
                {title}
            </h2>
            <div className="relative px-6 md:px-12">
                {/* Left Arrow Button */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-2 md:left-6 top-[45%] -translate-y-1/2 z-20 bg-black/80 hover:bg-white hover:text-black border border-neutral-800 hover:border-white text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
                        aria-label="Scroll Left"
                    >
                        ❮
                    </button>
                )}
                {/* Right Arrow Button */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-2 md:right-6 top-[45%] -translate-y-1/2 z-20 bg-black/80 hover:bg-white hover:text-black border border-neutral-800 hover:border-white text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
                    aria-label="Scroll Right"
                >
                    ❯
                </button>
                {/* Horizontal Scrolling Area */}
                <div
                    ref={rowRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 -mx-2 scroll-smooth"
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="w-[185px] sm:w-[220px] md:w-[250px] flex-shrink-0">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function LandingPage() {
    const [lang, setLang] = useState("kn"); // Default to Kannada ('kn')
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [trailerOpen, setTrailerOpen] = useState(false);

    const t = content[lang];

    // Filtered data lists for categorizing the rows
    const trendingMovies = mockCatalog.slice(0, 5);
    const coastalMovies = [mockCatalog[0], mockCatalog[5], mockCatalog[6], mockCatalog[7], mockCatalog[2]];
    const classicMovies = [mockCatalog[3], mockCatalog[8], mockCatalog[9], mockCatalog[4], mockCatalog[2]];

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <main className="relative min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
            
            {/* Cinematic Full-Screen Hero Backdrop Section */}
            <section className="relative w-full h-[100vh] flex flex-col justify-end bg-black">
                {/* Background Image Container */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <Image
                        src="/hero-bg.png"
                        alt="Kantara Background"
                        fill
                        priority
                        className="object-cover object-center scale-105 filter brightness-[0.85] saturate-[0.8]"
                    />
                    {/* Dark Vignette Overlays - blending details to support readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-black/60 z-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-transparent to-[#050505]/25 z-1" />
                </div>

                {/* Volumetric Radial Glow for Silver Screen Effect */}
                <div className="absolute top-[30%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-white/5 blur-[120px] pointer-events-none z-1" />

                {/* Language Switch floating overlay on top-right of page body */}
                <div className="absolute top-24 right-6 md:right-12 z-20">
                    <div className="flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-2xl">
                        <button
                            onClick={() => setLang("kn")}
                            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                lang === "kn"
                                    ? "bg-gradient-to-r from-neutral-200 to-neutral-100 text-black shadow-md shadow-white/10"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            ಕನ್ನಡ
                        </button>
                        <button
                            onClick={() => setLang("en")}
                            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                lang === "en"
                                    ? "bg-gradient-to-r from-neutral-200 to-neutral-100 text-black shadow-md shadow-white/10"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            English
                        </button>
                    </div>
                </div>

                {/* Hero Content Area */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 flex flex-col items-start gap-4 md:gap-5">
                    {/* Badge */}
                    <span className="text-white text-[10px] md:text-xs font-black tracking-widest bg-white/5 border border-white/20 px-3 py-1.5 rounded-full uppercase shadow-md shadow-white/5 animate-fade-in flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {t.hero.badge}
                    </span>

                    {/* Movie Title */}
                    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 animate-fade-in">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white font-sans drop-shadow-lg leading-none">
                            {t.hero.title}
                        </h1>
                        <span className="text-neutral-400 text-xl md:text-3xl font-medium tracking-wide pb-1 md:pb-2">
                            ({t.hero.kannadaTitle})
                        </span>
                    </div>

                    {/* Tagline */}
                    <p className="bg-gradient-to-r from-neutral-100 via-neutral-350 to-neutral-500 bg-clip-text text-transparent text-sm md:text-lg font-extrabold tracking-wider uppercase drop-shadow">
                        {t.hero.tagline}
                    </p>

                    {/* Movie Description */}
                    <p className="text-neutral-300 text-sm md:text-base max-w-2xl leading-relaxed drop-shadow-md">
                        {t.hero.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 items-center text-xs md:text-sm font-semibold text-neutral-400 mt-1">
                        <span className="border border-neutral-800 px-1.5 py-0.5 rounded text-[10px] text-neutral-300">
                            U/A 16+
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                        <span>2h 30m</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                        <span className="text-neutral-300">Coastal Folklore & Thriller</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                        <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20">Dolby Atmos</span>
                    </div>

                    {/* Hero Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                        <Link href="/movies/1" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-gradient-to-r from-neutral-200 via-white to-neutral-300 hover:from-white hover:via-neutral-100 hover:to-neutral-200 text-black font-black px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/40 uppercase tracking-wider cursor-pointer">
                                {t.hero.rentBtn}
                            </button>
                        </Link>
                        <button
                            onClick={() => setTrailerOpen(true)}
                            className="w-full sm:w-auto bg-black/60 hover:bg-neutral-900/60 border border-neutral-800 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base uppercase tracking-wider backdrop-blur-md cursor-pointer flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            {t.hero.trailerBtn}
                        </button>
                    </div>

                    {/* Scroll Down Hint Indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-bounce-slow text-neutral-500 hover:text-white transition-colors cursor-pointer select-none">
                        <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Movie Category Scrolling Sections Container */}
            <section className="relative z-10 bg-[#050505] -mt-1 py-8 flex flex-col">
                <CarouselRow title={t.categories.trending} movies={trendingMovies} />
                <CarouselRow title={t.categories.coastal} movies={coastalMovies} />
                <CarouselRow title={t.categories.classics} movies={classicMovies} />
            </section>

            {/* Feature Highlights Showcase Grid */}
            <section className="relative z-10 bg-[#050505] border-t border-neutral-900/60 py-20 px-6 md:px-12 overflow-hidden">
                {/* Volumetric glow background effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-white/3 blur-[150px] pointer-events-none z-0" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                    <div className="text-center max-w-3xl mb-16 flex flex-col items-center gap-3">
                        <span className="text-white text-[10px] md:text-xs font-black tracking-widest bg-white/5 border border-white/20 px-3 py-1 rounded-full uppercase">
                            {t.features.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
                            {t.features.title}
                        </h2>
                        <p className="text-neutral-400 mt-4 text-base md:text-lg leading-relaxed">
                            {t.features.subtitle}
                        </p>
                    </div>

                    {/* Features Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {t.features.cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 border border-neutral-900 hover:border-white/10 rounded-2xl p-6 sm:p-8 flex gap-5 hover:bg-[#050505] hover:shadow-[0_0_25px_rgba(255,255,255,0.03)] transition-all duration-300 hover:scale-[1.01]"
                            >
                                {/* Vector Icons */}
                                <div className="flex-shrink-0 text-white mt-1 bg-white/5 w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    {idx === 0 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                    {idx === 1 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        </svg>
                                    )}
                                    {idx === 2 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    {idx === 3 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works - TVOD Rental Process */}
            <section id="pricing" className="relative z-10 bg-[#050505] border-t border-neutral-900/60 py-20 px-6 md:px-12 overflow-hidden">
                {/* Volumetric glow background effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-white/2 blur-[140px] pointer-events-none z-0" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                    <div className="text-center max-w-3xl mb-16 flex flex-col items-center gap-3">
                        <span className="text-white text-[10px] md:text-xs font-black tracking-widest bg-white/5 border border-white/20 px-3 py-1 rounded-full uppercase">
                            {t.howItWorks.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
                            {t.howItWorks.title}
                        </h2>
                        <p className="text-neutral-400 mt-4 text-base md:text-lg leading-relaxed">
                            {t.howItWorks.subtitle}
                        </p>
                    </div>

                    {/* Step Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {t.howItWorks.steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="bg-neutral-900/20 border border-neutral-900 rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden group hover:border-white/10 hover:bg-neutral-900/40 transition-all duration-300"
                            >
                                <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300 absolute right-4 top-2 select-none">
                                    {step.num}
                                </span>
                                <div className="text-2xl font-black text-white bg-white/5 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive FAQ Accordion Panel Section */}
            <section id="faq" className="relative z-10 bg-[#050505] border-t border-neutral-900/60 py-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <div className="text-center mb-16 flex flex-col items-center gap-3">
                        <span className="text-white text-[10px] md:text-xs font-black tracking-widest bg-white/5 border border-white/20 px-3 py-1 rounded-full uppercase">
                            {t.faq.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
                            {t.faq.title}
                        </h2>
                    </div>

                    {/* Accordion List */}
                    <div className="w-full flex flex-col gap-4">
                        {t.faq.questions.map((faqItem, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-[#050505]/40 border border-neutral-900 rounded-xl overflow-hidden hover:border-white/10 transition-colors duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex justify-between items-center px-6 py-5 text-left text-white focus:outline-none cursor-pointer"
                                    >
                                        <span className="text-base md:text-lg font-bold pr-4">{faqItem.q}</span>
                                        <span className={`text-white text-xl font-black transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                                            ＋
                                        </span>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out ${
                                            isOpen ? "max-h-60 border-t border-neutral-900/60" : "max-h-0"
                                        } overflow-hidden`}
                                    >
                                        <p className="px-6 py-5 text-neutral-400 text-sm md:text-base leading-relaxed bg-neutral-950/20">
                                            {faqItem.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Premium Investor Guardrail & Platform Footer */}
            <footer className="relative z-10 border-t border-white/5 bg-[#020202]/70 backdrop-blur-xl px-6 md:px-12 py-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="relative h-8 w-24">
                            <Image
                                src="/Bellitere.png"
                                alt="Bellitere"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-neutral-500 text-xs max-w-sm text-center md:text-left leading-relaxed">
                            {t.footer.text}
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                        <p className="text-xs text-neutral-600 font-mono tracking-wider">
                            🛡️ Next.js 15 (App) • Spring Boot • Razorpay • Mux HLS
                        </p>
                        <p className="text-xs text-neutral-500 tracking-wide mt-2">
                            {t.footer.rights}
                        </p>
                    </div>
                </div>
            </footer>

            {/* Video Trailer Overlay Modal */}
            {trailerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                    <div
                        className="bg-[#050505]/95 border border-white/10 rounded-2xl w-full max-w-4xl p-2 relative shadow-2xl shadow-white/5 animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setTrailerOpen(false)}
                            className="absolute -top-12 right-0 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-bold flex items-center gap-1.5"
                        >
                            ✕ Close
                        </button>
                        
                        {/* 16:9 Aspect Video Container */}
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                            <iframe
                                className="absolute inset-0 w-full h-full border-none"
                                src="https://www.youtube.com/embed/8Fip7y1RyH0?autoplay=1"
                                title="Kantara Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}