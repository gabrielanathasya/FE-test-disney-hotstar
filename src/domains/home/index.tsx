import styles from "./home.module.css";
import { Movie } from "@/data/models/movies";
type Props = {
  movies: Movie[];
};

export default function Home({ movies }: Props) {
  console.log({ movies });

  return <>home</>;
}
