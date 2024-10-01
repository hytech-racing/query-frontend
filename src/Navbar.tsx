import "@mantine/core/styles.css";
import {} from "@mantine/core";

import { useState } from "react";

const linkStyle = (isActive: boolean) => ({
  padding: "10px 20px",
  textDecoration: "none",
  color: isActive ? "##FDDA0D" : "#495057",
  backgroundColor: isActive ? "#FFBF00" : "transparent",
  borderRadius: "8px",
  fontWeight: isActive ? "bold" : "normal",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  display: "inline-block",
  marginRight: "10px",
});

const mainLinksData = ["Chart", "Visuals", "Search"];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Settings");

  const links = mainLinksData.map((link) => (
    <a
      // className={classes.link}
      style={linkStyle(activeLink === link)}
      data-active={activeLink === link || undefined}
      href="https://ui.mantine.dev/category/navbars/"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <nav>
      {links}
      {/* Optionally render active link or other content here */}
    </nav>
  );
}
