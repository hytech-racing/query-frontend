import React from "react";
import { MultiSelect } from "@mantine/core";
import "@/css/SchemaSearch.css";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

interface SchemaSearch {
  schemas: string[];
}

const SchemaSearch: React.FC<SchemaSearch> = ({ schemas }) => {
  const [selectedSchemas, setSelectedSchemas] = useQueryState<string[]>(
    "schemas",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  return (
    <div className="schemasearchbutton">
      <MultiSelect
        label="Schema"
        placeholder="Schema name"
        data={schemas}
        value={selectedSchemas}
        onChange={setSelectedSchemas}
        searchable
        size="xs"
      />
    </div>
  );
};

export default SchemaSearch;
