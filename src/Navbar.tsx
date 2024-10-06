import "@mantine/core/styles.css";
import {} from "@mantine/core";

import "./css/Navbar.css";
import favicon from "../public/favicon.ico";

import { useState } from "react";

const mainLinksData = [
  { name: "Hytech", url: "https://hytechracing.gatech.edu/" },
  { name: "Hytech2", url: "https://hytechracing.gatech.edu/" },
  { name: "Hytech3", url: "https://hytechracing.gatech.edu/" },
];

export default function Navbar() {
  const hytechName = "Hytech Frontend <3";
  const [activeLink, setActiveLink] = useState();
  const links = mainLinksData.map(({ name, url }) => (
    <a
      key={name}
      className={`nav-link ${activeLink === name ? "active" : ""}`}
      // style={linkStyle(activeLink === link)}
      // data-active={activeLink === link || undefined}
      href={url}
      onClick={() => {
        setActiveLink(name);
      }}
    >
      {name}
    </a>
  ));

  return (
    <nav>
      <img src={favicon} alt="Logo" className="navbar-icon" />
      {links}
      {/* Optionally render active link or other content here */}
      <h3 className="hytechName">{hytechName}</h3>
    </nav>
  );
}
