import { data } from "@/data/sampledata";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import "@/css/Root.css";
import DataTable from "@/components/DataTable";
import PreviewCard from "@/components/PreviewCard";

export default function Root() {
  const [filteredData, setFilteredData] = useState<MCAPFileInformation[]>(data);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [selectedData, setSelectedData] = useState<MCAPFileInformation>();

  return (
    <>
      <div className="results-container">
        <div className="table-contain-result">
          <DataTable
            data={filteredData}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            setSelectedData={setSelectedData}
          />
        </div>

        <SearchBar setFilteredData={setFilteredData} />
      </div>
      <div className="preview-contain-result">
        <PreviewCard selectedRow={selectedRow} selectedData={selectedData} />
      </div>
    </>
  );
}
