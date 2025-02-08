"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import { RiHomeLine, RiHomeFill, RiRssFill } from "react-icons/ri";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { RiMovieAiLine, RiMovieAiFill } from "react-icons/ri";
import { useState } from "react";
import MenuItem from "./components/menu-item";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <span
        className={`${isExpanded ? styles.expandedContainerBg : ""} ${
          styles.containerBg
        }`}
      />
      <div className={styles.logo}>
        <Image
          src="/images/disney-plus-hotstar-logo.svg"
          width={50}
          height={50}
          alt="disney plus hotstar logo"
        />
      </div>
      <div
        className={styles.iconContainer}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <MenuItem
          isExpanded={isExpanded}
          iconFilled={<RiSearchFill size={24} />}
          iconOutlined={<RiSearchLine size={24} />}
          text="Search"
          route="/"
        />
        <MenuItem
          isExpanded={isExpanded}
          iconFilled={<RiHomeFill size={24} />}
          iconOutlined={<RiHomeLine size={24} />}
          text="Home"
          route="/"
        />
        <MenuItem
          isExpanded={isExpanded}
          iconFilled={<RiMovieAiFill size={24} />}
          iconOutlined={<RiMovieAiLine size={24} />}
          text="Watchlist"
          route="/"
        />
      </div>
    </div>
  );
}
