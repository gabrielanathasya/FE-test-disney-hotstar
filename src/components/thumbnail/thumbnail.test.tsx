import { render, screen, fireEvent } from "@testing-library/react";
import Thumbnail from "@/components/thumbnail";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("../fallback-image", () => ({
  __esModule: true,
  default: ({ name }: any) => <div data-testid="fallback-image">{name}</div>,
}));

describe("Thumbnail", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL = "http://image.test/";
  });

  it("removes loading state after image loads", () => {
    render(<Thumbnail alt="Test Image" path="/test.jpg" />);

    fireEvent.load(screen.getByRole("img"));
    expect(screen.queryByTestId("skeleton-box")).not.toBeInTheDocument();
  });

  it("shows fallback on error", () => {
    render(<Thumbnail alt="Test Image" path="/test.jpg" />);

    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByTestId("fallback-image")).toBeInTheDocument();
  });

  it("renders fallback with no path", () => {
    render(<Thumbnail alt="Test Image" />);
    expect(screen.getByTestId("fallback-image")).toBeInTheDocument();
  });
});
