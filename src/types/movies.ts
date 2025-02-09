import {
  Genre,
  MediaType,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "./common";

export type Movie = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  media_type?: MediaType;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  video: boolean;
  vote_count: number;
};

type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
