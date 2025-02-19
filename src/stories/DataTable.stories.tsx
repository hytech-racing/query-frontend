/**
 *
 * This file defines multiple stories for the `DataTable` component, showcasing its behavior 
 * with various states of input data and container styles.
 *
 * @module DataTableStories
 */

import type { Meta, StoryObj } from "@storybook/react";

import DataTable from "@/components/DataTable";

/**
 * Metadata configuration for the `DataTable` component.
 *
 * Specifies the component to be used in the stories.
 *
 * @type {Meta<typeof DataTable>}
 */
const meta: Meta<typeof DataTable> = {
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Retrieve the component's name for use in story descriptions.
const componentName = meta.component!.name;

/**
 * Sample dataset to showcase the behavior of `DataTable`.
 *
 * Each object in the array represents a row of data with various attributes such as `id`,
 * `mcap_file_name`, `event_type`, and `notes`.
 */
const sampleData = [
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_file_name: "file1.mcap",
    matlab_file_name: "file1.mat",
    aws_bucket: "bucket",
    mcap_path: "/path/to/s3/object",
    mat_path: "/path/to/s3/object",
    vn_lat_lon_path: "/path/to/s3/object",
    velocity_plot_path: "/path/to/s3/object",
    date: "08-22-2024",
    location: "MRDC",
    notes: "car ran!",
    event_type: "acceleration",
    car_model: "HT08",
    schema_versions: null,
    mcap_files: [{ signed_url: "yar", file_name: "yar" }],
    mat_files: [{ signed_url: "har", file_name: "har" }],
    content_files: {
      vn_lat_lon_plot: [{ signed_url: "bar", file_name: "far" }],
      vn_time_vel_plot: [{ signed_url: "bar", file_name: "far" }],
    },
  },
];

/**
 * Story: `WithResults`.
 *
 * Displays the `DataTable` component populated with sample data.
 *
 * @type {Story}
 */
export const WithResults: Story = {
  args: {
    data: sampleData,
  },
};

/**
 * Story: `WithResultsSmall`.
 *
 * Displays the `DataTable` component with sample data, placed inside a container
 * with limited dimensions and scrollable overflow.
 *
 * @type {Story}
 * @property {Object} parameters.docs.description.story - Explains how the `DataTable` becomes scrollable 
 *                                                        within a constrained container.
 */
export const WithResultsSmall: Story = {
  args: {
    data: sampleData,
  },
  decorators: [
    (Story) => (
      <div
        style={{ maxHeight: "200px", maxWidth: "600px", overflow: "scroll" }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `If ${componentName} is placed in an element with a defined height/width and overflow-scroll, the ${componentName} will become scrollable.`,
      },
    },
  },
};

/**
 * Story: `WithoutResults`.
 *
 * Displays the `DataTable` component when no data is provided.
 *
 * @type {Story}
 */
export const WithoutResults: Story = {
  args: {
    data: [],
  },
};

/**
 * Story: `BeforeSearch`.
 *
 * Displays the `DataTable` component in its initial state with no arguments provided.
 *
 * @type {Story}
 */
export const BeforeSearch: Story = {
  args: {},
};
