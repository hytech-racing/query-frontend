import React, { useState, useEffect } from "react";
import { data } from "../data/sampledata";
import "../css/SearchBar.css";

function SearchBarWithFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<MCAPFileInformation[]>(data);
  const [filters, setFilters] = useState({
    location: "",
    eventType: "",
    beforeDate: "",
    afterDate: "",
  });

  // Function to check if a date is in the valid range
  const isDateInRange = (
    dateStr: string,
    beforeDate: string,
    afterDate: string,
  ) => {
    const itemDate = new Date(dateStr);
    const before = beforeDate ? new Date(beforeDate) : null;
    const after = afterDate ? new Date(afterDate) : null;

    if (before && itemDate > before) return false; // Exclude if after the "before" date
    if (after && itemDate < after) return false; // Exclude if before the "after" date

    return true;
  };

  // Filter logic
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      // Match search term in multiple fields (mcap_file_name, notes, etc.)
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
    <div>
      <h1>Search and Filter Data</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by file name or notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter Options */}
      <div>
        <label>
          Location:
          <select name="location" onChange={handleFilterChange}>
            <option value="">All Locations</option>
            <option value="MRDC">MRDC</option>
            <option value="Michigan">Michigan</option>
            <option value="Rome">Rome</option>
            <option value="SCC">SCC</option>
          </select>
        </label>

        <label>
          Event Type:
          <select name="eventType" onChange={handleFilterChange}>
            <option value="">All Event Types</option>
            <option value="acceleration">Acceleration</option>
            <option value="endurance">Endurance</option>
            <option value="skidpad">Skidpad</option>
            <option value="autocross">Autocross</option>
          </select>
        </label>

        <label>
          Before Date:
          <input
            type="date"
            name="beforeDate"
            onChange={handleFilterChange}
            placeholder="Filter by date"
          />
        </label>

        <label>
          After Date:
          <input
            type="date"
            name="afterDate"
            onChange={handleFilterChange}
            placeholder="Filter by date"
          />
        </label>
      </div>

      {/* Display Filtered Data */}
      <div>
        <h2>Filtered Results:</h2>
        {filteredData.length === 0 ? (
          <p>No results found</p>
        ) : (
          <div>
            {filteredData.map((item) => (
              <div className="item" key={item.id}>
                <p>
                  <strong>File Name:</strong> {item.mcap_file_name}
                </p>
                <p>
                  <strong>Matlab File Name:</strong> {item.matlab_file_name}
                </p>
                <p>
                  <strong>File ID:</strong> {item.id}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Event Type:</strong> {item.event_type}
                </p>
                <p>
                  <strong>Notes:</strong> {item.notes}
                </p>
                <p>
                  <strong>MCAP path:</strong> {item.mcap_path}
                </p>
                <p>
                  <strong>Mat path:</strong> {item.mat_path}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBarWithFilter;
