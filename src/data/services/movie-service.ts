import { MovieDetail } from "@/types/movies";
import { endpoints } from "../consts/endpoints";
import { FetchMovieParams } from "../models/request/movie-request";
import {
  NowPlayingMovieResponse,
  SearchMovieResponse,
  TopRatedMovieResponse,
} from "../models/response/movie-response";
import { apiClient } from "./api-client";

export class MovieService {
  private static instance: MovieService;

  public static getInstance(): MovieService {
    if (!this.instance) {
      this.instance = new MovieService();
    }
    return this.instance;
  }

  public async getDetail(id: number) {
    const response = await apiClient.get<MovieDetail>(
      `${endpoints.movie.detail}/${id}`,
    );
    return response.data;
  }

  public async search(params: FetchMovieParams) {
    const response = await apiClient.get<SearchMovieResponse>(
      endpoints.search.movie,
      {
        params,
      },
    );
    return response.data;
  }

  public async getNowPlaying() {
    const response = await apiClient.get<NowPlayingMovieResponse>(
      endpoints.movie.nowPlaying,
    );
    return response.data;
  }

  public async getTopRated() {
    const response = await apiClient.get<TopRatedMovieResponse>(
      endpoints.movie.topRated,
    );
    return response.data;
  }
}
export const movieService = MovieService.getInstance();
