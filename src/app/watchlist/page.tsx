import { Suspense } from "react";
import Loading from "../loading";
import Watchlist from "@/domains/watchlist";

export default async function WatchlistPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Watchlist />
    </Suspense>
  );
}
