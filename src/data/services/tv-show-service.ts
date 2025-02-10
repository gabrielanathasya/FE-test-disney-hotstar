import { EpisodeDetail, SeasonDetail, TVShowDetail } from "@/types/tv-shows";
import { endpoints } from "../consts/endpoints";
import { FetchTvParams } from "../models/request/tv-request";
import {
  SearchTvShowResponse,
  TopRatedTvShowResponse,
} from "../models/response/tv-show-response";
import { apiClient } from "./api-client";

export class TvShowService {
  private static instance: TvShowService;

  public static getInstance(): TvShowService {
    if (!this.instance) {
      this.instance = new TvShowService();
    }
    return this.instance;
  }

  public async getDetail(id: number) {
    const response = await apiClient.get<TVShowDetail>(
      `${endpoints.series.detail}/${id}`,
    );
    return response.data;
  }

  public async search(params: FetchTvParams) {
    const response = await apiClient.get<SearchTvShowResponse>(
      endpoints.search.tv,
      {
        params,
      },
    );
    return response.data;
  }

  public async getSeasonDetail(id: number, seasonNumber: number) {
    const response = await apiClient.get<SeasonDetail>(
      `${endpoints.series.detail}/${id}/season/${seasonNumber}`,
    );
    return response.data;
  }

  public async getEpisodeDetail(
    id: number,
    seasonNumber: number,
    episodeNumber: number,
  ) {
    const response = await apiClient.get<EpisodeDetail>(
      `${endpoints.series.detail}/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
    );
    return response.data;
  }

  public async getTopRated() {
    const response = await apiClient.get<TopRatedTvShowResponse>(
      endpoints.series.topRated,
    );
    return response.data;
  }
}
export const tvShowService = TvShowService.getInstance();
