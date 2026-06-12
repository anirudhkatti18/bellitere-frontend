import Link from "next/link";

export default function MovieCard({ movie }) {
    return (
        <Link href={`/movies/${movie.id}`}>
            <div className="group relative flex flex-col bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-amber-500/10 h-full">

                {/* Poster Image Container */}
                <div className="relative aspect-[2/3] w-full bg-neutral-950 overflow-hidden">
                    {/* Placeholder for actual next/image later */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                        <span className="text-neutral-600 font-mono text-sm tracking-widest uppercase">Poster Space</span>
                    </div>

                    {/* Subtle vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80"></div>

                    {/* Price Tag Badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-amber-500 text-xs font-bold px-2 py-1 rounded border border-amber-500/20">
                        ₹{movie.price}
                    </div>
                </div>

                {/* Metadata Section */}
                <div className="p-4 flex flex-col flex-grow justify-between bg-gradient-to-b from-neutral-900 to-neutral-950">
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                            {movie.title}
                        </h3>
                        <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
                            {movie.description}
                        </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-800/50 flex items-center justify-between text-xs font-semibold text-neutral-500">
                        <span className="uppercase tracking-wider">48h Rental</span>
                        <span className="text-amber-500/0 group-hover:text-amber-500 transition-colors flex items-center gap-1">
                            Watch Now <span className="text-[10px]">▶</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}