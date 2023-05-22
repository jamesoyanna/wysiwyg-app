import React, { useState } from 'react';
import './imageupload.css';
import UploadIcon from '../../icons/upload.png'
import CloseIcon from '../../icons/x.png'
const ImageUploadModal = ({ closeModal }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setIsUploading(true);

    // Perform your file upload logic here

    // Simulating the upload delay for demonstration
    setTimeout(() => {
      setIsUploading(false);
      // Handle the uploaded file
      console.log('Uploaded file:', file);
      closeModal();
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="upload-area">
          <label htmlFor="file-upload" className="upload-label">
            <img src={UploadIcon}  alt='Upload Icon' className="upload-icon"/>
            {isUploading ? 'Uploading...' : ''}
          </label>
          <input type="file" id="file-upload" className="file-upload" onChange={handleFileUpload} />
        <p className="modal-title">Upload Image</p>
        <button className="modal-close" onClick={closeModal}>
          <img src={CloseIcon} alt='Close Icon'/>
        </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
