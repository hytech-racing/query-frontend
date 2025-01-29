import "@mantine/core/styles.css";
import "@/css/Navbar.css";
import { NavLink } from "react-router-dom";
import FileUpload from "@/components/FileUpload";

const mainLinksData = [
  { name: "Files", url: "/" },
  { name: "Documentation", url: `/docs` },
  { name: "Changelog", url: `/changelog` },
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
      <img
        src={`${import.meta.env.BASE_URL}favicon.ico`}
        alt="Logo"
        className="navbar-icon"
      />
      {links}

      {/* Once POST API is out -- Currently WIP */}
      <FileUpload uploadUrl={`${import.meta.env.VITE_API_URL}/api/v2/mcaps/bulk_upload`}/>

      {/* Optionally render active link or other content here */}
      <h3 className="hytechName">{hytechName}</h3>
    </nav>
  );
}
