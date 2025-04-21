import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

// Layout of main.tsx

export default function Layout() {
  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        <header className="navbar">
          <Navbar />
        </header>

        <div className="main-content">
          <Outlet /> {/* Changes depending on what is in main.tsx */}
        </div>
      </div>
    </MantineProvider>
  );
}
