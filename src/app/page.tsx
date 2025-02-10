import Home from "@/domains/home";
import { TvShowService } from "@/data/services/tv-show-service";
import { MovieService } from "@/data/services/movie-service";
import { TrendingService } from "@/data/services/trending-service";
import { TvShow } from "@/types/tv-shows";
import { Movie } from "@/types/movies";
import { Suspense } from "react";
import Loading from "./loading";

export default async function HomePage() {
  const topRatedTvShow = await TvShowService.getInstance().getTopRated();
  const topRatedMovie = await MovieService.getInstance().getTopRated();
  const trendingTvShow = await TrendingService.getInstance().getTrendingTv();
  const trendingMovie = await TrendingService.getInstance().getTrendingMovie();

  return (
    <Suspense fallback={<Loading />}>
      <Home
        topRatedTvShow={topRatedTvShow.results}
        topRatedMovie={topRatedMovie.results}
        trendingTvShow={trendingTvShow.results as TvShow[]}
        trendingMovie={trendingMovie.results as Movie[]}
      />
    </Suspense>
  );
}
