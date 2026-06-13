import Link from "next/link";

export default function MovieCard({ movie }) {
    // Generate a unique gradient for the card background to simulate distinct movie poster art styles
    const gradients = [
        "from-neutral-900 via-neutral-950 to-neutral-900 border-t-2 border-t-amber-500/20",
        "from-neutral-950 via-neutral-900 to-neutral-950 border-t-2 border-t-red-500/20",
        "from-neutral-900 via-neutral-900 to-neutral-950 border-t-2 border-t-blue-500/20",
        "from-neutral-950 via-neutral-950 to-neutral-900 border-t-2 border-t-purple-500/20",
    ];
    const borderGlow = "hover:border-amber-500/60 hover:glow-gold-hover";
    const bgGradient = gradients[(movie.id || 0) % gradients.length];

    return (
        <Link href={`/movies/${movie.id}`} className="block h-full">
            <div className={`group relative flex flex-col bg-neutral-950 rounded-xl overflow-hidden border border-neutral-900/80 ${borderGlow} transition-all duration-300 cursor-pointer shadow-lg hover:shadow-black/60 h-full transform hover:scale-[1.03] hover:-translate-y-1`}>

                {/* Poster Image Area */}
                <div className="relative aspect-[2/3] w-full bg-neutral-900 overflow-hidden">
                    {/* Simulated Film Poster Art with typography and gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} flex flex-col justify-between p-4 group-hover:scale-105 transition-transform duration-500`}>
                        {/* Film Roll Icon & Genre Tag */}
                        <div className="flex justify-between items-center z-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-amber-400 transition-colors">
                                {movie.genre || "Kannada Cinema"}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-600 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                        </div>

                        {/* Title text overlaid in the center of the poster area for high recognition */}
                        <div className="my-auto py-6 text-center z-10">
                            <h4 className="text-xl md:text-2xl font-black tracking-tight text-white/90 group-hover:text-white group-hover:scale-105 transition-all duration-300 select-none line-clamp-2 px-1">
                                {movie.title}
                            </h4>
                            {movie.kannadaTitle && (
                                <p className="text-sm font-medium text-neutral-400/90 group-hover:text-neutral-300 transition-colors mt-1">
                                    {movie.kannadaTitle}
                                </p>
                            )}
                        </div>

                        {/* Bottom Metadata Info */}
                        <div className="flex justify-between items-center z-10">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-neutral-400 border border-neutral-800">
                                {movie.rating || "U/A 13+"}
                            </span>
                            <span className="text-[10px] font-bold text-neutral-500 tracking-wide">
                                {movie.duration || "2h 15m"}
                            </span>
                        </div>
                    </div>

                    {/* Poster shadow and vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-black/40 z-5"></div>

                    {/* Play Button Overlay - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-amber-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* Price Tag Badge */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-amber-500 text-xs font-black px-2.5 py-1 rounded-full border border-amber-500/30 z-10 shadow-md">
                        ₹{movie.price}
                    </div>
                </div>

                {/* Metadata Section below the poster */}
                <div className="p-4 flex flex-col flex-grow justify-between bg-gradient-to-b from-neutral-900 to-neutral-950 border-t border-neutral-900">
                    <div>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                            {movie.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {movie.description}
                        </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/40 flex items-center justify-between text-[11px] font-bold text-neutral-500">
                        <span className="uppercase tracking-wider">48h Stream Window</span>
                        <span className="text-amber-500/0 group-hover:text-amber-500 transition-all duration-300 flex items-center gap-1">
                            WATCH NOW <span className="text-[8px]">▶</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}