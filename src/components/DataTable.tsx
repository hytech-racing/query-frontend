import { Table } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { Input, Textarea } from "@mantine/core";

interface DataTableProps {
  data?: MCAPFileInformation[];
  selectedRow?: string;
  setSelectedRow: React.Dispatch<React.SetStateAction<string>>;
  setSelectedData: React.Dispatch<
    React.SetStateAction<MCAPFileInformation | undefined>
  >;
}

export default function DataTable({
  data,
  selectedRow,
  setSelectedRow,
  setSelectedData,
}: DataTableProps) {
  const theme = useMantineTheme();

  const setPreviewData = (file: MCAPFileInformation) => {
    if (selectedRow === file.id) {
      setSelectedRow("");
      setSelectedData(undefined);
    } else {
      setSelectedRow(file.id);
      setSelectedData(file);
    }
  };

  // Take out when API server team implements filename id in their get route
  const getFileNameWithoutExtension = (fileNameWithExtension: string) => {
    const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
    return lastDotIndex !== -1
      ? fileNameWithExtension.slice(0, lastDotIndex)
      : fileNameWithExtension;
  };

  const rows = !data ? (
    <Table.Tr>
      <Table.Td colSpan={100} ta="center">
        Use the filters to get results
      </Table.Td>
    </Table.Tr>
  ) : data.length === 0 ? (
    <Table.Tr>
      <Table.Td colSpan={100} ta="center">
        No results found
      </Table.Td>
    </Table.Tr>
  ) : (
    data.map((file) => (
      <Table.Tr
        key={file.id}
        onClick={() => setPreviewData(file)}
        bg={selectedRow === file.id ? theme.primaryColor : ""}
      >
        <Table.Td style={{ paddingLeft: "25px" }}>
          {getFileNameWithoutExtension(file.mcap_files[0].file_name)}
        </Table.Td>
        <Table.Td>{file.date}</Table.Td>
        <Table.Td>{file.location}</Table.Td>

        {/* Change back to notes once notes field is implemented in the server */}
        {/* <Table.Td>{file.car_model}</Table.Td> */}
        <Table.Td style={{ paddingRight: "25px" }}>
          <Input.Wrapper>
            <Textarea
              variant="unstyled"
              value={file.notes}
              style={{ whiteSpace: "normal", wordWrap: "break-word" }}
              readOnly
              placeholder="No Note Available"
              minRows={1}
              maxRows={4}
            />
          </Input.Wrapper>
        </Table.Td>
      </Table.Tr>
    ))
  );
  return (
    <Table.ScrollContainer
      h="100%"
      minWidth={800}
      style={{ overflowY: "auto" }}
    >
      <Table
        stickyHeader
        highlightOnHover={data && data.length > 0}
        highlightOnHoverColor={"#F8F9FA"}
      >
        <Table.Thead bg={"#D1BF80"}>
          <Table.Tr>
            <Table.Th style={{ paddingLeft: "25px" }}>Name</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th style={{ paddingRight: "25px" }}>Notes</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
