import styles from "./watch-now-button.module.css";
import { RiPlayFill } from "react-icons/ri";

type Size = "md" | "lg";
type Variant = "primary" | "secondary" | "inverse";

type Props = {
  variant: Variant;
  size: Size;
};

export default function WatchNowButton({
  variant = "primary",
  size = "md",
}: Props) {
  const getVariantClass = (variant: Variant) => {
    switch (variant) {
      case "inverse":
        return styles.buttonInverse;
      case "secondary":
        return styles.buttonSecondary;
      case "primary":
      default:
        return styles.buttonPrimary;
    }
  };

  const getSizeClass = (size: Size) => {
    switch (size) {
      case "lg":
        return styles.buttonSizeLg;
      case "md":
      default:
        return styles.buttonSizeMd;
    }
  };

  return (
    <button
      className={`${styles.button} ${getVariantClass(variant)} ${getSizeClass(
        size,
      )}`}
    >
      <RiPlayFill size={size === "lg" ? 24 : 20} />
      <p>Watch Now</p>
    </button>
  );
}
