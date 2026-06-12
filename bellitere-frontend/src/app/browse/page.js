//Movie Catalog Grid
"use client";
import MovieCard from "@/components/MovieCard";

// Simulated database response
const mockCatalog = [
    {
        id: 1,
        title: "Kantara",
        description: "A fiery local deity clashes with a forestry officer in a coastal village.",
        price: "150.00",
    },
    {
        id: 2,
        title: "KGF: Chapter 2",
        description: "The blood-soaked land of Kolar Gold Fields has a new overlord.",
        price: "200.00",
    },
    {
        id: 3,
        title: "Ulidavaru Kandanthe",
        description: "A journalist pieces together the truth behind a murder during a coastal festival.",
        price: "99.00",
    },
    {
        id: 4,
        title: "Lucia",
        description: "An usher at a theater experiences a blurring of reality and dreams.",
        price: "120.00",
    },
    {
        id: 5,
        title: "Rangitaranga",
        description: "A novelist investigates mysterious occurrences in his ancestral village.",
        price: "100.00",
    },
    {
        id: 6,
        title: "Garuda Gamana Vrishabha Vahana",
        description: "Two childhood friends rise to power in the underworld of Mangaluru.",
        price: "150.00",
    }
];

export default function BrowsePage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            Premium <span className="text-amber-500">Catalog</span>
                        </h1>
                        <p className="text-neutral-400 mt-2 text-lg">
                            Select a title to begin your 48-hour viewing window.
                        </p>
                    </div>

                    {/* Quick Filter/Sort Mockup */}
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-neutral-500">Sort by:</span>
                        <select className="bg-neutral-900 border border-neutral-800 text-white px-3 py-1.5 rounded-lg outline-none focus:border-amber-500">
                            <option>Latest Releases</option>
                            <option>Most Popular</option>
                            <option>Price: Low to High</option>
                        </select>
                    </div>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {mockCatalog.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

            </div>
        </main>
    );
}
