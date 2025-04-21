import {
    Button,
    Modal,
    Notification,
    Textarea,
    TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";

// Edit info button in preview card in root/files page
interface PreviewCardProps {
    selectedData: MCAPFileInformation | undefined;
}

function EditInfo({ selectedData }: PreviewCardProps) {
    const [editDateModalOpened, setEditDateModalOpened] = useState(false);
    const [newDate, setNewDate] = useState<Date | null>(null);
    const [newTime, setNewTime] = useState<Date | null>(null);
    const [newCarModel, setNewCarModel] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newEventType, setNewEventType] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (editDateModalOpened && selectedData) {
            const previousDate = new Date(selectedData.date);
            setNewDate(previousDate);
            setNewTime(previousDate);
            setNewCarModel(selectedData.car_model ?? "");
            setNewLocation(selectedData.location ?? "");
            setNewEventType(selectedData.event_type ?? "");
            setNewNotes(selectedData.notes ?? "");
        }
    }, [editDateModalOpened, selectedData]);

    const handleUpdate = async () => {
        if (!newDate || !newTime || !selectedData?.id) return;

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
        const combinedDate = new Date(newDate);
        combinedDate.setHours(newTime.getHours());
        combinedDate.setMinutes(newTime.getMinutes());
        combinedDate.setSeconds(newTime.getSeconds());

        const formattedDate = combinedDate.toISOString();

        console.log("Formatted Date for API:", formattedDate);

        const formData = new FormData();
        formData.append("date", formattedDate);
        formData.append("car_model", newCarModel);
        formData.append("notes", newNotes);
        formData.append("location", newLocation);
        formData.append("event_type", newEventType);

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/mcaps/${selectedData.id}/updateMetadataRecords`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            const errorMsg = await response.text();
            setError(`Failed to update date: ${errorMsg}`);
        } else {
            setSuccess("Date and time updated successfully! Reload to see changes!");
            selectedData.date = formattedDate;
            // selectedData.car_model = newCarModel;
            selectedData.location = newLocation;
            selectedData.event_type = newEventType;
            selectedData.notes = newNotes;
        }
        } catch (error) {
            console.error("Error updating date:", error);
            setError("An error occurred while updating the date and time.");
        }

        setLoading(false);
        setEditDateModalOpened(false);
    };

    const dateInputStyles = {
        calendarHeaderControl: {
        width: "24px",
        height: "24px",
        fontSize: "14px",
        lineHeight: "24px",
        },
        calendarHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 0",
        },
        calendarHeaderLevel: {
        flex: "0 1 auto",
        },
        calendar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        },
        weekday: {
        fontSize: "12px",
        },
        day: {
        fontSize: "12px",
        width: "30px",
        height: "30px",
        lineHeight: "30px",
        },
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
        <Button size="compact-md" color="blue" onClick={() => setEditDateModalOpened(true)}>
            Edit Info
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

export default EditInfo;
