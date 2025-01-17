import React from "react";
import { Select } from '@mantine/core';


interface DocumentationVersion {
    versions: string[];
}

const DocumentationVersion: React.FC<DocumentationVersion> = ({ versions }) => {
    return (
        <div className="documentationversion">
            <Select
                label="Version"
                placeholder="Select Documentation version"
                data={[1, 2, 3, 4, 5]} //{versions}
                size="xs"
            />
        </div>
    );
}

export default DocumentationVersion;