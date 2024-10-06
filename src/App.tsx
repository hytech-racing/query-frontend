import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import Navbar from "@/Navbar.tsx";
import SearchBar from "@/components/SearchBar";
import "@/css/App.css";
import DataTable from "@/components/DataTable";
import PreviewCard from "@/components/PreviewCard";;


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        {/* Navbar at the top */}
        <header className="navbar">
          <Navbar />
        </header>

        <div className="column-content">
          {/* Two column layout for DataTable and an empty component */}
          <div className="main-content">
            <SearchBar />
          </div>
        </div>
        <footer className="footer">
            <h3>made by Frontend team 2024</h3>
          </footer>
      </div>
      
      {/* <PreviewCard /> */}
    </MantineProvider>
  );
}
