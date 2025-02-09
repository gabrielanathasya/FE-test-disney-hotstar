import Home from "@/domains/home";
import { MovieService } from "@/data/services/movie-service";

export default async function HomePage() {
  const nowPlaying = await MovieService.getInstance().getNowPlaying();

  return <Home movies={nowPlaying.results} />;
}
