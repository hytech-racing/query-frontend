import { useEffect, useState } from "react";
import { Select, Text } from "@mantine/core";

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
  };

  const fetchVersion = async () => {
    if (!selectedVersion) return "<p>Select a version to view content.</p>";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/docs/versions/${selectedVersion}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Fetched HTML Content: ", data.HTML);

      const updatedHtml = addSmoothScrollScriptToHead(data.HTML);
      return updatedHtml;
    } catch (error) {
      console.error("Error fetching version:", error);
      return "<p>Error loading content.</p>";
    }
  };

  const addSmoothScrollScriptToHead = (html: string) => {
    const script = `
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          document.querySelectorAll("a[href^='#']").forEach(anchor => {
            anchor.addEventListener("click", function(event) {
              event.preventDefault();
              const targetId = this.getAttribute("href").substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
              }
            });
          });
        });
      </script>
    `;
    const headEndIndex = html.indexOf("</head>");
    if (headEndIndex !== -1) {
      return html.slice(0, headEndIndex) + script + html.slice(headEndIndex);
    }
    return html;
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      const rawHtml = await fetchVersion();
      setHtmlContent(rawHtml);
    };

    if (selectedVersion) {
      fetchContent();
    }
  }, [selectedVersion]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Text size="xs" fw={700} tt="capitalize">
            Currently looking at ... {selectedVersion}
          </Text>
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
