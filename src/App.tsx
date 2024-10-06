import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Navbar from "./Navbar.tsx";
import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import "./css/App.css";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        {/* Navbar at the top */}
        <header className="navbar">
          <Navbar />
        </header>

        {/* Search bar right below the navbar */}
        <div className="search-bar">
          <SearchBar />
        </div>

        {/* Two column layout for DataTable and an empty component */}
        <div className="main-content">
          <div className="data-table">
            <DataTable />
          </div>
          <aside className="side-component">
            <p>This is an empty component for the side.</p>
          </aside>
        </div>

        <footer className="footer">
          <h3>Content, layout, design: Hytech Frontend Team</h3>
        </footer>
      </div>
    </MantineProvider>
  );
}
