import "@mantine/core/styles.css";
import {
  Center,
  Code,
  MantineProvider,
  Blockquote,
  Flex,
  AppShell,
} from "@mantine/core";
import { theme } from "./theme";

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
        <AppShell.Navbar>
          <Flex direction="row">navbar</Flex>
        </AppShell.Navbar>
        <Center h="100vh">
          <Blockquote color="yellow">
            Edit <Code>src/App.tsx</Code> to get started.
          </Blockquote>
        </Center>
      </AppShell>
    </MantineProvider>
  );
}
