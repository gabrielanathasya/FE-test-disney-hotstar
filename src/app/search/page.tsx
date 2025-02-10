import { MovieService } from "@/data/services/movie-service";
import { TrendingService } from "@/data/services/trending-service";
import { TvShowService } from "@/data/services/tv-show-service";
import Search from "@/domains/search";
import { Suspense } from "react";
import Loading from "../loading";

type Props = {
  searchParams: { query?: string };
};

export default async function SearchPage({ searchParams }: Props) {
  const { query } = searchParams;
  let movies;
  let tvShow;
  let trending;

  if (query) {
    movies = await MovieService.getInstance().search({ query });
    tvShow = await TvShowService.getInstance().search({ query });
  } else {
    trending = await TrendingService.getInstance().getAll();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Search
        movies={movies?.results?.slice(0, 8) ?? []}
        tvShow={tvShow?.results?.slice(0, 8) ?? []}
        trending={trending?.results?.slice(0, 8) ?? []}
      />
    </Suspense>
  );
}
