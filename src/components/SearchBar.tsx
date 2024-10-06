import React, { useState, useEffect } from "react";
import { data } from "@/data/sampledata";
import { eventType, location } from "@/data/dataFilters";
import "@/css/SearchBar.css";
// import DataCard from "./DataCard";
import DataTable from "@components/DataTable";
import PreviewCard from "./PreviewCard";

function SearchBarWithFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<MCAPFileInformation[]>(data);
  const [filters, setFilters] = useState({
    location: "",
    eventType: "",
    beforeDate: "",
    afterDate: "",
  });
  const style = {
  };
  useEffect(() => {
    // add code to get data from server here
    // setFilteredData(serverData)
  }, []);

  // Check if a date is in the valid range
  const isDateInRange = (
    dateStr: string,
    beforeDate: string,
    afterDate: string,
  ) => {
    const itemDate = new Date(dateStr);
    const before = beforeDate ? new Date(beforeDate) : null;
    const after = afterDate ? new Date(afterDate) : null;

    if (before && itemDate > before) return false;
    if (after && itemDate < after) return false;

    return true;
  };

  // Filter logic
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      // Match search term in multiple fields
      const matchesSearch =
        item.mcap_file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.matlab_file_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchTerm.toLowerCase());

      // Match filters
      const matchesLocation =
        filters.location === "" || item.location === filters.location;
      const matchesEventType =
        filters.eventType === "" || item.event_type === filters.eventType;
      const matchesDate = isDateInRange(
        item.date,
        filters.beforeDate,
        filters.afterDate,
      );

      return (
        matchesSearch && matchesLocation && matchesEventType && matchesDate
      );
    });
    setFilteredData(filtered);
  };

  // Trigger search on filter or search term change
  useEffect(() => {
    handleSearch();
  }, [searchTerm, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="Search">
      
      {/* Display Filtered Data */}
      <div className="results-container">
        <div>
            <div className="table" style={style}>
              <DataTable data={filteredData} />
            </div>
            <PreviewCard/>
        </div>
      </div>

      <div className="search-filter-container">
        <h1>Search and Filter Data</h1>

        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by file name or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        </div>
      </div>


      
    </div>
  );
}

export default SearchBarWithFilter;
