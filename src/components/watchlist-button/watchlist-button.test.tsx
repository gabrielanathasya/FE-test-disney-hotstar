import { render, screen, fireEvent } from "@testing-library/react";
import WatchlistButton from "@/components/watchlist-button";

jest.mock("react-icons/ri", () => ({
  RiCheckFill: () => <div data-testid="check-icon">Check</div>,
  RiAddFill: () => <div data-testid="add-icon">Add</div>,
}));

describe("WatchlistButton", () => {
  const defaultProps = {
    variant: "primary" as const,
    size: "md" as const,
    isInWatchlist: false,
    handleClickWatchlist: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<WatchlistButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("add-icon")).toBeInTheDocument();
  });

  it("shows check icon when isInWatchlist is true", () => {
    render(<WatchlistButton {...defaultProps} isInWatchlist={true} />);

    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("add-icon")).not.toBeInTheDocument();
  });

  it("shows add icon when isInWatchlist is false", () => {
    render(<WatchlistButton {...defaultProps} isInWatchlist={false} />);

    expect(screen.getByTestId("add-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
  });

  it("calls handleClickWatchlist when clicked", () => {
    const mockHandleClick = jest.fn();
    render(
      <WatchlistButton
        {...defaultProps}
        handleClickWatchlist={mockHandleClick}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  describe("variants", () => {
    it.each(["primary", "secondary", "inverse"] as const)(
      "applies correct class for %s variant",
      (variant) => {
        render(<WatchlistButton {...defaultProps} variant={variant} />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass(
          `button${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
        );
      },
    );
  });

  describe("sizes", () => {
    it.each(["md", "lg"] as const)(
      "applies correct class for %s size",
      (size) => {
        render(<WatchlistButton {...defaultProps} size={size} />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass(
          `buttonSize${size.charAt(0).toUpperCase() + size.slice(1)}`,
        );
      },
    );
  });
});
