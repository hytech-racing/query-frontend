import React from "react";
import { Text, Button, Grid, Menu, rem } from "@mantine/core";
import { IconDownload, IconChevronDown, IconFile } from "@tabler/icons-react";
import "@/css/PreviewCard.css";

function PreviewCard() {
  return (
    <div className="preview-container">
      <Grid>
        <Grid.Col span={4} className="image-column">
          <img
            src="https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67"
            alt="Preview"
            className="preview-image"
          />
        </Grid.Col>
        <Grid.Col span={4} className="image-column">
          <img
            src="https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67"
            alt="Preview"
            className="preview-image"
          />
        </Grid.Col>
        <Grid.Col span={4} style={{ position: "relative", padding: "10px" }}>
          <Text size="md" fw={700}>
            run 2024-18-10.mcap
          </Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Date:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              Fri, Oct 18, 2024
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Time:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              12:24:02 PM
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Location:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              MRDC
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text size="xs" fw={700}>
              Sensors:{" "}
            </Text>
            <span style={{ marginLeft: "5px" }} /> {/* Spacer */}
            <Text size="xs" fw={400}>
              aero_sensor_1
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 20,
              gap: "10px",
            }}
          >
            <DownloadButton buttonText="MAT" />
            <DownloadButton buttonText="MCAP" />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default PreviewCard;

interface DownloadButtonProps {
  buttonText: string;
}

export function DownloadButton({ buttonText }: DownloadButtonProps) {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={150}
      withinPortal
    >
      <Menu.Target>
        <Button
          variant="filled"
          size="xs"
          rightSection={<IconChevronDown size={20} />}
          leftSection={<IconDownload size={20} />}
        >
          {buttonText}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconFile
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          File_1
        </Menu.Item>

        <Menu.Item
          leftSection={
            <IconFile
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          File_2
        </Menu.Item>

        <Menu.Item
          leftSection={
            <IconFile
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          File_3
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
