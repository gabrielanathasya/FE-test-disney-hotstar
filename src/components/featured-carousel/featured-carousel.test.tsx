import { render, screen, fireEvent } from "@testing-library/react";
import FeaturedCarousel from "@/components/featured-carousel";
import styles from "./featured-carousel.module.css";
import { mockMovies } from "@/mocks/mockData";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("react-icons/ri", () => ({
  RiArrowLeftSLine: () => <div data-testid="left-arrow" />,
  RiArrowRightSLine: () => <div data-testid="right-arrow" />,
}));

describe("FeaturedCarousel", () => {
  const mockSetSelectedData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", { value: 500 });
    Object.defineProperty(HTMLElement.prototype, "scrollLeft", { value: 0 });
  });

  it("renders carousel items correctly", () => {
    render(
      <FeaturedCarousel
        data={mockMovies}
        selectedData={mockMovies[0]}
        setSelectedData={mockSetSelectedData}
      />,
    );

    expect(screen.getByAltText("Inception")).toBeInTheDocument();
  });

  it("handles item selection", () => {
    render(
      <FeaturedCarousel
        data={mockMovies}
        selectedData={mockMovies[0]}
        setSelectedData={mockSetSelectedData}
      />,
    );

    fireEvent.click(screen.getByAltText("Dark Knight"));
    expect(mockSetSelectedData).toHaveBeenCalledWith(mockMovies[1]);
  });

  it("scrolls content when arrow buttons are clicked", () => {
    const scrollToMock = jest.fn();
    Element.prototype.scrollTo = scrollToMock;

    render(
      <FeaturedCarousel
        data={mockMovies}
        selectedData={mockMovies[0]}
        setSelectedData={mockSetSelectedData}
      />,
    );

    const wrapper = screen.getByRole("button", { name: "Scroll right" });
    fireEvent.click(wrapper);

    expect(scrollToMock).toHaveBeenCalledWith({
      left: 500,
      behavior: "smooth",
    });
  });

  it("applies active class to selected item", () => {
    const { container } = render(
      <FeaturedCarousel
        data={mockMovies}
        selectedData={mockMovies[0]}
        setSelectedData={mockSetSelectedData}
      />,
    );

    const activeItem = container.querySelector(`.${styles.itemActive}`);
    expect(activeItem).toHaveAttribute(
      "class",
      expect.stringContaining("itemActive"),
    );
  });
});
