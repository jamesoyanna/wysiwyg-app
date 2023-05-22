import React from "react";
import Modal from "react-modal";
import "./modal.css";

Modal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: () => void;
  error?: string;
}

const ModalComponent = ({ isOpen, closeModal, inputValue, setInputValue, handleSubmit, error }: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL"
          className={error ? "modal-input modal-input-error" : "modal-input"}
        />
        {error && <span className="modal-error-message">{error}</span>}
        <div className="modal-button-group">
          <button onClick={handleSubmit} className="modal-submit-button">
            Submit
          </button>
          <button onClick={closeModal} className="modal-cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
