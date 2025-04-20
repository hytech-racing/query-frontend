import {
    Button,
    Modal,
    Notification,
    TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";

interface PreviewCardProps {
    selectedData: MCAPFileInformation | undefined;
}

function DeleteData({ selectedData }: PreviewCardProps) {
    const [deleteDataModalOpened, setDeleteDataModalOpened] = useState(false);
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (deleteDataModalOpened && selectedData) {
            setNewPasswordInput("");
            setError(null);
            setSuccess(null);
        }
    }, [deleteDataModalOpened, selectedData]);

    const handleDelete = async () => {
        if (!selectedData) return;
        setLoading(true);
        setError(null);
        setSuccess(null);
        const authCode = import.meta.env.VITE_AUTH_CODE;
        if (newPasswordInput !== authCode) {
            setError("Incorrect password. Try again.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/mcaps/${selectedData?.id}`,
                {
                    method: "DELETE"
                },
            );
            if (!response.ok) {
                if (response.status === 503) {
                    const errorMsg = await response.text();
                    setError(
                    `Failed to delete: ${errorMsg} \nTry again in a few minutes!`,
                    );
                    console.log(errorMsg);
                } else {
                    const errorMsg = await response.text();
                    setError(`Failed to delete: ${errorMsg}`);
                    console.log(errorMsg);
                }
            } else {
                setSuccess("File deleted successfully!");
            }
        } catch (error) {
            console.error("Error sending Delete request:", error);
            setError("An error occurred during file deletion.");
        }
        setLoading(false);
    };
    return (
        <>
        {success && (
            <Notification color="green" onClose={() => setSuccess(null)}>
            {success}
            </Notification>
        )}
        {error && (
            <Notification color="red" onClose={() => setError(null)}>
            {error}
            </Notification>
        )}
        <Button
            loading={loading}
            loaderProps={{ type: "dots" }}
            size="compact-md"
            color="red"
            onClick={() => setDeleteDataModalOpened(true)}
        >
            Delete
        </Button>
        <Modal
            opened={deleteDataModalOpened}
            onClose={() => setDeleteDataModalOpened(false)}
            title="Delete Data"
            centered
            style={{ textAlign: "center" }}
        >
            <TextInput
                label="Password"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.currentTarget.value)}
                type="password"
                placeholder="Enter Authentication Password"
                mb="xs"/>
            <Button
                loading={loading}
                loaderProps={{ type: "dots" }}
                onClick={handleDelete}
                style={{ marginTop: 10 }}
                color="red"
                disabled={loading || newPasswordInput.trim() === ""}
            >
                Confirm Delete
            </Button>
        </Modal>
        </>
    );
}

export default DeleteData;