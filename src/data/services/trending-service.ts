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
    const response = await apiClient.get<TrendingResponse>(endpoints.trending);
    return response.data;
  }
}
export const trendingService = TrendingService.getInstance();
