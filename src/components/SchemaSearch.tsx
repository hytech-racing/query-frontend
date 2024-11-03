import React, { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import "@/css/SchemaSearch.css";

interface SchemaSearch {
  schemas: string[];
  clear: boolean;
}

const SchemaSearch: React.FC<SchemaSearch> = ({ schemas, clear }) => {
  const [value, setValue] = useState<string>("");
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);

  const filteredSchemas = schemas.filter((schema) =>
    schema.toLowerCase().includes(value.toLowerCase()),
  );
  

  const clearSchema = () => {
    setValue("");
    setSelectedSchemas([])
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filteredSchemas.length > 0) {
      setValue(filteredSchemas[0]);
      setValue("")
    }
  };

  useEffect(() => {
    clearSchema();
  }, [clear]);

  return (
    <div className="schemasearchbutton">
      <MultiSelect
        label="Schema"
        placeholder="Schema name"
        data={filteredSchemas}
        onKeyDown={handleKeyDown}
        value={selectedSchemas}
        onChange={setSelectedSchemas}
        searchable
        size="xs"
      />
    </div>
  );
};

export default SchemaSearch;
