import { endpoints } from "@/data/consts/endpoints";
import { tmdbService } from "@/data/services/tmdb-service";
import Home from "@/domains/home";
import styles from "./page.module.css";
// to do: remove imports

export default async function HomePage() {
  const response = await tmdbService(endpoints.movie.nowPlaying);

  return <Home movies={response.results} />;
}
