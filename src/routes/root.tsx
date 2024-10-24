import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import "@/css/Root.css";
import DataTable from "@/components/DataTable";
import PreviewCard from "@/components/PreviewCard";
import { location } from "@/data/dataFilters";

export default function Root() {
  const [filteredData, setFilteredData] = useState<MCAPFileInformation[]>();
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [selectedData, setSelectedData] = useState<MCAPFileInformation>();

  useEffect(() => {
    const fetchData = async (loc: string) => {
      const res = await fetch(
        `http://localhost:8080/api/v2/mcap/get?location=${loc}`,
      );
      const data = await res.json();

      return data;
    };

    const assignData = async () => {
      const apiData = await Promise.all(
        location.map(async (loc: string) => await fetchData(loc)),
      );
      const validData = apiData.filter((data) => data !== null);

      const flattenedData = validData.flat();

      const sortedData = flattenedData.sort((a, b) => {
        const [monthA, dayA, yearA] = a.date.split("-");
        const [monthB, dayB, yearB] = b.date.split("-");
        const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

        return dateB.getTime() - dateA.getTime();
      });

      setFilteredData(sortedData);
    };

    assignData();
  }, []);

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
