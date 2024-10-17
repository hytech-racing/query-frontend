import "@mantine/core/styles.css";
import {} from "@mantine/core";
import "@/css/Navbar.css";
import { useState } from "react";

const mainLinksData = [
  { name: "Files", url: "https://hytechracing.gatech.edu/" },
  { name: "Documentation", url: "https://hytechracing.gatech.edu/" },
  { name: "Changelog", url: "https://hytechracing.gatech.edu/" },
];

export default function Navbar() {
  const hytechName = "HyTech Racing Checkpoint 1";
  const [activeLink, setActiveLink] = useState<string>("");
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
      <img src="/favicon.ico" alt="Logo" className="navbar-icon" />
      {links}
      {/* Optionally render active link or other content here */}
      <h3 className="hytechName">{hytechName}</h3>
    </nav>
  );
}
