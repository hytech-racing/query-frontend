import React, { useState } from "react";
import { Autocomplete, Button } from "@mantine/core";
import "@/css/SchemaSearch.css";

interface SchemaSearch {
  schemas: string[];
}

const SchemaSearch: React.FC<SchemaSearch> = ({ schemas }) => {
  const [value, setValue] = useState<string>("");
  const [selectedSchema, setSelected] = useState<string[]>([]);

  const filteredSchemas = schemas.filter((schema) =>
    schema.toLowerCase().includes(value.toLowerCase()),
  );

  const addSchema = (newSchema: string) => {
    if (!selectedSchema.includes(newSchema)) {
      setSelected([...selectedSchema, newSchema]);
    } else {
      alert("Schema already selected!");
    }
  };

  const clearSchema = () => {
    setSelected([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filteredSchemas.length > 0) {
      setValue(filteredSchemas[0]);
      addSchema(filteredSchemas[0]);
    }
  };

  return (
    <div>
      <Autocomplete
        label="Search by Schema"
        placeholder="Start typing a schema name"
        data={filteredSchemas}
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
      />
      <br />
      {selectedSchema.length > 0 && (
        <div>
          <label>Selected Schema</label>
          <ul>
            {selectedSchema.map((str, index) => (
              <li key={index}>{str}</li>
            ))}
          </ul>
          <Button className="cancel-button" onClick={clearSchema}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default SchemaSearch;
