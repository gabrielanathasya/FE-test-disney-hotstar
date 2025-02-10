import { render, screen, fireEvent } from "@testing-library/react";
import MenuItem from ".";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe("MenuItem", () => {
  const defaultProps = {
    isExpanded: false,
    iconFilled: <span data-testid="icon-filled">Filled</span>,
    iconOutlined: <span data-testid="icon-outlined">Outlined</span>,
    text: "Menu Text",
    route: "/test",
  };

  it("renders with default state", () => {
    render(<MenuItem {...defaultProps} />);

    expect(screen.getByTestId("icon-outlined")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-filled")).not.toBeInTheDocument();
    expect(screen.getByText("Menu Text")).toBeInTheDocument();
  });

  it("shows filled icon on hover", () => {
    render(<MenuItem {...defaultProps} />);

    fireEvent.mouseEnter(screen.getByRole("link").firstChild!);
    expect(screen.getByTestId("icon-filled")).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByRole("link").firstChild!);
    expect(screen.getByTestId("icon-outlined")).toBeInTheDocument();
  });

  it("applies expanded class when isExpanded is true", () => {
    render(<MenuItem {...defaultProps} isExpanded={true} />);
    expect(screen.getByText("Menu Text")).toHaveClass("expanded");
  });

  it("has correct href", () => {
    render(<MenuItem {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
  });
});
