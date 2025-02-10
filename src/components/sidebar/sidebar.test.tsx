import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/components/sidebar";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("./components/menu-item", () => ({
  __esModule: true,
  default: ({ text, isExpanded }: any) => (
    <div data-testid="menu-item" data-expanded={isExpanded}>
      {text}
    </div>
  ),
}));

describe("Sidebar", () => {
  it("renders logo and menu items", () => {
    render(<Sidebar />);

    expect(screen.getByAltText("disney plus hotstar logo")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Watchlist")).toBeInTheDocument();
  });

  it("expands on mouse enter and collapses on mouse leave", () => {
    render(<Sidebar />);

    const nav = screen.getByRole("navigation");
    const menuItems = screen.getAllByTestId("menu-item");

    fireEvent.mouseEnter(nav);
    menuItems.forEach((item) => {
      expect(item).toHaveAttribute("data-expanded", "true");
    });

    fireEvent.mouseLeave(nav);
    menuItems.forEach((item) => {
      expect(item).toHaveAttribute("data-expanded", "false");
    });
  });
});
