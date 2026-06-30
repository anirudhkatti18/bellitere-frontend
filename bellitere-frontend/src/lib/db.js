import { mockCatalog, getMovieById as catalogGetMovieById, getRecommendations as catalogGetRecommendations } from "./catalog";

/**
 * Fetch the complete list of films asynchronously.
 * Designed to return a Promise so it can be swapped with live DB queries later.
 */
export async function getMovies() {
    return Promise.resolve(mockCatalog);
}

/**
 * Fetch specific film metadata, character casts, and trailing video assets.
 */
export async function getMovieById(id) {
    return Promise.resolve(catalogGetMovieById(id));
}

/**
 * Fetch film recommendations list based on category matching.
 */
export async function getRecommendations(currentId, count = 5) {
    return Promise.resolve(catalogGetRecommendations(currentId, count));
}
