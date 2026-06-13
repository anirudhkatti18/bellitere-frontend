//Global styles, fonts, and root configuration
import "./globals.css";

// This metadata helps with SEO and what shows up when investors share the link
export const metadata = {
    title: "Bellitere | Premium Kannada Cinema",
    description: "Experience premium Kannada storytelling. Rent individual cinematic blockbusters.",
};

// This is the required default export the error was complaining about
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-neutral-950 text-white font-sans antialiased">
                {children}
            </body>
        </html>
    );
}