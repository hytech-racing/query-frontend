import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
/**
 * This component adds verification functionality for deleting mcap files. The pop-up is called by preview card whenever the user 
 * chooses to delete a file.
 */
interface PreviewCardProps {
    selectedData: MCAPFileInformation | undefined;
}

function DeleteData({ selectedData }: PreviewCardProps) {
    const [loading, setLoading] = useState(false);

    const showError = (error: string) => {
        notifications.show({
            title: `Failed to delete ${selectedData?.mat_files[0].file_name}`,
            message: `${error}`,
            color: "red",
        });
        console.error("Error sending Delete request:", error);
    }
    const handleDelete = async () => { // sends the delete method to the server
        if (!selectedData) return;
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/mcaps/${selectedData?.id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                },
            );
            if (response.ok) {
                notifications.show({
                    title: `File Deletion Success`,
                    message: `Deleted ${selectedData?.mat_files[0].file_name}`,
                    color: "green",
                });
            } else if (response.status === 401) {
                showError("You must be logged in to delete files.");
            } else {
                showError(`Invalid status: ${response.status}. Error Msg: ${await response.text()}`)
            }
        } catch (error) {
            showError(`${error}`);
        }
        setLoading(false);
    };

    return (
        <Button
            loading={loading}
            loaderProps={{ type: "dots" }}
            size="compact-md"
            color="red"
            onClick={handleDelete}
        >
            Delete
        </Button>
    );
}

export default DeleteData;