/**
 *
 * This file configures global settings for Storybook, including controls, decorators, 
 * and custom parameters. It also integrates the Mantine library for consistent theming.
 *
 * @module StorybookPreview
 */

import React from "react";

import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { theme } from "../src/theme";

/**
 * Storybook preview configuration object.
 *
 * @type {Preview}
 * @property {Object} parameters - Defines global configuration for Storybook controls.
 *                                 - `controls.matchers.color`: Regex to match color-related properties.
 *                                 - `controls.matchers.date`: Regex to match date-related properties.
 * @property {Function[]} decorators - Array of decorators to wrap all rendered stories.
 *                                     - Wraps all stories with MantineProvider to apply theming.
 * @property {string[]} tags - Tags to identify metadata or features.
 *                             - Includes `autodocs` for automatic documentation generation.
 */
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