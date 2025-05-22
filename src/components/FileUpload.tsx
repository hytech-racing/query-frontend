import React, { useState } from "react";
import { Modal, Button, Notification, FileInput, Progress} from "@mantine/core";
import "@/css/FileUpload.css";

// File upload Modal and Button

interface FileUploadProps {
  uploadUrl: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0); 
  

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setUploadProgress(0);
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append('files', file, file.name);
    });

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onloadstart = () => {
      setUploadProgress(0);
    };

    xhr.onload = () => {
      setLoading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const result = JSON.parse(xhr.responseText);
          setSuccess("File(s) uploaded successfully!");
          console.log("Upload successful:", result);
          setSelectedFiles([]);
          setUploadProgress(100);
          setTimeout(() => setUploadProgress(0), 2000);
        } catch (e) {
          console.error("Error parsing server response:", e);
          setError("Uploaded successfully, but couldn't parse server response.");
          setUploadProgress(0);
        }
      } else {
        let errorMsg = xhr.responseText || `Server responded with status ${xhr.status}`;
        if (xhr.status === 503) {
          errorMsg = `${errorMsg} \nTry again in a few minutes!`;
        }
        setError(`Failed to upload: ${errorMsg}`);
        console.error("Upload failed with status:", xhr.status, xhr.responseText);
        setUploadProgress(0);
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      setError("An error occurred during the upload. Please check your network connection and try again.");
      console.error("XHR onerror triggered");
      setUploadProgress(0);
    };

    xhr.onabort = () => {
      setLoading(false);
      setError("Upload was aborted.");
      console.log("XHR onabort triggered");
      setUploadProgress(0);
    };

    try {
      xhr.open('POST', uploadUrl, true);
      // If your server requires specific headers (e.g., for authentication), set them here:
      // xhr.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
      xhr.send(formData);
    } catch (e) {
        setLoading(false);
        setError("An unexpected error occurred before sending the request.");
        console.error("Error opening or sending XHR:", e);
        setUploadProgress(0);
    }
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

        <Button loading={loading} loaderProps={{ type: 'dots' }} onClick={handleUpload} style={{ marginTop: 10 }} disabled={loading}>Upload</Button>
        <Progress value={uploadProgress}></Progress>
        {success && (
          <Notification color="green" onClose={() => setSuccess(null)} style={{ marginTop: 10 }}>
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
