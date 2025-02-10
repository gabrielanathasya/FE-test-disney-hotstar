import { render, screen, fireEvent } from "@testing-library/react";
import PosterImage from "@/components/poster-image";
import { mockMovie, mockTvShow } from "@/mocks/mockData";
import { MediaType } from "@/types/common";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock("../fallback-image", () => ({
  __esModule: true,
  default: ({ name }: any) => <div data-testid="fallback-image">{name}</div>,
}));

jest.mock("../pop-over", () => ({
  __esModule: true,
  default: ({ isVisible, data }: any) => (
    <div data-testid="pop-over" data-visible={isVisible}>
      {data.title || data.name}
    </div>
  ),
}));

describe("PosterImage", () => {
  const defaultProps = {
    data: mockMovie,
    currentPopOverId: null,
    setCurrentPopOverId: jest.fn(),
    mediaType: "movie" as MediaType,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL = "http://image.test";
  });

  it("renders movie poster correctly", () => {
    render(<PosterImage {...defaultProps} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "http://image.test/poster.jpg",
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Inception");
  });

  it("renders TV show poster correctly", () => {
    render(<PosterImage {...defaultProps} data={mockTvShow} mediaType="tv" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Westworld");
  });

  it("shows fallback image on error", () => {
    render(<PosterImage {...defaultProps} />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByTestId("fallback-image")).toBeInTheDocument();
  });

  it("handles mouse enter and shows popover", () => {
    const setCurrentPopOverId = jest.fn();
    render(
      <PosterImage
        {...defaultProps}
        setCurrentPopOverId={setCurrentPopOverId}
      />,
    );

    fireEvent.mouseEnter(screen.getByRole("img").parentElement!);
    expect(setCurrentPopOverId).toHaveBeenCalledWith(mockMovie.id);
  });
});
