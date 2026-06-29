import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-gradient-to-b from-[#08080c] to-black py-16 px-6 md:px-16 mt-24">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
                
                {/* Brand & Logo Core Emphasis (Centered Showcase) */}
                <div className="flex flex-col items-center justify-center text-center gap-4 pb-10 border-b border-white/5 w-full">
                    <div className="relative group">
                        {/* Soft glowing ambient light behind logo */}
                        <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-110 pointer-events-none transition-all group-hover:scale-125" />
                        <Image 
                            src="/bellitere-frontend/Bellitere.png" 
                            alt="ಬೆಳ್ಳಿತೆರೆ" 
                            width={120} 
                            height={120} 
                            className="object-contain w-auto h-20 md:h-24 relative z-10 hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_25px_rgba(226,232,240,0.1)] p-0 m-0 cursor-pointer" 
                        />
                    </div>
                    
                    <h2 className="text-chrome font-black text-2xl md:text-4xl tracking-widest uppercase mt-2">
                        ಬೆಳ್ಳಿತೆರೆ / BELLITERE
                    </h2>
                    
                    <p className="text-[10px] sm:text-xs text-neutral-400 font-bold uppercase tracking-[0.2em] max-w-lg leading-relaxed">
                        Kannada's Premier Digital Theatre & Entertainment Showcase
                    </p>
                </div>

                {/* Info & Legal Section (Bottom Align) */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] sm:text-xs tracking-wider text-neutral-500">
                    <div className="flex flex-col gap-2 text-center md:text-left max-w-xl">
                        <p className="leading-relaxed">
                            © {new Date().getFullYear()} BELLITERE. ALL RIGHTS RESERVED.
                        </p>
                        <p className="leading-relaxed text-[9px] sm:text-[10px] text-neutral-600 uppercase font-medium">
                            ಬೆಳ್ಳಿತೆರೆ ಸೈಟ್ ನಮ್ಮ ಸರ್ವರ್‌ನಲ್ಲಿ ಯಾವುದೇ ಮಾಧ್ಯಮ ಫೈಲ್‌ಗಳನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ಎಲ್ಲಾ ವಿಷಯಗಳನ್ನು 3ನೇ ವ್ಯಕ್ತಿಯ ಸೇವೆಗಳಿಂದ ಲಿಂಕ್ ಮಾಡಲಾಗಿದೆ. / This site does not host any media files. All content links to media hosted on external 3rd-party servers.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <a 
                            href="mailto:contact@bellitere.com" 
                            className="text-neutral-400 hover:text-white transition-all border border-white/10 hover:border-white/30 rounded px-4 py-2 font-black uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white/5 active:scale-98"
                        >
                            CONTACT@BELLITERE.COM
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
