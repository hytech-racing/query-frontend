/**
 *
 * This configuration object defines how Storybook should discover stories, 
 * which addons to include, and some core framework options.
 *
 * @module StorybookConfig
 */

import type { StorybookConfig } from "@storybook/react-vite";

/**
 * Configuration object for Storybook.
 *
 * @type {StorybookConfig}
 * @property {string[]} stories - Patterns to locate story files within the project.
 *                                Includes `.mdx` files and various script extensions such as
 *                                `.js`, `.jsx`, `.mjs`, `.ts`, and `.tsx` within the `src` directory.
 * @property {string[]} addons - List of Storybook addons for functionality.
 *                               - `@storybook/addon-onboarding`: Assists with onboarding users to Storybook.
 *                               - `@storybook/addon-links`: Enables linking between stories.
 *                               - `@storybook/addon-essentials`: Includes essential Storybook addons.
 *                               - `@chromatic-com/storybook`: Chromatic integration for visual testing.
 *                               - `@storybook/addon-interactions`: Enables testing interactions in components.
 * @property {Object} framework - Framework-specific configuration for Storybook.
 *                                - `name`: Specifies the React-Vite framework for Storybook.
 *                                - `options`: Reserved for future framework-specific options (currently empty).
 * @property {Object} core - Core settings for Storybook.
 *                           - `disableTelemetry`: Disables telemetry to avoid sending usage data.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};
export default config;
