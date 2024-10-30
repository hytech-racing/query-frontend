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
      default:
        break;
    }
  }

  // Clear all filters and search term
  const handleClear = () => {
    setSearchTerm("");
    setSearchFilters({
      notes: "",
      filename: "",
      location: "",
      eventType: "",
      beforeDate: "",
      afterDate: "",
    });
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedEventType("");
    setBeforeDate("");
    setAfterDate("");
    setClearSchemas((prev) => !prev);
  };

  const handleSearch = () => {
    setSearch((prev) => !prev);
  };

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
            Before Date:
            <input
              type="date"
              name="beforeDate"
              value={beforeDate}
              onChange={handleFilterChange}
              className="date-picker"
            />
          </label>

          <label>
            After Date:
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
          }}
        >
          {/* Clear Button */}
          <Button onClick={handleClear} size="xs">
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
