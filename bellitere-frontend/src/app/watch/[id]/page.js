import { mockCatalog } from "@/lib/catalog";
import WatchPage from "./WatchPageClient";

export function generateStaticParams() {
  return mockCatalog.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default function WatchRoutePage() {
  return <WatchPage />;
}