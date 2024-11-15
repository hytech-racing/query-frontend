import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import "@/css/Root.css";
import DataTable from "@/components/DataTable";
import PreviewCard from "@/components/PreviewCard";

export default function Root() {
  const [filteredData, setFilteredData] = useState<MCAPFileInformation[]>();
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [selectedData, setSelectedData] = useState<MCAPFileInformation>();
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    location: "",
    eventType: "",
    beforeDate: "",
    afterDate: "",
    searchText: "",
  });
  const [search, setSearch] = useState<boolean>(false);
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    if (month.length !== 2 || day.length !== 2 || year.length !== 4) {
      throw new Error(`Invalid date format: ${dateStr}`);
    }
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString();
  };

  const fetchData = async (filters: SearchFilter) => {
    const { location, date, eventType, searchText } = filters;
    let { afterDate, beforeDate } = filters;

    beforeDate = beforeDate ? formatDate(beforeDate) : undefined;
    afterDate = afterDate ? formatDate(afterDate) : undefined;
    const params = {
      ...(location ? { location } : {}),
      ...(eventType ? { eventType } : {}),
      ...(date ? { date } : {}),
      ...(afterDate ? { after_date: afterDate } : {}),
      ...(beforeDate ? { before_date: beforeDate } : {}),
      ...(searchText ? { search_text: searchText } : {}),
    };

    const queryString = new URLSearchParams(params).toString();

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v2/mcap/get?${queryString}`,
    );

    const data = await res.json();
    data.data.forEach((item: MCAPFileInformation, index: number) => {
      item.id = `new-id-${index}`;
    });
    return data.data;
  };

  const assignData = async () => {
    const data = await fetchData(searchFilters);
    console.log(data);
    const sortedData = data.sort(
      (a: MCAPFileInformation, b: MCAPFileInformation) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      },
    );
    setFilteredData(sortedData);
  };

  useEffect(() => {
    assignData();
  }, []);

  // Two useEffects bc of the way we are handling the Search Button D:
  useEffect(() => {
    const getData = async () => {
      if (search) {
        // Only fetch data when search is true
        const data = await fetchData(searchFilters);
        console.log(data);
        const sortedData = data.sort(
          (a: MCAPFileInformation, b: MCAPFileInformation) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          },
        );
        setFilteredData(sortedData);

        setSearch(false);
      }
    };
    getData();
  }, [search]);

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

        <SearchBar setSearchFilters={setSearchFilters} setSearch={setSearch} />
      </div>
      <PreviewCard selectedRow={selectedRow} selectedData={selectedData} />
    </>
  );
}
