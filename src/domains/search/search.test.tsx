import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockMovies, mockTvShows } from "@/mocks/mockData";
import { useDebounce } from "@/hooks/useDebounce";
import Search from ".";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: jest.fn(),
}));

jest.mock("@/components/poster-grid", () => {
  return function MockPosterGrid(props: any) {
    return <div data-testid="poster-grid">{props.title}</div>;
  };
});

jest.mock("./components/empty-search", () => {
  return function MockEmptySearch(props: any) {
    return <div data-testid="empty-search">No results for {props.query}</div>;
  };
});

describe("Search Component", () => {
  const mockRouter = {
    replace: jest.fn(),
  };
  const mockDebounce = jest.fn((callback) => callback());

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useDebounce as jest.Mock).mockReturnValue({ debounce: mockDebounce });
  });

  it("renders search input correctly", () => {
    render(<Search movies={[]} tvShow={[]} trending={[]} />);

    expect(
      screen.getByPlaceholderText("Movies, shows, and more"),
    ).toBeInTheDocument();
  });

  it("updates URL on search query change", () => {
    render(<Search movies={[]} tvShow={[]} trending={[]} />);

    const input = screen.getByPlaceholderText("Movies, shows, and more");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockRouter.replace).toHaveBeenCalledWith("/search?query=test");
  });

  it("displays movies and TV shows when results exist", () => {
    render(<Search movies={mockMovies} tvShow={mockTvShows} trending={[]} />);

    const grids = screen.getAllByTestId("poster-grid");
    expect(grids[0]).toHaveTextContent("Movies");
    expect(grids[1]).toHaveTextContent("TV Shows");
  });

  it("shows trending content when no search results", () => {
    render(<Search movies={[]} tvShow={[]} trending={mockMovies} />);

    expect(screen.getByTestId("poster-grid")).toHaveTextContent("Trending Now");
  });

  it("clears search input when close button clicked", () => {
    render(<Search movies={[]} tvShow={[]} trending={[]} />);

    const input = screen.getByPlaceholderText("Movies, shows, and more");
    fireEvent.change(input, { target: { value: "test" } });

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(input).toHaveValue("");
  });

  it("initializes with query from URL params", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("?query=initial"),
    );

    render(<Search movies={[]} tvShow={[]} trending={[]} />);

    expect(screen.getByPlaceholderText("Movies, shows, and more")).toHaveValue(
      "initial",
    );
  });
});
