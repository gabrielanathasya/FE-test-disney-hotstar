import { render, screen, fireEvent } from "@testing-library/react";
import BackdropScreen from "@/components/backdrop-screen";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { mockMovie, mockTvShow } from "@/mocks/mockData";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@/components/watch-now-button", () => ({
  __esModule: true,
  default: () => <button data-testid="watch-now-button">Watch Now</button>,
}));

jest.mock("@/components/watchlist-button", () => ({
  __esModule: true,
  default: () => (
    <button data-testid="watchlist-button">Add to Watchlist</button>
  ),
}));

jest.mock("@/components/featured-carousel", () => ({
  __esModule: true,
  default: () => <div data-testid="featured-carousel">Carousel</div>,
}));

jest.mock("@/components/fallback-image", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <div data-testid="fallback-image">{name}</div>
  ),
}));

describe("BackdropScreen", () => {
  const defaultProps = {
    mediaType: MediaTypeEnum.MOVIE,
    selectedData: mockMovie,
    handleClickWatchlist: jest.fn(),
    isCurrentDataInWatchList: false,
    isShowCarousel: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie data correctly", () => {
    render(<BackdropScreen {...defaultProps} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
    expect(screen.getByTestId("watch-now-button")).toBeInTheDocument();
    expect(screen.getByTestId("watchlist-button")).toBeInTheDocument();
  });

  it("renders TV show data correctly", () => {
    render(
      <BackdropScreen
        {...defaultProps}
        mediaType={MediaTypeEnum.TV}
        selectedData={mockTvShow}
      />,
    );

    expect(screen.getByText("Westworld")).toBeInTheDocument();
    expect(screen.getByText("2016")).toBeInTheDocument();
  });

  it("shows fallback image on error", () => {
    render(<BackdropScreen {...defaultProps} />);

    const image = screen.getByRole("img");
    fireEvent.error(image);

    expect(screen.getByTestId("fallback-image")).toBeInTheDocument();
  });

  it("renders carousel when isShowCarousel is true", () => {
    render(
      <BackdropScreen
        {...defaultProps}
        isShowCarousel={true}
        data={[mockMovie]}
      />,
    );
    expect(screen.getByTestId("featured-carousel")).toBeInTheDocument();
  });

  it("constructs correct image URL", () => {
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL =
      "https://image.tmdb.org/t/p/original";
    render(<BackdropScreen {...defaultProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/backdrop.jpg",
    );
  });
});
