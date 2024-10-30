import React, { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import "@/css/SchemaSearch.css";

interface SchemaSearch {
  schemas: string[];
  clear: boolean;
}

const SchemaSearch: React.FC<SchemaSearch> = ({ schemas, clear }) => {
  const [value, setValue] = useState<string>("");
  //const [selectedSchema, setSelected] = useState<string[]>([]);

  const filteredSchemas = schemas.filter((schema) =>
    schema.toLowerCase().includes(value.toLowerCase()),
  );
  {
    /*
  const addSchema = (newSchema: string) => {
    if (!selectedSchema.includes(newSchema)) {
      setSelected([...selectedSchema, newSchema]);
    } else {
      alert("Schema already selected!");
    }
  };
  */
  }

  const clearSchema = () => {
    //setSelected([]);
    setValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filteredSchemas.length > 0) {
      setValue(filteredSchemas[0]);
      //addSchema(filteredSchemas[0]);
    }
  };

  useEffect(() => {
    clearSchema();
  }, [clear]);

  return (
    <div>
      <MultiSelect
        label="Schema"
        placeholder="Schema name"
        data={filteredSchemas}
        onKeyDown={handleKeyDown}
        searchable
        size="xs"
      />
      <br />
      {/*
      {selectedSchema.length > 0 && (
        <div>
          <label>Selected Schema</label>
          <ul>
            {selectedSchema.map((str, index) => (
              <li key={index}>{str}</li>
            ))}
          </ul>
         
        </div>
      )}
      */}
    </div>
  );
};

export default SchemaSearch;
