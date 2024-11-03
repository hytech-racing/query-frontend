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
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    location: "",
    eventType: "",
    beforeDate: "",
    afterDate: "",
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
    const { location, date, notes, eventType, filename } = filters;
    let { afterDate, beforeDate } = filters;
    
    beforeDate = beforeDate ? formatDate(beforeDate) : undefined;
    afterDate = afterDate ? formatDate(afterDate) : undefined;

    const buildParams = (additionalParams: Record<string, string> = {}) => {
      return {
        ...(location ? { location } : {}),
        ...(eventType ? { eventType } : {}),
        ...(date ? { date } : {}),
        ...(afterDate ? { after_date: afterDate } : {}),
        ...(beforeDate ? { before_date: beforeDate } : {}),
        ...additionalParams,
      };
    };

    if (!notes && !filename) {
      const params = buildParams();
      const queryString = new URLSearchParams(params).toString();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v2/mcaps?${queryString}`,
      );
      const data = await res.json();
      return data.data;
    }

    const promises: Promise<Response>[] = [];

    if (notes) {
      const paramsNotes = buildParams({ notes });
      const queryStringNotes = new URLSearchParams(paramsNotes).toString();
      promises.push(
        fetch(
          `${import.meta.env.VITE_API_URL}/api/v2/mcaps?${queryStringNotes}`,
        ),
      );
    }

    if (filename) {
      const paramsFilename = buildParams({ filename });
      const queryStringFilename = new URLSearchParams(
        paramsFilename,
      ).toString();
      promises.push(
        fetch(
          `${import.meta.env.VITE_API_URL}/api/v2/mcaps?${queryStringFilename}`,
        ),
      );
    }

    const results = await Promise.all(promises);
    const data = await Promise.all(results.map((res) => res.json()));

    const combinedData = data.flatMap((entry) => entry.data || []);

    const uniqueData = Array.from(
      new Set(combinedData.map((item) => item.id)),
    ).map((id) => combinedData.find((item) => item.id === id));

    return uniqueData;
  };

  const assignData = async () => {
    const apiData = await Promise.all(
      location.map(async (loc: string) => await fetchData({ location: loc })),
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

  useEffect(() => {
    assignData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(searchFilters);
      // console.log(data);
      const sortedData = data.sort(
        (a: MCAPFileInformation, b: MCAPFileInformation) => {
          const [monthA, dayA, yearA] = a.date.split("-");
          const [monthB, dayB, yearB] = b.date.split("-");
          const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

          return dateB.getTime() - dateA.getTime();
        },
      );
      setFilteredData(sortedData);
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
