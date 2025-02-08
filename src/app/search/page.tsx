import { endpoints } from "@/data/consts/endpoints";
import { tmdbService } from "@/data/services/tmdb-service";
import Search from "@/domains/search";

type Props = {
  searchParams: { query?: string };
};

export default async function SearchPage({ searchParams }: Props) {
  const { query } = searchParams;
  let movies = [];
  let tvShow = [];
  let trending = [];

  if (query) {
    movies = await tmdbService(`${endpoints.search.movie}?query=${query}`);
    tvShow = await tmdbService(`${endpoints.search.tv}?query=${query}`);
  } else {
    trending = await tmdbService(endpoints.trending);
  }
  return (
    <Search
      movies={movies.results?.slice(0, 8)}
      tvShow={tvShow.results?.slice(0, 8)}
      trending={trending.results?.slice(0, 8)}
    />
  );
}
