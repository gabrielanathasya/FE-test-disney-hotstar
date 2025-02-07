import { endpoints } from "../consts/endpoints";
import { Movie } from "../models/movies";
import { TvShow } from "../models/series";

// to do: remove this page
export async function getMovies(): Promise<(Movie | TvShow)[]> {
  const path = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${endpoints.horrorMovies}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const path1 = endpoints.horrorMovies;
  const response = await fetch(path, { next: { revalidate: 3600 } });

  console.log({ path, response });

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch movies");
  //   }

  const data = await response.json();
  return data.results;
}
