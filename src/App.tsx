import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import "@/css/App.css";


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        <header className="navbar">
          <Navbar />
        </header>

        <div className="main-content">
          <SearchBar />
        </div>

        <footer className="footer">
            <h3>made by Frontend team 2024</h3>
          </footer>
      </div>
      
      {/* <PreviewCard /> */}
    </MantineProvider>
  );
}
