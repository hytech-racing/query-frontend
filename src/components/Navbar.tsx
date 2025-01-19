import "@mantine/core/styles.css";
import "@/css/Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import FileUpload from "@/components/FileUpload"
import DocumentationVersion from "@/components/DocumentationVersion";

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


  //For Docs Version
  const location = useLocation(); 


  return (
    <nav id="navbar">
      <img
        src={`${import.meta.env.BASE_URL}favicon.ico`}
        alt="Logo"
        className="navbar-icon"
      />
      
       
      {location.pathname === "/docs" && (
        <DocumentationVersion versions={["1.0", "1.1", "2.0"]} /> // example versions. Replace with API later
      )}
      {links}

     

      <FileUpload uploadUrl={`${import.meta.env.VITE_API_URL}/api/v2/mcaps/bulk_upload`}/>

      {/* Optionally render active link or other content here */}
      <h3 className="hytechName">{hytechName}</h3>
    </nav>
  );
}
