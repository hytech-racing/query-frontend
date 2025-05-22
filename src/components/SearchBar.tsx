import React from "react";

// Lists of available filter options
import { eventType, carModel } from "@/data/dataFilters";
import "@/css/SearchBar.css";
import { Button, MultiSelect } from "@mantine/core";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

// Search bar of the files page

interface SearchBarWithFilterProps {
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  distinctLocations: string[];
}

function SearchBarWithFilter({ setSearch, distinctLocations}: SearchBarWithFilterProps) {
  const [searchTerm, setSearchTerm] = useQueryState(
    "notes",
    parseAsString.withDefault(""),
  );
  const [selectedLocation, setSelectedLocation] = useQueryState(
    "location",
    parseAsString.withDefault(""),
  );
  const [selectedEventType, setSelectedEventType] = useQueryState(
    "event",
    parseAsString.withDefault(""),
  );
  const [beforeDate, setBeforeDate] = useQueryState(
    "beforeDate",
    parseAsString.withDefault(""),
  );
  const [afterDate, setAfterDate] = useQueryState(
    "afterDate",
    parseAsString.withDefault(""),
  );
  const [selectedSchemas, setSelectedSchemas] = useQueryState<string[]>(
    "schemas",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [selectedCarModel, setSelectedCarModel] = useQueryState(
    "carModel",
    parseAsString.withDefault(""),
  );

  // Left this here AND NOT in data filters because the retrieval method for available schemas will change
  const schemas = ["Schema1", "Schema2", "Schema3", "Schema4"];

  // Clear all filters and search term
  const handleClear = () => {
    setSearchTerm(null);
    setSelectedLocation(null);
    setSelectedEventType(null);
    setBeforeDate(null);
    setAfterDate(null);
    setSelectedSchemas(null);
    setSelectedCarModel(null);
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter Options */}
        <div className="filter-options">
          <label>
            Location:
            <select
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {distinctLocations.map((locationName, idx) => (
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
              onChange={(e) => setSelectedEventType(e.target.value)}
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
              onChange={(e) => setBeforeDate(e.target.value)}
              className="date-picker"
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              name="afterDate"
              value={afterDate}
              onChange={(e) => setAfterDate(e.target.value)}
              //value={afterDate.split("T")[0]}
              //onChange={(e) => setAfterDate(e.target.value + "T23:59:59Z07:00")}
              className="date-picker"
            />
          </label>

          <label>
            Car Model:
            <select
              name="car_model"
              value={selectedCarModel}
              onChange={(e) => setSelectedCarModel(e.target.value)}
              className="filter-select"
            >
              <option value="">All Car Models</option>
              {carModel.map((carmodel, idx) => (
                <option value={carmodel.toLowerCase()} key={idx}>
                  {carmodel}
                </option>
              ))}
            </select>
          </label>

          {/* Put this here to make the UI look consistent */}
          <label></label>

          <label>
            Schemas:
            <MultiSelect
              data={schemas}
              placeholder="DOES NOT WORK YET"
              value={selectedSchemas}
              onChange={setSelectedSchemas}
              searchable
              className="filter-select"
              size="xs"
            /> 
          </label>
          
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
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