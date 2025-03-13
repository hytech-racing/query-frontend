import { useEffect, useState } from "react";
import { Select, Text, CopyButton, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";

export default function Docs() {
  const origin = window.location.origin;
  const navigate = useNavigate();
  const { version, repo } = useParams<{ version?: string; repo?: string }>();
  const [versionsCAN, setVersionsCAN] = useState<string[]>([]);
  const [versionsProto, setVersionsProto] = useState<string[]>([]);
  const [selectedCanVersion, setSelectedCanVersion] = useState<string | null>(
    null,
  );
  const [selectedProtoVersion, setSelectedProtoVersion] = useState<
    string | null
  >(null);
  const [canHtmlContent, setCanHtmlContent] = useState<string>("");
  const [protoHtmlContent, setProtoHtmlContent] = useState<string>("");

  const fetchVersions = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/docs/versions`,
    );
    const data = await response.json();
    setVersionsCAN(data.HT_CAN);
    setVersionsProto(data.HT_Proto);
  };

  const fetchVersion = async (version: string, repo: string) => {
    if (!version) return "<p>Select a version to view content.</p>";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/docs/versions/${version}/${repo}`,
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
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
    const searchParams = new URLSearchParams(window.location.search);
    const canVersion = searchParams.get("can");
    const protoVersion = searchParams.get("proto");

    if (canVersion) setSelectedCanVersion(canVersion);
    if (protoVersion) setSelectedProtoVersion(protoVersion);
    if (version && repo) {
      if (repo === "HT_CAN" && !canVersion) setSelectedCanVersion(version);
      if (repo === "HT_proto" && !protoVersion)
        setSelectedProtoVersion(version);
    }
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (selectedCanVersion) {
        const content = await fetchVersion(selectedCanVersion, "HT_CAN");
        setCanHtmlContent(content);
      }
      if (selectedProtoVersion) {
        const content = await fetchVersion(selectedProtoVersion, "HT_proto");
        setProtoHtmlContent(content);
      }
    };
    fetchContent();

    const params = new URLSearchParams();
    if (selectedCanVersion) params.set("can", selectedCanVersion);
    if (selectedProtoVersion) params.set("proto", selectedProtoVersion);
    navigate(`?${params.toString()}`, { replace: true });
  }, [selectedCanVersion, selectedProtoVersion, navigate]);

  const generateShareableUrl = () => {
    const params = new URLSearchParams();
    if (selectedCanVersion) params.set("can", selectedCanVersion);
    if (selectedProtoVersion) params.set("proto", selectedProtoVersion);
    return `${origin}${import.meta.env.BASE_URL}docs?${params.toString()}`;
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <div style={{ textAlign: "center" }}>
          <Text size="xs" fw={700} tt="capitalize">
            Currently viewing:
            {selectedCanVersion && ` HT_CAN ${selectedCanVersion.slice(0, -5)}`}
            {selectedProtoVersion &&
              ` & HT_Proto ${selectedProtoVersion.slice(0, -5)}`}
            {!selectedCanVersion &&
              !selectedProtoVersion &&
              " Nothing selected"}
          </Text>
          <div style={{ display: "flex", gap: 10 }}>
            <Select
              label="HT_CAN Documentation Version"
              placeholder="Select Documentation version"
              data={versionsCAN.map((version) => ({
                value: version,
                label: version.slice(0, -5),
              }))}
              size="xs"
              value={selectedCanVersion}
              onChange={(value) => setSelectedCanVersion(value)}
              allowDeselect
            />
            <Select
              label="HT_proto Documentation Version"
              placeholder="Select Documentation version"
              data={versionsProto.map((version) => ({
                value: version,
                label: version.slice(0, -5),
              }))}
              size="xs"
              value={selectedProtoVersion}
              onChange={(value) => setSelectedProtoVersion(value)}
              allowDeselect
            />
          </div>
          <CopyButton value={generateShareableUrl()}>
            {({ copied, copy }) => (
              <Button
                color={copied ? "green" : "#B3A369"}
                onClick={copy}
                size="compact-md"
                disabled={!selectedCanVersion && !selectedProtoVersion}
              >
                {copied ? "Copied" : "Copy URL"}
              </Button>
            )}
          </CopyButton>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100% - 100px)" }}>
        {selectedCanVersion && (
          <div
            style={{
              flex: 1,
              overflow: "scroll",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Text size="sm" fw={500}>
              HT_CAN Documentation
            </Text>
            <iframe
              srcDoc={canHtmlContent}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        )}
        {selectedProtoVersion && (
          <div
            style={{
              flex: 1,
              overflow: "scroll",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Text size="sm" fw={500}>
              HT_Proto Documentation
            </Text>
            <iframe
              srcDoc={protoHtmlContent}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        )}
        {!selectedCanVersion && !selectedProtoVersion && (
          <div style={{ flex: 1, textAlign: "center", paddingTop: "20px" }}>
            <Text>Select a version to view documentation</Text>
          </div>
        )}
      </div>
    </>
  );
}
