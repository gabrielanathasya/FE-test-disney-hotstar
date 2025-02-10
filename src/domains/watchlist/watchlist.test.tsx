import { render, screen } from "@testing-library/react";
import { useWatchlist } from "@/hooks/useWatchlist";
import Watchlist from ".";
import { mockMovies } from "@/mocks/mockData";

jest.mock("@/hooks/useWatchlist", () => ({
  useWatchlist: jest.fn(),
}));

jest.mock("./components/empty-state", () => {
  return function MockEmptyState() {
    return <div data-testid="empty-state">Empty State</div>;
  };
});

jest.mock("../../components/poster-grid", () => {
  return function MockPosterGrid(props: any) {
    return <div data-testid="poster-grid">{props.data.length} items</div>;
  };
});

describe("Watchlist Component", () => {
  it("renders empty state when watchlist is empty", () => {
    (useWatchlist as jest.Mock).mockReturnValue({ watchlist: [] });
    render(<Watchlist />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("poster-grid")).not.toBeInTheDocument();
  });

  it("renders watchlist items when data exists", () => {
    (useWatchlist as jest.Mock).mockReturnValue({
      watchlist: mockMovies,
    });
    render(<Watchlist />);

    expect(screen.getByTestId("poster-grid")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });

  it("displays correct title", () => {
    (useWatchlist as jest.Mock).mockReturnValue({ watchlist: [] });
    render(<Watchlist />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Watchlist",
    );
  });
});
