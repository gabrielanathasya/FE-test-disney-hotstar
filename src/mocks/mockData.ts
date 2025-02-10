import { Movie, MovieDetail } from "@/types/movies";
import {
  EpisodeDetail,
  SeasonDetail,
  TvShow,
  TVShowDetail,
} from "@/types/tv-shows";

export const mockMovie: Movie = {
  id: 1,
  title: "Inception",
  original_title: "Inception",
  poster_path: "/poster.jpg",
  backdrop_path: "/backdrop.jpg",
  overview: "Test overview",
  release_date: "2010-07-16",
  vote_average: 8.8,
  media_type: "movie",
  adult: false,
  genre_ids: [28, 878, 12],
  original_language: "en",
  popularity: 198.456,
  video: false,
  vote_count: 32456,
};

export const mockMovie2: Movie = {
  id: 2,
  title: "Dark Knight",
  original_title: "Inception",
  poster_path: "/poster.jpg",
  backdrop_path: "/backdrop.jpg",
  overview: "Test overview",
  release_date: "2010-07-16",
  vote_average: 8.8,
  media_type: "movie",
  adult: false,
  genre_ids: [28, 878, 12],
  original_language: "en",
  popularity: 198.456,
  video: false,
  vote_count: 32456,
};

export const mockTvShow: TvShow = {
  id: 2,
  name: "Westworld",
  original_name: "Westworld",
  poster_path: "/poster.jpg",
  backdrop_path: "/backdrop.jpg",
  overview: "Test overview",
  first_air_date: "2016-10-02",
  vote_average: 8.1,
  media_type: "tv",
  original_language: "en",
  genre_ids: [10765, 37],
  origin_country: "US",
  popularity: 123.456,
  vote_count: 7845,
  adult: false,
};

export const mockMovies: Movie[] = [mockMovie, mockMovie2];
export const mockTvShows: TvShow[] = [mockTvShow];

export const mockTVShowDetail: TVShowDetail = {
  adult: false,
  backdrop_path: "/backdrop.jpg",
  created_by: [
    {
      id: 1,
      credit_id: "credit123",
      name: "John Creator",
      gender: 2,
      profile_path: "/profile.jpg",
    },
  ],
  episode_run_time: [45],
  first_air_date: "2024-01-01",
  genres: [
    { id: 1, name: "Drama" },
    { id: 2, name: "Sci-Fi" },
  ],
  homepage: "https://example.com",
  id: 12345,
  in_production: true,
  languages: ["en"],
  last_air_date: "2024-02-10",
  last_episode_to_air: null,
  next_episode_to_air: null,
  name: "Test TV Show",
  networks: [
    {
      id: 1,
      name: "Test Network",
      logo_path: "/logo.png",
      origin_country: "US",
    },
  ],
  number_of_episodes: 10,
  number_of_seasons: 1,
  origin_country: ["US"],
  original_language: "en",
  original_name: "Test TV Show Original",
  overview: "A comprehensive test TV show overview",
  popularity: 856.3,
  poster_path: "/poster.jpg",
  production_companies: [
    {
      id: 1,
      logo_path: "/company-logo.png",
      name: "Test Productions",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  seasons: [
    {
      air_date: "2024-01-01",
      episode_count: 10,
      id: 1,
      name: "Season 1",
      overview: "First season overview",
      poster_path: "/season1-poster.jpg",
      season_number: 1,
    },
  ],
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Returning Series",
  tagline: "Test tagline",
  type: "Scripted",
  vote_average: 8.5,
  vote_count: 1000,
};

export const mockMovieDetail: MovieDetail = {
  adult: false,
  backdrop_path: "/backdrop.jpg",
  belongs_to_collection: {
    id: 1,
    name: "Test Collection",
    poster_path: "/collection-poster.jpg",
    backdrop_path: "/collection-backdrop.jpg",
  },
  budget: 150000000,
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
  ],
  homepage: "https://example.com",
  id: 12345,
  imdb_id: "tt1234567",
  original_language: "en",
  original_title: "Test Movie Original",
  overview: "A comprehensive test movie overview",
  popularity: 945.7,
  poster_path: "/poster.jpg",
  production_companies: [
    {
      id: 1,
      logo_path: "/company-logo.png",
      name: "Test Studios",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2024-02-10",
  revenue: 500000000,
  runtime: 142,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  tagline: "Test movie tagline",
  title: "Test Movie",
  video: false,
  vote_average: 8.5,
  vote_count: 2000,
};

export const mockEpisodeDetail: EpisodeDetail = {
  air_date: "2024-01-01",
  episode_number: 1,
  id: 1,
  name: "Pilot",
  overview: "Test episode overview",
  production_code: "101",
  runtime: 45,
  season_number: 1,
  show_id: 12345,
  still_path: "/episode1-still.jpg",
  vote_average: 8.5,
  vote_count: 100,
  crew: [
    {
      job: "Director",
      department: "Directing",
      credit_id: "credit123",
      adult: false,
      gender: 1,
      id: 456,
      known_for_department: "Directing",
      name: "Jane Director",
      original_name: "Jane Director",
      popularity: 15.2,
      profile_path: "/director-profile.jpg",
    },
  ],
  guest_stars: [
    {
      character: "Guest Character",
      credit_id: "credit789",
      order: 1,
      adult: false,
      gender: 2,
      id: 789,
      known_for_department: "Acting",
      name: "Guest Star",
      original_name: "Guest Star",
      popularity: 10.5,
      profile_path: "/guest-profile.jpg",
    },
  ],
  images: {
    stills: [
      {
        aspect_ratio: 1.778,
        height: 1080,
        iso_639_1: "en",
        file_path: "/still-path.jpg",
        vote_average: 8.5,
        vote_count: 50,
        width: 1920,
      },
    ],
  },
  videos: {
    results: [
      {
        iso_639_1: "en",
        iso_3166_1: "US",
        name: "Episode Preview",
        key: "video123",
        site: "YouTube",
        size: 1080,
        type: "Trailer",
        official: true,
        published_at: "2024-01-01",
        id: "vid123",
      },
    ],
  },
};

export const mockSeasonDetail: SeasonDetail = {
  _id: "season_1",
  air_date: "2024-01-01",
  episodes: [mockEpisodeDetail],
  name: "Season 1",
  overview: "First season overview",
  id: 1,
  poster_path: "/season1-poster.jpg",
  season_number: 1,
  vote_average: 8.5,
  credits: {
    cast: [
      {
        adult: false,
        gender: 2,
        id: 123,
        known_for_department: "Acting",
        name: "John Actor",
        original_name: "John Actor",
        popularity: 25.4,
        profile_path: "/actor-profile.jpg",
        character: "Main Character",
        credit_id: "credit123",
        order: 1,
      },
    ],
    crew: [
      {
        adult: false,
        gender: 1,
        id: 456,
        known_for_department: "Directing",
        name: "Jane Director",
        original_name: "Jane Director",
        popularity: 15.2,
        profile_path: "/director-profile.jpg",
        credit_id: "credit456",
        department: "Directing",
        job: "Director",
      },
    ],
  },
  aggregate_credits: {
    cast: [
      {
        adult: false,
        gender: 2,
        id: 123,
        known_for_department: "Acting",
        name: "John Actor",
        original_name: "John Actor",
        popularity: 25.4,
        profile_path: "/actor-profile.jpg",
        roles: [
          {
            credit_id: "credit123",
            character: "Main Character",
            episode_count: 10,
          },
        ],
        total_episode_count: 10,
        order: 1,
      },
    ],
    crew: [
      {
        adult: false,
        gender: 1,
        id: 456,
        known_for_department: "Directing",
        name: "Jane Director",
        original_name: "Jane Director",
        popularity: 15.2,
        profile_path: "/director-profile.jpg",
        jobs: [
          {
            credit_id: "credit456",
            job: "Director",
            episode_count: 5,
          },
        ],
        department: "Directing",
        total_episode_count: 5,
      },
    ],
  },
  videos: {
    results: [
      {
        iso_639_1: "en",
        iso_3166_1: "US",
        name: "Season Trailer",
        key: "trailer123",
        site: "YouTube",
        size: 1080,
        type: "Trailer",
        official: true,
        published_at: "2024-01-01",
        id: "video123",
      },
    ],
  },
  images: {
    posters: [
      {
        aspect_ratio: 0.667,
        height: 1500,
        iso_639_1: "en",
        file_path: "/poster-path.jpg",
        vote_average: 8.5,
        vote_count: 100,
        width: 1000,
      },
    ],
  },
};

export const mockSeasons = [mockSeasonDetail];
