import { NextResponse } from "next/server";
import { getMovies } from "@/lib/db";

export const dynamic = 'force-static';

/**
 * API route to serve full catalog lists via GET request.
 * Placed under /api/movies/list to resolve filesystem directory collisions in static exports.
 */
export async function GET() {
    try {
        const movies = await getMovies();
        return NextResponse.json(movies);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }
}
