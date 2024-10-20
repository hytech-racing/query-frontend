import React, { useState } from 'react';
import '@/css/FileUpload.css';

interface FileUploadProps {
  uploadUrl: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    // Once POST API req is out -- Currently WIP so cannot make any progress here
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
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Upload successful:', data);
        
        setSelectedFiles([]);
        handleClose();
      } catch (error) {
        console.error('Upload failed:', error);
      }
    } else {
      alert('Please select files to upload');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFiles([]);
  };

  return (
    <div>
      <button onClick={toggleModal}>Upload Files</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>Select files to upload</h2>
            <div className='files'>
                <input
                type="file"
                multiple
                onChange={handleFileChange}
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
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
