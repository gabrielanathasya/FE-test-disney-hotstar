import { render, screen, fireEvent } from "@testing-library/react";
import PopOver from "@/components/pop-over";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useRouter } from "next/navigation";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { TvShow } from "@/types/tv-shows";
import { Movie } from "@/types/movies";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@/hooks/useWatchlist", () => ({
  useWatchlist: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/watch-now-button", () => ({
  __esModule: true,
  default: () => <button data-testid="watch-now-button">Watch Now</button>,
}));

jest.mock("@/components/watchlist-button", () => ({
  __esModule: true,
  default: ({ handleClickWatchlist, isInWatchlist }: any) => (
    <button
      data-testid="watchlist-button"
      onClick={handleClickWatchlist}
      data-in-watchlist={isInWatchlist}
    >
      Add to Watchlist
    </button>
  ),
}));

jest.mock("@/components/fallback-image", () => ({
  __esModule: true,
  default: ({ name }: any) => <div data-testid="fallback-image">{name}</div>,
}));

describe("PopOver", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockWatchlistHook = {
    isInWatchlist: jest.fn(),
    addToWatchlist: jest.fn(),
    removeFromWatchlist: jest.fn(),
  };

  const mockMovie: Movie = {
    id: 1,
    title: "Inception",
    original_title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    overview: "Test overview",
    release_date: "2010-07-16",
    vote_average: 8.8,
    media_type: "movie",
    adult: false,
    genre_ids: [28, 878, 12], // Action, Science Fiction, Adventure
    original_language: "en",
    popularity: 198.456,
    video: false,
    vote_count: 32456,
  };
  const mockTvShow: TvShow = {
    id: 1,
    name: "Westworld",
    original_name: "Westworld",
    poster_path: "/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg",
    backdrop_path: "/yGNnjoIGOdQy3douq60tULY8teK.jpg",
    overview: "Test overview",
    first_air_date: "2016-10-02",
    vote_average: 8.1,
    media_type: "tv",
    original_language: "en",
    genre_ids: [10765, 37], // Sci-Fi & Fantasy, Western
    origin_country: "US",
    popularity: 123.456,
    vote_count: 7845,
    adult: false,
  };
  const defaultProps = {
    data: mockMovie,
    isVisible: true,
    onMouseLeave: jest.fn(),
    isCarouselMode: false,
    isFirst: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useWatchlist as jest.Mock).mockReturnValue(mockWatchlistHook);
    mockWatchlistHook.isInWatchlist.mockReturnValue(false);
  });

  it("renders correctly with movie data", () => {
    render(<PopOver {...defaultProps} />);

    expect(screen.getByAltText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
  });

  it("renders correctly with TV show data", () => {
    render(<PopOver {...defaultProps} data={mockTvShow} />);

    expect(screen.getByAltText("Westworld")).toBeInTheDocument();
    expect(screen.getByText("2016")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
  });

  it("handles mouse leave event", () => {
    const mockOnMouseLeave = jest.fn();
    render(<PopOver {...defaultProps} onMouseLeave={mockOnMouseLeave} />);

    fireEvent.mouseLeave(screen.getByRole("img").closest("div")!);
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  it("navigates correctly when clicked", () => {
    render(<PopOver {...defaultProps} />);

    fireEvent.click(screen.getByRole("img").closest("div")!);
    expect(mockRouter.push).toHaveBeenCalledWith("/movie/1");
  });
});
