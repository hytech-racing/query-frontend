import React, { useState } from "react";
import { eventType, location } from "@/data/dataFilters";
import "@/css/SearchBar.css";
import SchemaSearch from "@/components/SchemaSearch";

interface SearchBarWithFilterProps {
  setFilteredData: React.Dispatch<
    React.SetStateAction<MCAPFileInformation[] | undefined>
  >;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilter>>;
}

function SearchBarWithFilter({ setSearchFilters }: SearchBarWithFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  // const [filters] = useState({
  //   location: "",
  //   eventType: "",
  //   beforeDate: "",
  //   afterDate: "",
  // });

  // Check if a date is in the valid range
  // const isDateInRange = (
  //   dateStr: string,
  //   beforeDate: string,
  //   afterDate: string,
  // ) => {
  //   const itemDate = new Date(dateStr);
  //   const before = beforeDate ? new Date(beforeDate) : null;
  //   const after = afterDate ? new Date(afterDate) : null;

  //   if (before && itemDate > before) return false;
  //   if (after && itemDate < after) return false;

  //   return true;
  // };

  const schemas = ["Schema1", "Schema2", "Schema3", "Schema4"];

  // Filter logic
  // const handleSearch = () => {
  //   const filtered = data.filter((item) => {
  //     // Match search term in multiple fields
  //     const matchesSearch =
  //       item.mcap_file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.matlab_file_name
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase()) ||
  //       item.notes?.toLowerCase().includes(searchTerm.toLowerCase());

  //     // Match filters
  //     const matchesLocation =
  //       filters.location === "" ||
  //       item.location.toLowerCase() === filters.location.toLowerCase();
  //     const matchesEventType =
  //       filters.eventType.toLowerCase() === "" ||
  //       item.event_type?.toLowerCase() === filters.eventType.toLowerCase();
  //     const matchesDate = isDateInRange(
  //       item.date,
  //       filters.beforeDate,
  //       filters.afterDate,
  //     );

  //     return (
  //       matchesSearch && matchesLocation && matchesEventType && matchesDate
  //     );
  //   });
  //   setFilteredData(filtered);
  // };

  // Trigger search on filter or search term change
  // useEffect(() => {
  //   handleSearch();
  // }, [searchTerm, filters]);

  // Handle filter changes
  function handleFilterChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const { name } = e.target;
    const { value } = e.target;

    const filt: SearchFilter = {
      notes: "",
      filename: "",
    };

    if (name == "") {
      filt.notes = value;
      filt.filename = value;
    }

    // console.log("search", filt);

    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      notes: filt.notes,
      filename: filt.filename,
      [name]: value,
    }));
  }

  return (
    <div className="Search">
      {/* Display Filtered Data */}

      <div className="search-filter-container">
        <h1>Search and Filter Data</h1>

        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by file name or notes..."
          value={searchTerm}
          onChange={(e) => {
            handleFilterChange(e);
            setSearchTerm(e.target.value);
          }}
        />

        {/* Filter Options */}
        <div className="filter-options">
          <label>
            Location:
            <select
              name="location"
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {location.map((locationName, idx) => (
                <option value={locationName.toLowerCase()} key={idx}>
                  {locationName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Event Type:
            <select
              name="eventType"
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Event Types</option>
              {eventType.map((eventName, idx) => (
                <option value={eventName.toLowerCase()} key={idx}>
                  {eventName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Before Date:
            <input
              type="date"
              name="beforeDate"
              onChange={handleFilterChange}
              className="date-picker"
              placeholder="Filter by date"
            />
          </label>

          <label>
            After Date:
            <input
              type="date"
              name="afterDate"
              onChange={handleFilterChange}
              className="date-picker"
              placeholder="Filter by date"
            />
          </label>

          <SchemaSearch schemas={schemas} />
        </div>
      </div>
    </div>
  );
}

export default SearchBarWithFilter;
