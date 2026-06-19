//Global styles, fonts, and root configuration
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
    title: "ಬೆಳ್ಳಿತ್ತೆರೆ | Bellitere - Premium Kannada Cinema",
    description: "ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟದಲ್ಲಿ ಪ್ರೀಮಿಯಂ ಕನ್ನಡ ಸಿನಿಮಾಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="kn">
            <body className="bg-[#0a0a0a] text-white font-sans antialiased flex flex-col min-h-screen">
                <LanguageProvider>
                    <Navbar />
                    <div className="flex-grow">
                        {children}
                    </div>
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}