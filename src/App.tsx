import "@mantine/core/styles.css";
import {
  Center,
  Code,
  MantineProvider,
  Blockquote,
  AppShell,
} from "@mantine/core";
import { theme } from "./theme";
import Navbar from "/Users/jas/school/gatech/hytech/query-frontend/src/Navbar.tsx";

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

        <Center h="100vh">
          <Blockquote color="yellow">
            Edit <Code>src/App.tsx</Code> to get started.
          </Blockquote>
        </Center>
      </AppShell>
    </MantineProvider>
  );
}
