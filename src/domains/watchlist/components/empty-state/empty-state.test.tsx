import { render, screen } from "@testing-library/react";
import EmptyState from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("EmptyState Component", () => {
  it("renders empty state correctly", () => {
    render(<EmptyState />);

    expect(screen.getByAltText("no result")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("No Data");
    expect(
      screen.getByText("Try adding something to your watchlist"),
    ).toBeInTheDocument();
  });
});
