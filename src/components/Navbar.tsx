import "@mantine/core/styles.css";
import "@/css/Navbar.css";
import { NavLink } from "react-router-dom";
import FileUpload from "@/components/FileUpload";
import Feedback from "@/components/Feedback";
import { Button } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";

// Navigation Bar
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
      <Button 
        variant="filled"
        component="a"
        target="_blank"
        href="https://wiki.hytechracing.org/books/software/page/query-frontend-demo-and-documentation">
          <IconHelp size="25"/>
      </Button>
      {links}

      {/* Once POST API is out -- Currently WIP */}
      <FileUpload uploadUrl={`${import.meta.env.VITE_API_URL}/api/v2/mcaps/bulk_upload`}/>
      <div style={{right: 0}}>
      <Feedback/>
      </div> 
      {/* Optionally render active link or other content here */}
      <h3 className="hytechName">{hytechName}</h3>
      
    </nav>
  );
}