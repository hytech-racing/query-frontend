import "@mantine/core/styles.css";
import { MantineProvider, AppShell } from "@mantine/core";
import { theme } from "./theme";
import Navbar from "./Navbar.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !open },
        }}
      >
        <Navbar>{/* <Flex direction="row">navbar</Flex> */}</Navbar>
      </AppShell>
      <SearchBar />
    </MantineProvider>
  );
}
