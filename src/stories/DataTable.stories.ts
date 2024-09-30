import type { Meta, StoryObj } from "@storybook/react";

import DataTable from "../components/DataTable";

const meta: Meta<typeof DataTable> = {
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const WithData: Story = {
  args: {
    data: [
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
      },
      {
        id: "fb48f265-a44a-4fd5-a873-26cd581950a0",
        mcap_file_name: "file2.mcap",
        matlab_file_name: "file2.mat",
        aws_bucket: "bucket",
        mcap_path: "/path/to/s3/object",
        mat_path: "/path/to/s3/object",
        vn_lat_lon_path: "/path/to/s3/object",
        velocity_plot_path: "/path/to/s3/object",
        date: "08-23-2024",
        location: "Michigan",
        notes: "car did not run",
        event_type: "endurance",
      },
      {
        id: "ba1ae40d-d013-4fe4-ac80-8e129fbe97b9",
        mcap_file_name: "file3.mcap",
        matlab_file_name: "file3.mat",
        aws_bucket: "bucket",
        mcap_path: "/path/to/s3/object",
        mat_path: "/path/to/s3/object",
        vn_lat_lon_path: "/path/to/s3/object",
        velocity_plot_path: "/path/to/s3/object",
        date: "08-24-2024",
        location: "MRDC",
        notes: "car ran!",
        event_type: "acceleration",
      },
      {
        id: "55c2ae28-294e-45fd-9afb-a19e7499a1c2",
        mcap_file_name: "file4.mcap",
        matlab_file_name: "file4.mat",
        aws_bucket: "bucket",
        mcap_path: "/path/to/s3/object",
        mat_path: "/path/to/s3/object",
        vn_lat_lon_path: "/path/to/s3/object",
        velocity_plot_path: "/path/to/s3/object",
        date: "08-12-2024",
        location: "SCC",
        notes: "brakes were not the best",
        event_type: "skidpad",
      },
      {
        id: "25d4c874-6310-448b-9984-16fec5f1cb8c",
        mcap_file_name: "file5.mcap",
        matlab_file_name: "file5.mat",
        aws_bucket: "bucket",
        mcap_path: "/path/to/s3/object",
        mat_path: "/path/to/s3/object",
        vn_lat_lon_path: "/path/to/s3/object",
        velocity_plot_path: "/path/to/s3/object",
        date: "09-22-2024",
        location: "MRDC",
        notes: "drivebrain stopped recording mcaps",
        event_type: "skidpad",
      },
      {
        id: "07a3c667-597f-4637-8b61-6134e75e6f76",
        mcap_file_name: "file6.mcap",
        matlab_file_name: "file6.mat",
        aws_bucket: "bucket",
        mcap_path: "/path/to/s3/object",
        mat_path: "/path/to/s3/object",
        vn_lat_lon_path: "/path/to/s3/object",
        velocity_plot_path: "/path/to/s3/object",
        date: "08-16-2024",
        location: "rome",
        notes: "car performed beautifully",
        event_type: "autocross",
      },
      {
        id: "01c1e581-6cf9-42f4-a6d0-0c41442fa081",
        mcap_file_name: "file7.mcap",
        matlab_file_name: "file7.mat",
        aws_bucket: "bucket",
        mcap_path: "/path/to/s3/object",
        mat_path: "/path/to/s3/object",
        vn_lat_lon_path: "/path/to/s3/object",
        velocity_plot_path: "/path/to/s3/object",
        date: "08-29-2024",
        location: "MRDC",
        notes: "car did not turn on",
        event_type: null,
      },
    ],
  },
};

export const WithoutData: Story = {
  args: {
    data: [],
  },
};
