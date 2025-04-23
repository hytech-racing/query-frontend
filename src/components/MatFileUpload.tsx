import {
    Button,
    Modal,
    Notification,
    Textarea,
    TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";

// MAT file upload button
interface PreviewCardProps {
    selectedData: MCAPFileInformation | undefined;
    uniqueID: String | undefined;
}

function MatFileUpload({ selectedData, uniqueID } : PreviewCardProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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

    const handleDelete = async () => { // sends the delete method to the server
        if (!selectedData) return;
        setLoading(true);
        setError(null);
        setSuccess(null);
        const authCode = import.meta.env.AUTH_CODE;
        if (newPasswordInput !== authCode) { // checks if passwords match
            setError("Incorrect password. Try again.");
            setLoading(false);
            return;
        }
        try { // completes delete or identifies errors
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
                setSuccess("File deleted successfully! Refresh to see your changes!");
            }
        } catch (error) {
            console.error("Error sending Delete request:", error);
            setError("An error occurred during file deletion.");
        }
        setDeleteDataModalOpened(false);
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
            <Button size="compact-md" color="blue" onClick={() => setShowModal(true)}>
                Upload MAT Files
            </Button>
            <Modal
                opened={editDateModalOpened}
                onClose={() => setEditDateModalOpened(false)}
                title="Edit Data"
                centered
                style={{ textAlign: "center" }}
            >
                <TextInput label="Car Model" value={newCarModel} onChange={(e) => setNewCarModel(e.currentTarget.value)} mb="xs" />
                <DateInput
                    value={newDate}
                    onChange={setNewDate}
                    valueFormat="DD/MM/YYYY"
                    label="Select new date"
                    placeholder="Pick a date"
                    style={{ display: "block", margin: "0 auto", marginBottom: 20 }}
                    styles={dateInputStyles}
                />
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 20,
                }}
                >
                <label style={{ marginBottom: 5 }}>Select new time (24-hour)</label>
                <div style={{ display: "flex", gap: 5 }}>
                    {["Hours", "Minutes", "Seconds"].map((label, idx) => {
                    const getValue = () => {
                        if (!newTime) return "00";
                        const val = [newTime.getHours(), newTime.getMinutes(), newTime.getSeconds()][idx];
                        return String(val).padStart(2, "0");
                    };
                    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = Math.max(0, Math.min(parseInt(e.target.value) || 0, idx === 0 ? 23 : 59));
                        const updated = newTime ? new Date(newTime) : new Date();
                        if (idx === 0) updated.setHours(val);
                        if (idx === 1) updated.setMinutes(val);
                        if (idx === 2) updated.setSeconds(val);
                        setNewTime(updated);
                    };
                    return (
                        <input
                        key={label}
                        type="number"
                        value={getValue()}
                        onChange={onChange}
                        placeholder={label.slice(0, 2).toUpperCase()}
                        min={0}
                        max={idx === 0 ? 23 : 59}
                        step={1}
                        style={{
                            width: 50,
                            textAlign: "center",
                            padding: 5,
                            border: "1px solid #ccc",
                            borderRadius: 4,
                        }}
                        />
                    );
                    })}
                </div>
                </div>
                <TextInput label="Location" value={newLocation} onChange={(e) => setNewLocation(e.currentTarget.value)} mb="xs" />
                <TextInput label="Event Type" value={newEventType} onChange={(e) => setNewEventType(e.currentTarget.value)} mb="xs" />
                <Textarea label="Notes" value={newNotes} onChange={(e) => setNewNotes(e.currentTarget.value)} autosize minRows={2} mb="xs" />
                <Button
                    loading={loading}
                    loaderProps={{ type: "dots" }}
                    onClick={handleUpdate}
                    style={{ marginTop: 10 }}
                    disabled={loading || !newDate || !newTime}
                >
                    Update Info
                </Button>
            </Modal>
        </>
    );
}

export default MatFileUpload;