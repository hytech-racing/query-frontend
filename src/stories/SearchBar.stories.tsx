import type { Meta, StoryObj } from "@storybook/react";

import SearchBar from "@/components/SearchBar";

const meta = {
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
