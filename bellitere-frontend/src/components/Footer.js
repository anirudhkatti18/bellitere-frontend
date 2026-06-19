import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-[#08080c] py-12 px-6 md:px-16 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Left Side (The Premium Brand Zone) */}
                <div className="flex flex-col gap-3">
                    <Image 
                        src="/bellitere-frontend/Bellitere.png" 
                        alt="ಬೆಳ್ಳಿತ್ತೆರೆ" 
                        width={180} 
                        height={60} 
                        className="object-contain w-auto h-10 w-10 md:h-16 md:w-16 p-0 m-0" 
                    />
                    <span className="text-white font-semibold text-xl md:text-3xl">ಬೆಳ್ಳಿತ್ತೆರೆ</span>
                </div>

                {/* Right Side (The Clean Legal & Contact Block) */}
                <div className="flex flex-col items-start md:items-end gap-3 max-w-xl md:text-right">
                    <p className="text-sm text-gray-500 leading-relaxed">
                        ಈ ಸೈಟ್ ನಮ್ಮ ಸರ್ವರ್‌ನಲ್ಲಿ ಯಾವುದೇ ಫೈಲ್‌ಗಳನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ, ನಾವು 3ನೇ ವ್ಯಕ್ತಿಯ ಸೇವೆಗಳಲ್ಲಿ ಹೋಸ್ಟ್ ಮಾಡಲಾದ ಮಾಧ್ಯಮಕ್ಕೆ ಮಾತ್ರ ಲಿಂಕ್ ಮಾಡುತ್ತೇವೆ.
                    </p>
                    <a 
                        href="mailto:contact@bellitere.com" 
                        className="text-sm text-gray-400 hover:text-white transition-colors border-b border-gray-700 pb-0.5"
                    >
                        contact@bellitere.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
