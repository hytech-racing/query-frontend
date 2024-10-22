import React, { useState } from "react";
import { Autocomplete } from "@mantine/core";
import "@/css/SchemaSearch.css";

///Add feature to select multiple schemas

// 1. Once there is a valid schema in input and we press enter again, append selected schema onto
// might wanna store it into some variable so that later, you can request these files with these
// schemas from the server
// 2. Look at FileUpload Branch functionality for logic to see and unhide
// 3. Look at API POST requst in FileUpload branch to see the logic and syntax

interface SchemaSearch {
  schemas: string[];
}

const SchemaSearch: React.FC<SchemaSearch> = ({ schemas }) => {
  const [value, setValue] = useState<string>("");
  const [selectedSchema, setSelected] = useState<string[]>([]); //will contain the selected schemas

  const filteredSchemas = schemas.filter((schema) =>
    schema.toLowerCase().includes(value.toLowerCase()),
  );

  const addSchema = (newSchema: string) => {
    //adds selected schema to a string array
    if (!selectedSchema.includes(newSchema)) {
      setSelected([...selectedSchema, newSchema]);
    } else {
      alert("Schema already selected!");
    }
  };

  const clearSchema = () => {
    setSelected([]);
  };

  //Allows us to press enter and autocomplete
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filteredSchemas.length > 0) {
      setValue(filteredSchemas[0]);
      addSchema(filteredSchemas[0]); //add it to the list that contains the schemas selected
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
      <h4>Selected Schema</h4>
      {selectedSchema.map((str, index) => (
        <p key={index}>{str}</p>
      ))}
      <button className="cancel-button" onClick={clearSchema}>
        Cancel
      </button>
    </div>
  );
};
//gotta figure out a way to hide the selected schema section until after a schema has been selected
export default SchemaSearch;
