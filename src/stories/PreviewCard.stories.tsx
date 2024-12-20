import type { Meta, StoryObj } from "@storybook/react";

import PreviewCard from "../components/PreviewCard";

const meta = {
  component: PreviewCard,
} satisfies Meta<typeof PreviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedRow: undefined,
    selectedData: undefined,
  },
};
