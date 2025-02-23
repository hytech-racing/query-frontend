import { useEffect, useState } from "react";
import { Select, Text, CopyButton, Button } from "@mantine/core";
import { useParams } from "react-router-dom";

export default function Docs() {
  const origin = window.location.origin;
  const { version, repo } = useParams<{ version?: string; repo?: string }>();
  const [versionsCAN, setVersionsCAN] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [versionsProto, setVersionsProto] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState<string>("");

  const fetchVersions = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/docs/versions`,
    );
    const data = await response.json();
    setVersionsCAN(data.HT_CAN);
    setVersionsProto(data.HT_Proto);
  };

  const fetchVersion = async () => {
    if (!selectedVersion) return "<p>Select a version to view content.</p>";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/docs/versions/${selectedVersion}/${selectedRepo}`,
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
    setSelectedVersion(version ?? null);
    setSelectedRepo(repo ?? null);
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
            Currently looking at ... {selectedVersion?.slice(0,-5)} at {selectedRepo}
          </Text>
          <div style={{ display: "flex", gap: 10 }}>
            <Select
              label="HT_CAN Documentation Version"
              placeholder="Select Documentation version"
              data={versionsCAN.map((version) => ({
                value: version,
                label: version.slice(0,-5),
              }))}
              size="xs"
              onChange={(value) => {
                setSelectedVersion(value);
                setSelectedRepo("HT_CAN");
              }}
            />
            <Select
              label="HT_proto Documentation Version"
              placeholder="Select Documentation version"
              data={versionsProto.map((version) => ({
                value: version,
                label: version.slice(0,-5),
              }))}
              size="xs"
              onChange={(value) => {
                setSelectedVersion(value);
                setSelectedRepo("HT_proto");
              }}
            />
          </div>
          <CopyButton
            value={`${origin}/docs/${selectedVersion}/${selectedRepo}`}
          >
            {({ copied, copy }) => (
              <Button
                color={copied ? "green" : "#B3A369"}
                onClick={copy}
                size="compact-md"
              >
                {copied ? "Copied" : "Copy URL"}
              </Button>
            )}
          </CopyButton>
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
