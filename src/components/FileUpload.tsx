import React, { useState } from 'react';
import { Modal, Button, Notification, FileInput } from '@mantine/core';
import '@/css/FileUpload.css';

interface FileUploadProps {
  uploadUrl: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      try {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          setError('Upload failed. Network response was not ok.');
          return;  
        }

        const data = await response.json();
        console.log('Upload successful:', data);
        
        setSelectedFiles([]);
        handleClose();
      } catch (error) {
        console.error('Upload failed:', error);
        setError('An error occurred while uploading. Please try again.');
      }
    } else {
      setError('Please select files to upload.');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFiles([]);
    setError(null);
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
            style={{ display: 'block', margin: '0 auto' }}
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

        <Button onClick={handleUpload} style={{ marginTop: 10 }}>Upload</Button>

        {error && (
          <Notification color="red" onClose={() => setError(null)} style={{ marginTop: 10 }}>
            {error}
          </Notification>
        )}
      </Modal>
    </div>
  );
};

export default FileUpload;
