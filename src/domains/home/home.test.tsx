import { render, screen } from "@testing-library/react";

import { useWatchlist } from "@/hooks/useWatchlist";
import { describe } from "node:test";
import Home from "@/domains/home";
import { mockMovies, mockTvShows } from "@/mocks/mockData";

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
        topRatedTvShow={mockTvShows}
        topRatedMovie={mockMovies}
        trendingTvShow={mockTvShows}
        trendingMovie={mockMovies}
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
