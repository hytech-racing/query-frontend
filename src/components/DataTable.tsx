import { useState } from "react";
import { Table } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

interface DataTableProps {
  data: MCAPFileInformation[];
}

export default function DataTable({ data }: DataTableProps) {
  const theme = useMantineTheme();
  const [selectedRow, setSelectedRow] = useState<string>();

  const rows = data.map((file) => (
    <Table.Tr
      key={file.id}
      onClick={() => setSelectedRow(file.id)}
      fw={selectedRow == file.id ? "bold" : ""}
      bg={selectedRow == file.id ? theme.primaryColor : ""}
    >
      <Table.Td>{file.mcap_file_name}</Table.Td>
      <Table.Td>{file.date}</Table.Td>
      <Table.Td>{file.location}</Table.Td>
      <Table.Td>{file.notes}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table
      stickyHeader
      striped
      highlightOnHover
      highlightOnHoverColor={theme.primaryColor}
    >
      <Table.Thead bg={theme.primaryColor}>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Location</Table.Th>
          <Table.Th>Notes</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
