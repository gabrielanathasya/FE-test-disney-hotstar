import { render, screen, fireEvent } from "@testing-library/react";
import PopOver from "@/components/pop-over";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useRouter } from "next/navigation";
import { mockMovie, mockTvShow } from "@/mocks/mockData";

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
