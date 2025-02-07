import { useEffect, useState } from "react";
import { Select } from "@mantine/core";

export default function Docs() {
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");

  const fetchVersions = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/docs/versions`,
    );
    const data = await response.json();
    setVersions(data.data);
    return data.message;
  };

  const fetchVersion = async () => {
    if (!selectedVersion) return "";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/docs/versions/${selectedVersion}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.HTML;
    } catch (error) {
      console.error("Error fetching version:", error);
      return "<p>Error loading content.</p>";
    }
  };

  useEffect(() => {
    fetchVersions();

    const fetchContent = async () => {
      const html = await fetchVersion();
      setHtmlContent(html);
    };

    if (selectedVersion) {
      fetchContent();
    }
  }, [selectedVersion]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Select
            label="Documentation Version"
            placeholder="Select Documentation version"
            data={versions.map((version) => ({
              value: version,
              label: version,
            }))}
            size="xs"
            onChange={(value) => setSelectedVersion(value)}
          />
        </div>
      </div>
      <div
        style={{
          overflow: "scroll",
          height: "100%",
          zIndex: 2,
        }}
      >
        {selectedVersion && (
          <iframe
            srcDoc={htmlContent}
            width={"100%"}
            height={"100%"}
            style={{
              border: "none",
            }}
          />
        )}
      </div>
    </>
  );
}
