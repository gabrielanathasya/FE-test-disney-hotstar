import { render, screen, fireEvent } from "@testing-library/react";
import PosterGrid from "@/components/poster-grid";
import { mockMovies } from "@/mocks/mockData";
import styles from "./poster-grid.module.css";

jest.mock("@/components/poster-image", () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div data-testid="poster-image">{data.title || data.name}</div>
  ),
}));

jest.mock("react-icons/ri", () => ({
  RiArrowLeftSLine: () => <div data-testid="left-arrow" />,
  RiArrowRightSLine: () => <div data-testid="right-arrow" />,
}));

describe("PosterGrid", () => {
  const defaultProps = {
    title: "Test Grid",
    data: mockMovies,
    currentPopOverId: null,
    setCurrentPopOverId: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 500,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
      configurable: true,
      value: 0,
    });
  });

  it("renders grid mode correctly", () => {
    render(<PosterGrid {...defaultProps} />);
    expect(screen.getByText("Test Grid")).toBeInTheDocument();
    expect(screen.getAllByTestId("poster-image")).toHaveLength(
      mockMovies.length,
    );
  });

  it("renders carousel mode correctly", () => {
    render(<PosterGrid {...defaultProps} isCarouselMode={true} />);
    expect(screen.getByText("Test Grid")).toHaveClass("titleCarousel");
  });

  it("shows/hides navigation arrows in carousel mode", () => {
    const { container } = render(
      <PosterGrid {...defaultProps} isCarouselMode={true} />,
    );

    const wrapper = screen.getByRole("heading").parentElement!;
    fireEvent.mouseEnter(wrapper);

    // initial state
    expect(screen.queryByTestId("left-arrow")).not.toBeInTheDocument();
    expect(screen.getByTestId("right-arrow")).toBeInTheDocument();

    // simulate scroll
    const content = container.querySelector(`.${styles.content}`);
    Object.defineProperty(content, "scrollLeft", { value: 100 });
    fireEvent.scroll(content!);

    expect(screen.getByTestId("left-arrow")).toBeInTheDocument();
  });

  it("handles scroll navigation", () => {
    const scrollToMock = jest.fn();
    HTMLDivElement.prototype.scrollTo = scrollToMock;

    render(<PosterGrid {...defaultProps} isCarouselMode={true} />);

    fireEvent.mouseEnter(screen.getByRole("heading").parentElement!);
    fireEvent.click(screen.getByLabelText("Scroll right"));

    expect(scrollToMock).toHaveBeenCalledWith({
      left: 500,
      behavior: "smooth",
    });
  });
});
