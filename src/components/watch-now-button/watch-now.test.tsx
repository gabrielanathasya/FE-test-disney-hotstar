import { render, screen } from "@testing-library/react";
import WatchNowButton from "@/components/watch-now-button";

jest.mock("react-icons/ri", () => ({
  RiPlayFill: () => <div data-testid="play-icon" />,
}));

describe("WatchNowButton", () => {
  it("renders with default props", () => {
    render(<WatchNowButton variant="primary" size="md" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("button", "buttonPrimary", "buttonSizeMd");
    expect(screen.getByText("Watch Now")).toBeInTheDocument();
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
  });

  it.each(["primary", "secondary", "inverse"] as const)(
    "applies correct %s variant class",
    (variant) => {
      render(<WatchNowButton variant={variant} size="md" />);
      expect(screen.getByRole("button")).toHaveClass(
        `button${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
      );
    },
  );
});
