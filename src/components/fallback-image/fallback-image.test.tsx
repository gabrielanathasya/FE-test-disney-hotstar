import { render, screen } from "@testing-library/react";
import FallbackImage from "@/components/fallback-image";

jest.mock("react-icons/ri", () => ({
  RiImageLine: () => <div data-testid="image-icon" />,
}));

describe("FallbackImage", () => {
  it("renders image icon and name correctly", () => {
    render(<FallbackImage name="Test Image" />);

    expect(screen.getByTestId("image-icon")).toBeInTheDocument();
    expect(screen.getByText("Test Image")).toBeInTheDocument();
    expect(screen.getByText("Test Image")).toHaveClass("fallbackText");
  });
});
