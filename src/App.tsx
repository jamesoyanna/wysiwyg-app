import React, { useState, useEffect, useRef } from 'react';
import { ContentState, convertToRaw, convertFromRaw, EditorState, AtomicBlockUtils } from 'draft-js';
import Modal from 'react-modal';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import EditorComponent from './components/Editor/Editor';
import VideoBlock from './components/VideoBlock';
import SocialMediaBlockComponent from './components/SocialMediaBlock';
import Dropdown from './components/Dropdown/DropDown';
import ModalComponent from './components/Modal/Modal';

import './App.css';

function App() {
  const _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const contentState = convertFromRaw(raw);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const fileInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue('');
    setError('');
  };

  const rootElementRef = useRef(null);

  useEffect(() => {
    Modal.setAppElement(rootElementRef.current);
  }, []);

  const handleImageUpload = async (file) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'wazobia');
      const cloudName = 'startupbuz';

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;

        setSelectedImage(imageUrl);
        closeModal();
      } else {
        console.error('Image upload failed');
        setError('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setError('Image upload error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const handleOptionClick = (option) => {
    if (option === 'image') {
      fileInputRef.current.click();
    } else if (option === 'video') {
      openModal();
    } else if (option === 'social-media') {
      openModal();
    }
  };

  const isVideoUrl = (url) => {
    const youtubePattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
    return youtubePattern.test(url);
  };

  const isSocialMediaUrl = (url: string) => {
    const urlPattern = /^(www\.)|^(http(s)?:\/\/)/i;
    return urlPattern.test(url);
  };
  const handleSubmit = () => {
    if (isVideoUrl(inputValue)) {
      addVideoBlock(inputValue);
      closeModal();
    } else if (isSocialMediaUrl(inputValue)) {
      addSocialMediaBlock(inputValue);
      closeModal();
    } else {
      setError('Invalid URL');
    }
  };

  const addSocialMediaBlock = (linkUrl) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('social-media', 'IMMUTABLE', { linkUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const newEditorStateWithBlock = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    setEditorState(newEditorStateWithBlock);
    setSelectedSocialMedia(linkUrl);
  };

  const addVideoBlock = (videoUrl) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('video', 'IMMUTABLE', { src: videoUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const newEditorStateWithBlock = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    setSelectedVideo(videoUrl);
    setEditorState(newEditorStateWithBlock);
  };

  const SocialMediaBlock = ({ linkUrl }) => {
    return (
      <div className="social-media-block">
        <SocialMediaBlockComponent linkUrl={linkUrl} />
      </div>
    );
  };

  return (
    <div ref={rootElementRef} className="App">
      <div className="Editor-wrapper">
        <header className="App-header">This is the title</header>
        <div className="Editor-container">
          <EditorComponent editorState={editorState} setEditorState={setEditorState} />
          {isLoading && (
            <div className="loader-container">
              <div className="loader"></div>
              <span>uploading image...</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        {selectedImage && (
          <div>
            <img src={selectedImage} alt="Selected" height="150px" width="150px" />
          </div>
        )}
        {selectedVideo && (
          <div>
            <VideoBlock src={selectedVideo} />
          </div>
        )}
        {selectedSocialMedia && (
          <div>
            <SocialMediaBlock linkUrl={selectedSocialMedia} />
          </div>
        )}
      </div>

      <button onClick={handleButtonClick}>+</button>
      <div>
        {isModalOpen && (
          <ModalComponent
            isOpen={isModalOpen}
            closeModal={closeModal}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            error={error}
          />
        )}
      </div>
      {showDropdown && <Dropdown handleOptionClick={handleOptionClick} />}
    </div>
  );
}

export default App;
