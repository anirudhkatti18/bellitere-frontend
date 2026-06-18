import { mockCatalog } from "@/lib/catalog";
import MovieDetail from "./MovieDetailClient";

export function generateStaticParams() {
  return mockCatalog.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default function MovieDetailPage() {
  return <MovieDetail />;
}