import React, { useState } from "react"; 
import { Select } from "@mantine/core";
import "@/css/DocumentationVersion.css";


interface DocumentationVersionProps {
  versions: string[];
}

const DocumentationVersion: React.FC<DocumentationVersionProps> = ({ versions }) => {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const handleVersionChange = (value: string | null) => {
    setSelectedVersion(value);
  };

  return (
    <div className="docs-selector-container">
      <div className="docs-selector">
        <Select
          label="Documentation Version"
          placeholder="Select Documentation version"
          data={versions.map((version) => ({ value: version, label: version }))}
          size="xs"
          id="docs-dropdown"
          onChange={handleVersionChange}
        />
      </div>
      {selectedVersion && (
        <iframe
          src={`/docs/${selectedVersion}.html`}
          title={`Documentation Version ${selectedVersion}`}
          id="docs-iframe"
        />
      )}
    </div>
  );
};

export default DocumentationVersion;