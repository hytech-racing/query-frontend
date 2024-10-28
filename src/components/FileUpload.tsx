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
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleUpload = async () => {
    setError(null);
    setSuccess(null)
    if (selectedFiles.length > 0) {
      try {
        //Single file upload -- uploadUrl + /upload DOES NOT WORK
        // SO --> Used bulk_upload instead
        if (selectedFiles.length === 1) {
          const formData = new FormData();
          formData.append('files', selectedFiles[0]);
          
          console.log([...formData]);
  
          const response = await fetch(uploadUrl + "/bulk_upload", {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            setError(`Failed to upload file: ${selectedFiles[0].name}.`);
          } else {
            setSuccess('File uploaded successfully!');
            console.log('File uploaded successfully:', selectedFiles[0].name);
          }
        } else {
          // Bulk files upload 
          const formData = new FormData();
          selectedFiles.forEach(file => {
              formData.append('files', file);
          });

          try {
              const response = await fetch(uploadUrl + "/bulk_upload", {
                  method: 'POST',
                  body: formData,
              });

              if (!response.ok) {
                  const errorMsg = await response.text();
                  setError(`Failed to upload: ${errorMsg}`);
              } else {
                  const result = await response.json();
                  setSuccess('File uploaded successfully!');
                  console.log('Upload successful:', result);
              }
          } catch (error) {
              console.error('Error uploading files:', error);
              setError('An error occurred during file upload.');
          }
        }
  
        setSelectedFiles([]);
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
    setSuccess(null)
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
        {success && (
          <Notification color="green" onClose={() => setSuccess(null)} style={{ marginTop: 10 }}>
            {success}
          </Notification>
        )}
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
