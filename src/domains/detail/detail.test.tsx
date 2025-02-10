import { render, screen, fireEvent } from "@testing-library/react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { MediaTypeEnum } from "@/data/enums/media-type";
import Detail from ".";
import {
  mockMovieDetail,
  mockSeasonDetail,
  mockTVShowDetail,
} from "@/mocks/mockData";
jest.mock("@/hooks/useWatchlist", () => ({
  useWatchlist: jest.fn(),
}));

jest.mock("@/components/backdrop-screen", () => {
  return function MockBackdropScreen(props: any) {
    return (
      <div data-testid="backdrop-screen">
        <button
          onClick={props.handleClickWatchlist}
          data-testid="watchlist-button"
        >
          Add to Watchlist
        </button>
        {props.selectedData.title || props.selectedData.name}
      </div>
    );
  };
});

jest.mock("@/components/thumbnail", () => {
  return function MockThumbnail(props: any) {
    return <div data-testid="thumbnail">{props.alt}</div>;
  };
});

describe("Detail Component", () => {
  const mockWatchlistHook = {
    isInWatchlist: jest.fn(),
    addToWatchlist: jest.fn(),
    removeFromWatchlist: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useWatchlist as jest.Mock).mockReturnValue(mockWatchlistHook);
  });

  it("renders movie details correctly", () => {
    mockWatchlistHook.isInWatchlist.mockReturnValue(false);

    render(
      <Detail
        id={1}
        mediaType={MediaTypeEnum.MOVIE}
        data={mockMovieDetail}
        allSeasonDetails={[]}
      />,
    );

    expect(screen.getByTestId("backdrop-screen")).toHaveTextContent(
      mockMovieDetail.title,
    );
    expect(screen.queryByText("Episodes")).not.toBeInTheDocument();
  });

  it("renders TV show details with episodes", () => {
    mockWatchlistHook.isInWatchlist.mockReturnValue(false);

    render(
      <Detail
        id={2}
        mediaType={MediaTypeEnum.TV}
        data={mockTVShowDetail}
        allSeasonDetails={[mockSeasonDetail]}
      />,
    );

    expect(screen.getByTestId("backdrop-screen")).toHaveTextContent(
      mockTVShowDetail.name,
    );
    expect(screen.getByText("Episodes")).toBeInTheDocument();
    expect(screen.getByText(mockSeasonDetail.name)).toBeInTheDocument();
  });

  it("handles watchlist add functionality", () => {
    mockWatchlistHook.isInWatchlist.mockReturnValue(false);

    render(
      <Detail
        id={1}
        mediaType={MediaTypeEnum.MOVIE}
        data={mockMovieDetail}
        allSeasonDetails={[]}
      />,
    );

    fireEvent.click(screen.getByTestId("watchlist-button"));

    expect(mockWatchlistHook.addToWatchlist).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockMovieDetail.id,
        title: mockMovieDetail.title,
      }),
    );
  });

  it("handles watchlist remove functionality", () => {
    mockWatchlistHook.isInWatchlist.mockReturnValue(true);

    render(
      <Detail
        id={1}
        mediaType={MediaTypeEnum.MOVIE}
        data={mockMovieDetail}
        allSeasonDetails={[]}
      />,
    );

    fireEvent.click(screen.getByTestId("watchlist-button"));

    expect(mockWatchlistHook.removeFromWatchlist).toHaveBeenCalledWith(1);
  });

  it("allows switching between seasons in TV show view", () => {
    const mockMultipleSeasons = [
      { ...mockSeasonDetail, name: "Season 1" },
      { ...mockSeasonDetail, name: "Season 2" },
    ];

    render(
      <Detail
        id={2}
        mediaType={MediaTypeEnum.TV}
        data={mockTVShowDetail}
        allSeasonDetails={mockMultipleSeasons}
      />,
    );

    const season2Tab = screen.getByText("Season 2");
    fireEvent.click(season2Tab);

    expect(season2Tab.className).toContain("tabSelected");
  });

  it("displays episode details correctly", () => {
    render(
      <Detail
        id={2}
        mediaType={MediaTypeEnum.TV}
        data={mockTVShowDetail}
        allSeasonDetails={[mockSeasonDetail]}
      />,
    );

    const episode = mockSeasonDetail.episodes[0];
    expect(
      screen.getByRole("heading", { name: episode.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`S${episode.season_number} E${episode.episode_number}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`${episode.runtime}m`)).toBeInTheDocument();
    expect(screen.getByText(episode.overview)).toBeInTheDocument();
  });
});
