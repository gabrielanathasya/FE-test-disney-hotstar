import { render, screen } from "@testing-library/react";
import EmptySearch from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("EmptySearch Component", () => {
  it("renders empty search state with query", () => {
    const query = "test query";
    render(<EmptySearch query={query} />);

    expect(screen.getByAltText("no result search")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(query);
    expect(
      screen.getByText(/Try searching for something else/),
    ).toBeInTheDocument();
  });
});
