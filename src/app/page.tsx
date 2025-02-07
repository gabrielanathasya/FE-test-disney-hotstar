import { endpoints } from "@/data/consts/endpoints";
import { getMovies } from "@/data/services/movies";
import { tmdbService } from "@/data/services/tmdb-service";
import Home from "@/domains/home";
import Image from "next/image";
import styles from "./page.module.css";
// to do: remove imports

export default async function HomePage() {
  const response = await tmdbService(endpoints.horrorMovies);

  return <Home movies={response.results} />;
}
