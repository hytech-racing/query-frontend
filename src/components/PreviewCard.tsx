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
  const formatDate = (dateString: string) => {
    const [month, day, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const [month, day, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}T00:00:00`);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="preview-container">
      <Grid>
        <Grid.Col span={3} className="image-column">
          <img
            src="https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67"
            alt="Preview"
            className="preview-image"
          />
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
          {selectedData ? (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="md" fw={700}>
                  {selectedData.mcap_file_name}{" "}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Date:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  {formatDate(selectedData.date)}{" "}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Time:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  {formatTime(selectedData.date)}{" "}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Location:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  {selectedData.location}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Sensors:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  {selectedData.event_type || "N/A"}{" "}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Notes:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  {selectedData.notes || "N/A"}{" "}
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
                <DownloadButton
                  buttonText="MCAP"
                  fileName={selectedData.mcap_file_name}
                  signedUrl={selectedData.signed_url}
                />
                <DownloadButton
                  buttonText="MAT"
                  fileName={selectedData.mcap_file_name}
                  signedUrl={"#"}
                />
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
          leftSection={
            <IconFile
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={() => {
            window.open(signedUrl, "_blank");
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

      <ScrollArea style={{ height: 200, width: 250 }}>
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
