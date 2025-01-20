import { useState } from "react";
import {
  Text,
  Button,
  Grid,
  Menu,
  rem,
  Table,
  ScrollArea,
  TextInput,
  Notification,
} from "@mantine/core";
import {
  IconDownload,
  IconChevronDown,
  IconFile,
  IconSearch,
} from "@tabler/icons-react";
import "@/css/PreviewCard.css";

interface PreviewCardProps {
  selectedRow?: string;
  selectedData: MCAPFileInformation | undefined;
}

function PreviewCard({ selectedData }: PreviewCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/mcaps/${selectedData?.id}`,
        {
          method: "DELETE",
        },
      );

        if (!response.ok) {
          if (response.status === 503) {
            const errorMsg = await response.text();
            setError(`Failed to delete: ${errorMsg} \nTry again in a few minutes!`);
            console.log(errorMsg);
          } else {
            const errorMsg = await response.text();
            setError(`Failed to delete: ${errorMsg}`);
            console.log(errorMsg);  
          }
        } else {
          setSuccess('File deleted successfully!');
        }
      } else {
        const result = await response.json();
        setSuccess("File deleted successfully!");
        console.log("Delete successful:", result);
      }
    } catch (error) {
      console.error("Error sending Delete request:", error);
      setError("An error occurred during file deletion.");
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Take out when API server team implements filename id in their get route
  const getFileNameWithoutExtension = (fileNameWithExtension: string) => {
    const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
    return lastDotIndex !== -1
      ? fileNameWithExtension.slice(0, lastDotIndex)
      : fileNameWithExtension;
  };

  const imageUrl =
    selectedData?.content_files?.vn_lat_lon_plot?.[0]?.signed_url ??
    "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67"; // Fallback to a default image if none exists.

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };
  return (
    <div className="preview-container">
      <Grid>
        <Grid.Col span={3} className="image-column">
          <img src={imageUrl} alt="Preview" className="preview-image" />
        </Grid.Col>
        <Grid.Col span={3} className="image-column">
          <img
            src="https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67"
            alt="Preview"
            className="preview-image"
          />
        </Grid.Col>
        <Grid.Col span={3} className="image-column">
          <SchemaTable></SchemaTable>
        </Grid.Col>
        <Grid.Col span={3} style={{ position: "relative", padding: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="md" fw={700}>
              run 2024-18-10.mcap
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Date:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              Fri, Oct 18, 2024
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Time:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              12:24:02 PM
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Location:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              MRDC
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Sensors:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              aero_sensor_1
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: 20,
              gap: "10px",
            }}
          >
            <div className="previewFileButtons">
              <DownloadButton
                buttonText="MAT"
                fileName={selectedData?.mcap_file_name ?? ""}
                signedUrl={selectedData?.signed_url ?? null}
              />
              <DownloadButton
                buttonText="MCAP"
                fileName={selectedData?.mcap_file_name ?? ""}
                signedUrl={selectedData?.signed_url ?? null}
              />
            </div>
          </div>
          {selectedData ? (
            <>
              <PreviewDataDiv
                name={getFileNameWithoutExtension(
                  selectedData.mcap_files[0].file_name,
                )}
                val={""}
              />
              <PreviewDataDiv
                name={"Car Model"}
                val={selectedData.car_model ?? "NA"}
              />
              <PreviewDataDiv
                name={"Time"}
                val={formatTime(selectedData.date)}
              />
              <PreviewDataDiv
                name={"Date"}
                val={formatDate(selectedData.date)}
              />
              <PreviewDataDiv name={"Location"} val={selectedData.location} />
              <PreviewDataDiv
                name={"Event Type"}
                val={selectedData.event_type ?? null}
              />
              <PreviewDataDiv name={"Notes"} val={selectedData.notes ?? null} />
              <PreviewDataDiv name={"Location"} val={selectedData.location} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: 20,
                  gap: "8px",
                }}
              >
                <div>
                  {selectedData.mcap_files.map((item) => (
                    <DownloadButton
                      buttonText="MCAP"
                      fileName={item.file_name}
                      signedUrl={item.signed_url ?? null}
                    />
                  ))}
                  {selectedData.mat_files.map((item) => (
                    <DownloadButton
                      buttonText="MAT"
                      fileName={item.file_name}
                      signedUrl={item.signed_url}
                    />
                  ))}
                  <Button
                    loading={loading}
                    loaderProps={{ type: "dots" }}
                    size="compact-md"
                    color="red"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  {success && (
                    <Notification
                      color="green"
                      onClose={() => setSuccess(null)}
                      style={{ marginTop: 10 }}
                    >
                      {success}
                    </Notification>
                  )}
                  {error && (
                    <Notification
                      color="red"
                      onClose={() => setError(null)}
                      style={{ marginTop: 10 }}
                    >
                      {error}
                    </Notification>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="md" fw={700}>
                  No file selected
                </Text>
              </div>
            </>
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default PreviewCard;

interface PreviewDataDivProps {
  name: string;
  val: string | null;
}
export function PreviewDataDiv({ name, val }: PreviewDataDivProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Text size="xs" fw={700}>
        {name}:{" "}
      </Text>
      <span style={{ marginLeft: "5px" }} />
      <Text size="xs" fw={400}>
        {val}
      </Text>
    </div>
  );
}

interface DownloadButtonProps {
  buttonText: string;
  fileName: string;
  signedUrl: string | null;
}

export function DownloadButton({
  buttonText,
  fileName,
  signedUrl,
}: DownloadButtonProps) {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={150}
      withinPortal
    >
      <Menu.Target>
        <Button
          variant="filled"
          size="xs"
          rightSection={<IconChevronDown size={20} />}
          leftSection={<IconDownload size={20} />}
        >
          {buttonText}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          style={{
            fontSize: "10px",
          }}
          leftSection={
            <IconFile
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={() => {
            window.open(signedUrl ?? undefined, "_blank");
          }}
        >
          {fileName}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export const SchemaTable = () => {
  // Example data for the table
  const initialData = Array.from({ length: 20 }, (_, index) => ({
    name: `Schema ${index + 1}`,
    value: `${index + 1 + "." + index + "." + index}`,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  // Function to filter data based on the search term
  const handleSearch = (term: string) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedTerm) ||
        item.value.toLowerCase().includes(lowercasedTerm),
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      {/* Search input */}
      <TextInput
        size="xs"
        leftSection={<IconSearch></IconSearch>}
        placeholder="Search schemas" // very hacky text spacing
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <ScrollArea style={{ height: 180, width: 250, padding: 10 }}>
        {" "}
        {/* Scrollable area with height limit */}
        <Table
          striped
          highlightOnHover
          horizontalSpacing="sm"
          verticalSpacing="0.01rem"
          withRowBorders
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Version</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td style={{ textAlign: "left" }}>{item.name}</Table.Td>
                  <Table.Td style={{ textAlign: "left" }}>
                    {item.value}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={2} style={{ textAlign: "center" }}>
                  No results found
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};
