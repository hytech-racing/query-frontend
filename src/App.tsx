import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { data } from "@/data/sampledata";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import "@/css/App.css";
import DataTable from "@/components/DataTable";
import PreviewCard from "@/components/PreviewCard";

export default function App() {
  const [filteredData, setFilteredData] = useState<MCAPFileInformation[]>(data);

  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        <header className="navbar">
          <Navbar />
        </header>

        <div className="main-content static">
          <div className="results-container">
            
            <div className="table-contain-result scrollable-container">
              <div className="scrollable">
                <DataTable data={filteredData} />
              </div>
            </div>

            <div className="search-container scrollable">
              <SearchBar setFilteredData={setFilteredData}/>
            </div>

          </div>
          <div className="preview-contain-result">
            <PreviewCard />
          </div>
        </div>
      </div>

      {/* <PreviewCard /> */}
    </MantineProvider>
  );
}
