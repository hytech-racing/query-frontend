import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <SearchBar />
    </MantineProvider>
  );
}
