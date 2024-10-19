import "@mantine/core/styles.css";
import {} from "@mantine/core";
import "@/css/Navbar.css";
import { NavLink } from "react-router-dom";

const BASE_URL = import.meta.env.BASE_URL;

const mainLinksData = [
  { name: "Files", url: BASE_URL },
  { name: "Documentation", url: `${BASE_URL}docs` },
  { name: "Changelog", url: `${BASE_URL}changelog` },
];

export default function Navbar() {
  const hytechName = "HyTech Racing Checkpoint 1";

  const links = mainLinksData.map(({ name, url }) => (
    <NavLink key={name} className="nav-link" to={url}>
      {name}
    </NavLink>
  ));

  return (
    <nav id="navbar">
      <img src="/favicon.ico" alt="Logo" className="navbar-icon" />
      {links}
      {/* Optionally render active link or other content here */}
      <h3 className="hytechName">{hytechName}</h3>
    </nav>
  );
}
