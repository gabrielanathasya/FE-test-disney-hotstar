import { ReactNode, useState } from "react";
import styles from "./Menu.module.css";

type Props = {
  isExpanded: boolean;
  iconFilled: ReactNode;
  iconOutlined: ReactNode;
  text: string;
  route: string;
};

export default function MenuItem({
  isExpanded,
  iconFilled,
  iconOutlined,
  text,
  route,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.menuItem}
    >
      {isHovered ? iconFilled : iconOutlined}
      <p className={`${isExpanded ? styles.expanded : ""} ${styles.menu}`}>
        {text}
      </p>
    </div>
  );
}
