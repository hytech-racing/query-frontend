import React from "react";

import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { theme } from "../src/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (renderStory) => (
      <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
