import React, { useState } from "react";
import { eventType, location } from "@/data/dataFilters";
import "@/css/SearchBar.css";
import SchemaSearch from "@/components/SchemaSearch";
import { Button } from "@mantine/core";

interface SearchBarWithFilterProps {
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilter>>;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBarWithFilter({
  setSearchFilters,
  setSearch,
}: SearchBarWithFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const [afterDate, setAfterDate] = useState("");
  const [clearSchemas, setClearSchemas] = useState(false);

  const schemas = ["Schema1", "Schema2", "Schema3", "Schema4"];

  // Handle filter changes
  function handleFilterChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const { name } = e.target;
    const { value } = e.target;


    // Update local state based on input
    switch (name) {
      case "location":
        setSelectedLocation(value);
        break;
      case "eventType":
        setSelectedEventType(value);
        break;
      case "beforeDate":
        setBeforeDate(value);
        break;
      case "afterDate":
        setAfterDate(value);
        break;
      case "search_text":
        setSearchTerm(value);
        break;
      default:
        break;
    }
  }

  // Clear all filters and search term
  const handleClear = () => {
    setSearchTerm("");
    setSearchFilters({
      searchText: "",
      location: "",
      eventType: "",
      beforeDate: "",
      afterDate: "",
    });
    setSelectedLocation("");
    setSelectedEventType("");
    setBeforeDate("");
    setAfterDate("");
    setClearSchemas((prev) => !prev);
  };

  const handleSearch = () => {
    setSearch(true);
  };

  return (
    <div className="Search">
      {/* Display Filtered Data */}

      <div className="search-filter-container">
        <h1>Search and Filter Data</h1>
        {/* Search Bar */}
        <input
          type="text"
          name="search_text"
          className="search-bar"
          placeholder="Search by file name or notes..."
          value={searchTerm}
          onChange={(e) => {
            handleFilterChange(e);
          }}
        />

        {/* Filter Options */}
        <div className="filter-options">
          <label>
            Location:
            <select
              name="location"
              value={selectedLocation}
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
              value={selectedEventType}
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
            Start Date:
            <input
              type="date"
              name="beforeDate"
              value={beforeDate}
              onChange={handleFilterChange}
              className="date-picker"
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              name="afterDate"
              value={afterDate}
              onChange={handleFilterChange}
              className="date-picker"
            />
          </label>

          <SchemaSearch schemas={schemas} clear={clearSchemas} />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px"
          }}
        >
          {/* Clear Button */}
          <Button onClick={handleClear} size="xs" variant="light">
            Clear
          </Button>
          {/* Clear Button */}
          <Button onClick={handleSearch} size="xs">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchBarWithFilter;
