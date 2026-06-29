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
            <div className={`relative w-full bg-neutral-900 rounded-lg overflow-hidden border border-white/5 group-hover:border-zinc-400/25 shadow-md transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(0,0,0,0.8)] z-10 ${
                isLandscape ? "aspect-video" : "aspect-[2/3]"
            }`}>
                
                {/* Fallback Dynamic Gradient behind image */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`} />

                {movieDetails.poster ? (
                    /* Actual Poster Art */
                    <img 
                        src={movieDetails.poster} 
                        alt={movieDetails.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 z-10"
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
                        <div className="bg-gradient-to-r from-zinc-500/90 via-slate-200/90 to-zinc-600/90 backdrop-blur-md text-black text-[9px] font-black px-2 py-0.5 rounded-sm shadow-md flex items-center gap-1 border border-zinc-400/30">
                            <svg className="w-2.5 h-2.5 stroke-black" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            TOP 10
                        </div>
                    </div>
                )}

                {/* Expires In Badge */}
                {expiresIn && (
                    <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
                        <div className="bg-red-600/90 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded-sm shadow-md border border-white/10 tracking-wider">
                            ⏳ {expiresIn} LEFT
                        </div>
                    </div>
                )}

                {/* Resting State Vignette Overlay */}
                <div className="absolute inset-0 bg-black/15 pointer-events-none group-hover:bg-transparent transition-colors duration-300 z-20" />
            </div>

            {/* Minimal text underneath the card (Tightened spacing) */}
            <div className="mt-2 px-1 flex flex-col gap-0.5">
                <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-white/95 leading-tight line-clamp-1 group-hover:text-white transition-colors duration-200">
                    {movieDetails.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-neutral-400">
                    <span className="flex items-center gap-0.5">
                        <span className="text-red-500 text-[10px] sm:text-xs">★</span>
                        <span className="text-neutral-300 font-bold">{ratingScore}</span>
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-500 font-medium">{releaseYear}</span>
                </div>
            </div>
        </Link>
    );
}