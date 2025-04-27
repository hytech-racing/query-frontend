import { useState } from "react";
import EditInfo from "./EditInfo";
import DeleteData from "./DeleteData";
//import MatFileUpload from "./MatFileUpload";
// used for uploading mat and h5 files
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
  CopyButton,
} from "@mantine/core";
import {
  IconDownload,
  IconChevronDown,
  IconFile,
  IconSearch,
} from "@tabler/icons-react";
import "@/css/PreviewCard.css";

// Has multiple components in this file
// 1. Preview Card component (rectangular section at the bottom of roots/files page)
// 2. Data Div component -- goes in Preview card component
// 3. Data Div Header component -- goes in Preview card component
// 4. Download Button component (param : list of files | able to download multiple files)
// 5. Schema Table component in Preview card

interface PreviewCardProps {
  selectedRow?: string;
  selectedData: MCAPFileInformation | undefined;
}

const origin = window.location.origin;

// The actual Preview Card component
function PreviewCard({ selectedData }: PreviewCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFileNameWithoutExtension = (fileNameWithExtension: string) => {
    const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
    return lastDotIndex !== -1
      ? fileNameWithExtension.slice(0, lastDotIndex)
      : fileNameWithExtension;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const latImageUrl =
    selectedData?.content_files?.vn_lat_lon_plot?.[0]?.signed_url ??
    "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67";
  const velImageUrl =
    selectedData?.content_files?.vn_time_vel_plot?.[0]?.signed_url ??
    "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67";

  return (
    <div className="preview-container">
      <Grid>
        <Grid.Col span={3} h={260} className="image-column">
          <img src={latImageUrl} alt="Preview" className="preview-image" />
        </Grid.Col>
        <Grid.Col span={3} h={260} className="image-column">
          <img src={velImageUrl} alt="Preview" className="preview-image" />
        </Grid.Col>
        <Grid.Col span={3} h={260} className="image-column">
          <SchemaTable />
        </Grid.Col>
        <Grid.Col span={3} h={260}>
          {selectedData ? (
            <>
              <PreviewDataDivHeader
                name={getFileNameWithoutExtension(
                  selectedData.mcap_files[0].file_name,
                )}
                val={""}
              />
              <Grid style={{ overflowY: "auto", overflowX: "hidden" }}>
                <Grid.Col span={12} h={120}>
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
                  <PreviewDataDiv
                    name={"Location"}
                    val={selectedData.location}
                  />
                  <PreviewDataDiv
                    name={"Event Type"}
                    val={selectedData.event_type ?? null}
                  />
                  <PreviewDataDiv
                    name={"Notes"}
                    val={selectedData.notes ?? null}
                  />
                  <PreviewDataDiv
                    name={"Location"}
                    val={selectedData.location}
                  />
                </Grid.Col>
              </Grid>
              <div style={{ textAlign: "center" }}>
                <DeleteData selectedData={selectedData}/>
                <CopyButton
                  value={`${origin}${import.meta.env.BASE_URL}?id=${selectedData.id}`}
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
                <EditInfo selectedData={selectedData} />
                {selectedData.mcap_files.map((item) => (
                  <DownloadButton
                    buttonText="MCAP"
                    fileName={item.file_name}
                    signedUrl={item.signed_url ?? null}
                  />
                ))}
                {selectedData.mat_files.map((item) => (
                  <DownloadButton
                    buttonText="H5"
                    fileName={item.file_name}
                    signedUrl={item.signed_url}
                  />
                ))}
                {/*<MatFileUpload fileName={getFileNameWithoutExtension(selectedData.mcap_files[0].file_name)} uniqueID={selectedData.id} uploadUrl={""}/>*/}
                {/* Will be available once route is ready */}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="md" fw={700}>
                  No file selected
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Date:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  NA
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Time:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  NA
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Location:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  NA
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text size="xs" fw={700}>
                  Sensors:{" "}
                </Text>
                <span style={{ marginLeft: "5px" }} />
                <Text size="xs" fw={400}>
                  NA
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

export function PreviewDataDivHeader({ name, val }: PreviewDataDivProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Text size="m" fw={700}>
        {name}:{" "}
      </Text>
      <span style={{ marginLeft: "5px" }} />
      <Text size="m" fw={400}>
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
  const initialData = Array.from({ length: 20 }, (_, index) => ({
    name: `Schema ${index + 1}`,
    value: `${index + 1 + "." + index + "." + index}`,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

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
    <div style={{ padding: "15px", overflow: "scroll" }}>
      <TextInput
        size="xs"
        leftSection={<IconSearch />}
        placeholder="Search schemas - DOES NOT WORK"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <ScrollArea style={{ height: 180, width: 250, padding: 10 }}>
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
