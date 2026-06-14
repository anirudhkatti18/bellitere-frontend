import Link from "next/link";

export default function MovieCard({ movie, isLandscape = false }) {
    // Generate distinct cover gradients to represent poster art
    const gradients = [
        "from-neutral-900 via-neutral-950 to-neutral-900",
        "from-neutral-955 via-neutral-900 to-neutral-950",
        "from-neutral-900 via-neutral-905 to-neutral-950",
        "from-neutral-950 via-neutral-950 to-neutral-900",
    ];
    const bgGradient = gradients[(movie.id || 0) % gradients.length];

    // Mock release year and rating score
    const ratingScore = (8.0 + ((movie.id * 3) % 19) * 0.1).toFixed(1);
    const releaseYear = 2020 + (movie.id % 6);
    const isTopTen = movie.id <= 2;

    return (
        <Link href={`/movies/${movie.id}`} className="block h-full group relative z-10 hover:z-20">
            {/* Aspect container that breaks out on hover */}
            <div className={`relative w-full h-full bg-neutral-950 rounded overflow-hidden border border-neutral-900/60 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:z-50 group-hover:shadow-2xl group-hover:border-white/20 ${
                isLandscape ? "aspect-video" : "aspect-[2/3]"
            }`}>
                
                {/* Simulated Poster Art - Pure Image Display */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} flex flex-col justify-center items-center p-4 transition-transform duration-500 group-hover:scale-105`}>
                    <div className="text-center">
                        <h4 className="text-base sm:text-lg md:text-xl font-black italic tracking-tighter text-white/80 select-none line-clamp-2 px-1 uppercase font-sans">
                            {movie.title}
                        </h4>
                        {movie.kannadaTitle && (
                            <p className="text-[10px] sm:text-xs font-semibold text-neutral-500 mt-1 select-none">
                                {movie.kannadaTitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* Sleek Absolute-Positioned Badges (Top-Left corner) */}
                <div className="absolute top-2 left-2 z-10 pointer-events-none">
                    {isTopTen ? (
                        <span className="bg-gradient-to-r from-red-650 to-red-800 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-md uppercase tracking-wider border border-red-500/20">
                            TOP 10
                        </span>
                    ) : (
                        <span className="bg-black/70 backdrop-blur-md text-neutral-300 text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-md border border-white/10 uppercase tracking-widest">
                            HD
                        </span>
                    )}
                </div>

                {/* Resting State Vignette Overlay */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors duration-300" />

                {/* Centered Hover Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white to-neutral-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Slide-Up Hover Overlay details with sharp bottom-heavy gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-end p-3 z-10">
                    <div className="flex flex-col gap-1.5">
                        {/* Title inside hover overlay */}
                        <div>
                            <h3 className="text-xs sm:text-sm font-black text-white leading-tight line-clamp-1">
                                {movie.title}
                            </h3>
                            {movie.kannadaTitle && (
                                <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-400">
                                    {movie.kannadaTitle}
                                </p>
                            )}
                        </div>

                        {/* Rating, Year and Duration */}
                        <div className="flex items-center gap-2 text-[9px] font-extrabold text-neutral-300">
                            <span className="text-white font-bold bg-white/10 px-1 py-0.2 rounded text-[8px] border border-white/15">
                                ★ {ratingScore}
                            </span>
                            <span>{releaseYear}</span>
                            <span>{movie.duration || "2h 30m"}</span>
                        </div>

                        {/* Rent fee & Rental Info */}
                        <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[8px] text-neutral-400 font-semibold">
                            <span className="text-white font-bold text-[9px]">
                                ₹{movie.price}
                            </span>
                            <span className="uppercase tracking-wider">
                                48h Rental
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}