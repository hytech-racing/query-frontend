import "@mantine/core/styles.css";
import { Center, Code, MantineProvider, Blockquote } from "@mantine/core";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Center h="100vh">
        <Blockquote color="yellow">
          Edit <Code>src/App.tsx</Code> to get started.
        </Blockquote>
      </Center>
    </MantineProvider>
  );
}
