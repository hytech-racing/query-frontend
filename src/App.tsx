import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import "@/css/App.css";
import DataTable from "@/components/DataTable";
import PreviewCard from "./components/PreviewCard";
import { data } from "@/data/sampledata";
import { useState } from "react";

export default function App() {
  const [filteredData, setFilteredData] = useState<MCAPFileInformation[]>(data);

  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        <header className="navbar">
          <Navbar />
        </header>

        <div className="main-content">
          <div className="results-container">
            <div className="table-contain-result">
              <DataTable data={filteredData} />
            </div>

            <div className="preview-contain-result">
              <PreviewCard />
            </div>
          </div>
          <SearchBar setFilteredData={setFilteredData} />
        </div>
      </div>

      {/* <PreviewCard /> */}
    </MantineProvider>
  );
}
