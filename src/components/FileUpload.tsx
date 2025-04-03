import React, { useState } from "react";
import { Modal, Button, Notification, FileInput } from "@mantine/core";
import "@/css/FileUpload.css";

interface FileUploadProps {
  uploadUrl: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (selectedFiles.length > 0) {
      try {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });

        try {
          const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            if (response.status === 503) {
              const errorMsg = await response.text();
              setError(
                `Failed to upload: ${errorMsg} \nTry again in a few minutes!`,
              );
            } else {
              const errorMsg = await response.text();
              setError(`Failed to upload: ${errorMsg}`);
            }
          } else {
            const result = await response.json();
            setSuccess("File uploaded successfully!");
            console.log("Upload successful:", result);
          }
        } catch (error) {
          console.error("Error uploading files:", error);
          setError("An error occurred during file upload.");
        }

        setSelectedFiles([]);
      } catch (error) {
        console.error("Upload failed:", error);
        setError("An error occurred while uploading. Please try again.");
      }
    }
    setLoading(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFiles([]);
    setError(null);
    setSuccess(null);
  };

  return (
    <div>
      <Button onClick={toggleModal}>Upload Files</Button>

      <Modal
        opened={showModal}
        onClose={handleClose}
        title="Select files to upload"
        centered
        style={{ textAlign: "center" }}
      >
        <div className="files">
          <FileInput
            multiple
            accept=".mcap"
            onChange={handleFileChange}
            placeholder="Select files to upload"
            label="Choose files"
            style={{ display: "block", margin: "0 auto" }}
          />
          {selectedFiles.length > 0 && (
            <div>
              <h3>Chosen Files:</h3>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button
          loading={loading}
          loaderProps={{ type: "dots" }}
          onClick={handleUpload}
          style={{ marginTop: 10 }}
          disabled={loading}
        >
          Upload
        </Button>

        {success && (
          <Notification
            color="green"
            onClose={() => setSuccess(null)}
            style={{ marginTop: 10 }}
          >
            {success}
          </Notification>
        )}
        {error && (
          <Notification
            color="red"
            onClose={() => setError(null)}
            style={{ marginTop: 10 }}
          >
            {error}
          </Notification>
        )}
      </Modal>
    </div>
  );
};

export default FileUpload;
