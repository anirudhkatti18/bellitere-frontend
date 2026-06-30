import { NextResponse } from "next/server";
import { getMovieById } from "@/lib/db";
import { mockCatalog } from "@/lib/catalog";

export const dynamic = 'force-static';

/**
 * Generate static params for the dynamic API segment under static export constraints.
 */
export function generateStaticParams() {
    return mockCatalog.map((movie) => ({
        id: movie.id.toString(),
    }));
}

/**
 * API route to serve dynamic single movie details via GET request.
 */
export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams?.id;
        const movie = await getMovieById(id);
        if (!movie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }
        return NextResponse.json(movie);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 });
    }
}
