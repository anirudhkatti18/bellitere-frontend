import Link from "next/link";
import { getMovieById } from "@/lib/catalog";

export default function MovieCard({ movie, isLandscape = false, expiresIn }) {
    // Look up the full movie from central catalog by ID, fallback to passed movie object
    const movieDetails = getMovieById(movie.id) || movie;

    // Generate distinct cover gradients to represent poster art
    const gradients = [
        "from-indigo-950 via-purple-950 to-neutral-900",
        "from-blue-950 via-neutral-900 to-indigo-950",
        "from-neutral-900 via-indigo-950 to-purple-900",
        "from-purple-950 via-indigo-900 to-neutral-900",
    ];
    const bgGradient = gradients[(movieDetails.id || 0) % gradients.length];

    // Release year and rating score
    const ratingScore = movieDetails.rating || (8.0 + ((movieDetails.id * 3) % 19) * 0.1).toFixed(1);
    const releaseYear = movieDetails.year || (2020 + (movieDetails.id % 6));
    const isTopTen = movieDetails.id <= 2;

    return (
        <Link href={`/movies/${movieDetails.id}`} className="block h-full group relative z-10 w-full">
            {/* Aspect container with hover scale */}
            <div className={`relative w-full bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:z-50 ${
                isLandscape ? "aspect-video" : "aspect-[2/3]"
            }`}>
                
                {/* Fallback Dynamic Gradient behind image */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`} />

                {movieDetails.poster ? (
                    /* Actual Poster Art */
                    <img 
                        src={movieDetails.poster} 
                        alt={movieDetails.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
                        loading="lazy"
                    />
                ) : (
                    /* If no poster is defined, display text overlay */
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-10">
                        <div className="text-center group-hover:scale-105 transition-transform duration-500">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold italic tracking-tighter text-white/90 select-none line-clamp-2 px-1 font-sans drop-shadow-md">
                                {movieDetails.title}
                            </h4>
                            {movieDetails.kannadaTitle && (
                                <p className="text-[10px] sm:text-xs font-medium text-white/60 mt-1 select-none">
                                    {movieDetails.kannadaTitle}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Top 10/Trending Badge */}
                {isTopTen && (
                    <div className="absolute top-2 left-2 z-20 pointer-events-none">
                        <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/20">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            TOP 10
                        </div>
                    </div>
                )}

                {/* Expires In Badge */}
                {expiresIn && (
                    <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
                        <div className="bg-red-600/90 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-sm shadow-md border border-white/10 tracking-wider">
                            ⏳ {expiresIn} LEFT
                        </div>
                    </div>
                )}

                {/* Resting State Vignette Overlay */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-300 z-20" />
            </div>

            {/* Minimal text underneath the card */}
            <div className="mt-3 px-1 flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {movieDetails.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span className="text-blue-400 font-bold">★ {ratingScore}</span>
                    <span>•</span>
                    <span>{releaseYear}</span>
                </div>
            </div>
        </Link>
    );
}