//Global styles, fonts, and root configuration
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Bellitere | Premium Kannada Cinema",
    description: "Experience premium Kannada storytelling. Rent individual cinematic blockbusters.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-neutral-950 text-white font-sans antialiased">
                <Navbar />
                {children}
            </body>
        </html>
    );
}