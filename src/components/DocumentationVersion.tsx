import React from "react";
import { Select } from "@mantine/core";
import "@/css/DocumentationVersion.css";


interface DocumentationVersionProps {
  versions: string[];
}

const DocumentationVersion: React.FC<DocumentationVersionProps> = ({ versions }) => {
  return (
    <div className="documentationversion">
      <Select
        label="Documentation Version"
        placeholder="Select Documentation version"
        data={versions.map((version) => ({ value: version, label: version }))}
        size="xs"
        className="documentationselect"
      />
    </div>
  );
};

export default DocumentationVersion;
