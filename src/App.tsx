import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import PreviewCard from "./components/PreviewCard";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <PreviewCard />
    </MantineProvider>
  );
}
