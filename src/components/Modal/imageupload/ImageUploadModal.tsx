import React from 'react';
import './imageupload.css';
import UploadIcon from '../../../icons/upload.png';
import CloseIcon from '../../../icons/x.png';

const ImageUploadModal = ({ closeModal, isUploading, handleFileChange }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="upload-area">
          <label htmlFor="file-upload" className="upload-label">
            <img src={UploadIcon} alt="Upload Icon" className="upload-icon" />
            {isUploading && (
            <div className="loader-container">
              <div className="loader"></div>
              <span>uploading image...</span>
            </div>
          )}
          </label>
          <input type="file" id="file-upload" className="file-upload" onChange={handleFileChange} />
          <p className="modal-title">Upload Image</p>
          <button className="modal-close" onClick={closeModal}>
            <img src={CloseIcon} alt="Close Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
