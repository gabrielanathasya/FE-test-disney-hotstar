import { render, screen } from "@testing-library/react";

import { useWatchlist } from "@/hooks/useWatchlist";
import { describe } from "node:test";
import Home from "@/domains/home";
import { TvShow } from "@/types/tv-shows";
import { Movie } from "@/types/movies";

jest.mock("@/hooks/useWatchlist", () => ({
  useWatchlist: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/backdrop-screen", () => {
  return function MockBackdropScreen(props: any) {
    return (
      <div data-testid="backdrop-screen">
        {props.selectedData.title || props.selectedData.name}
      </div>
    );
  };
});

jest.mock("@/components/poster-grid", () => {
  return function MockPosterGrid(props: any) {
    return <div data-testid="poster-grid">{props.title}</div>;
  };
});

describe("Home Component", () => {
  const mockTopRatedTvShow: TvShow[] = [
    {
      id: 63247,
      name: "Westworld",
      original_name: "Westworld",
      poster_path: "/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg",
      backdrop_path: "/yGNnjoIGOdQy3douq60tULY8teK.jpg",
      overview:
        "A dark odyssey about the dawn of artificial consciousness and the evolution of sin. Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite, no matter how noble or depraved, can be indulged.",
      first_air_date: "2016-10-02",
      vote_average: 8.1,
      media_type: "tv",
      original_language: "en",
      genre_ids: [10765, 37], // Sci-Fi & Fantasy, Western
      origin_country: "US",
      popularity: 123.456,
      vote_count: 7845,
      adult: false,
    },
  ];

  const mockTopRatedMovie: Movie[] = [
    {
      id: 762,
      title: "Inception",
      original_title: "Inception",
      poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      overview:
        "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: inception, the implantation of another person's idea into a target's subconscious.",
      release_date: "2010-07-16",
      vote_average: 8.8,
      media_type: "movie",
      adult: false,
      genre_ids: [28, 878, 12], // Action, Science Fiction, Adventure
      original_language: "en",
      popularity: 198.456,
      video: false,
      vote_count: 32456,
    },
  ];

  const mockWatchlistHook = {
    isInWatchlist: jest.fn(),
    addToWatchlist: jest.fn(),
    removeFromWatchlist: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useWatchlist as jest.Mock).mockReturnValue(mockWatchlistHook);
  });

  it("renders the home page with initial data", () => {
    render(
      <Home
        topRatedTvShow={mockTopRatedTvShow}
        topRatedMovie={mockTopRatedMovie}
        trendingTvShow={mockTopRatedTvShow}
        trendingMovie={mockTopRatedMovie}
      />,
    );

    expect(screen.getByTestId("backdrop-screen")).toHaveTextContent(
      "Westworld",
    );

    const posterGrids = screen.getAllByTestId("poster-grid");
    expect(posterGrids).toHaveLength(3);
    expect(posterGrids[0]).toHaveTextContent("Top Rated Movies & TV Series");
    expect(posterGrids[1]).toHaveTextContent("Top Rated Movies of the week");
    expect(posterGrids[2]).toHaveTextContent("Top Rated TV Series of the week");
  });
});
