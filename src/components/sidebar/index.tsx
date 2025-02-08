"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import { MdHome, MdOutlineHome } from "react-icons/md";
import { MdSearch, MdOutlineSearch } from "react-icons/md";
import { MdMovie, MdOutlineMovie } from "react-icons/md";
import { useState } from "react";
import MenuItem from "./components/menu-item";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
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
      <div className={styles.iconContainer}>
        <MenuItem
          isExpanded={isExpanded}
          iconFilled={<MdSearch size={30} />}
          iconOutlined={<MdOutlineSearch size={30} />}
          text="Search"
          route="/"
        />
        <MenuItem
          isExpanded={isExpanded}
          iconFilled={<MdHome size={30} />}
          iconOutlined={<MdOutlineHome size={30} />}
          text="Home"
          route="/"
        />
        <MenuItem
          isExpanded={isExpanded}
          iconFilled={<MdMovie size={30} />}
          iconOutlined={<MdOutlineMovie size={30} />}
          text="Watchlist"
          route="/"
        />
      </div>
    </div>
  );
}
