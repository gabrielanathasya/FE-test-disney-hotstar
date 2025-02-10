import { endpoints } from "../consts/endpoints";
import { TrendingResponse } from "../models/response/trending";
import { apiClient } from "./api-client";

export class TrendingService {
  private static instance: TrendingService;

  public static getInstance(): TrendingService {
    if (!this.instance) {
      this.instance = new TrendingService();
    }
    return this.instance;
  }

  public async getAll() {
    const response = await apiClient.get<TrendingResponse>(
      endpoints.trending.all,
    );
    return response.data;
  }

  public async getTrendingTv() {
    const response = await apiClient.get<TrendingResponse>(
      endpoints.trending.tv,
    );
    return response.data;
  }

  public async getTrendingMovie() {
    const response = await apiClient.get<TrendingResponse>(
      endpoints.trending.movie,
    );
    return response.data;
  }
}
export const trendingService = TrendingService.getInstance();
