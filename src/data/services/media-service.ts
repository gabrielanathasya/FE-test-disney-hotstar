import { MediaType } from "@/types/common";
import { endpoints } from "../consts/endpoints";
import { MediaTypeEnum } from "../enums/media-type";
import { apiClient } from "./api-client";
import { MovieDetail } from "@/types/movies";
import { TVShowDetail } from "@/types/tv-shows";

export class MediaService {
  private static instance: MediaService;

  public static getInstance(): MediaService {
    if (!this.instance) {
      this.instance = new MediaService();
    }
    return this.instance;
  }

  // GET example
  public async getMediaDetails(mediaType: MediaType, id: number) {
    const endpoint =
      mediaType === MediaTypeEnum.MOVIE
        ? `${endpoints.movie.detail}/${id}`
        : `${endpoints.series.detail}/${id}`;

    const response = await apiClient.get<MovieDetail | TVShowDetail>(endpoint);
    return response.data;
  }

  // POST example
  public async createReview(
    mediaType: MediaType,
    id: number,
    reviewData: { content: string; rating: number },
  ) {
    const endpoint = `/${mediaType}/${id}/reviews`;
    const response = await apiClient.post(endpoint, reviewData);
    return response.data;
  }

  // PUT example
  public async updateReview(
    reviewId: number,
    reviewData: { content: string; rating: number },
  ) {
    const endpoint = `/review/${reviewId}`;
    const response = await apiClient.put(endpoint, reviewData);
    return response.data;
  }

  // DELETE example
  public async deleteReview(reviewId: number) {
    const endpoint = `/review/${reviewId}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  }

  // Example with query parameters
  public async searchMedia(query: string, page: number = 1) {
    const response = await apiClient.get(endpoints.search.multi, {
      params: {
        query,
        page: String(page),
      },
    });
    return response.data;
  }
}

export const mediaService = MediaService.getInstance();
