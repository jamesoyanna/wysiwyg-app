import React, { useState, useEffect, useRef } from 'react';
import { ContentState, convertToRaw, convertFromRaw  } from 'draft-js';
import { EditorState, AtomicBlockUtils  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Modal from 'react-modal';
import ImagePlugin from 'draft-js-image-plugin';
 import VideoPlugin from 'draft-js-video-plugin';
 import ReactPlayer from 'react-player';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';
import PictureIcon from './icons/picture-icon.png'
import VideoIcon from './icons/video-icon.png'
import SocialIcon from './icons/facebook-con.svg'

const imagePlugin = ImagePlugin();
const videoPlugin = VideoPlugin()

function App() {
  const _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const contentState = convertFromRaw(raw); // Convert raw JSON to ContentState
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const fileInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

const [videoLink, setVideoLink] = useState('');
const [socialMediaLink, setSocialMediaLink] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [inputValue, setInputValue] = useState('');
const [error, setError] = useState('');


const openModal = () => {
  setIsModalOpen(true);
};

// Function to handle closing the modal
const closeModal = () => {
  setIsModalOpen(false);
  setInputValue('');
  setError('');
};

const rootElementRef = useRef(null);


useEffect(() => {
  Modal.setAppElement(rootElementRef.current);
}, []);



  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleImageUpload = async (file) => {
    try {
      setIsLoading(true);

      // Create a new FormData object
      const formData = new FormData();
      formData.append('file', file); // Append the selected file to the FormData

      // Add your Cloudinary upload preset name
      const uploadPreset = 'wazobia';
      formData.append('upload_preset', uploadPreset); // Append the upload preset to the FormData

      // Add your Cloudinary cloud name
      const cloudName = 'startupbuz';

      // Make a POST request to the Cloudinary upload API
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url; // Get the secure URL of the uploaded image

        // Set the selected image with the Cloudinary URL
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
      setVideoLink('');
      openModal();
    } else if (option === 'social-media') {
      setSocialMediaLink('');
      openModal();
    }
  };
  
  const isVideoUrl = (url) => {
    const youtubePattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
    return youtubePattern.test(url);
  };
  
  const isSocialMediaUrl = (url) => {
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
  
  const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      const contentState = editorState.getCurrentContent();
      const entity = contentState.getEntity(block.getEntityAt(0));
      const type = entity.getType();
  
      if (type === 'video') {
        const { src } = entity.getData();
        return {
          component: VideoBlock,
          editable: false,
          props: {
            src: src,
          },
        };
      } else if (type === 'social-media') {
        const { linkUrl } = entity.getData();
        return {
          component: SocialMediaBlock,
          editable: false,
          props: {
            linkUrl: linkUrl,
          },
        };
      }
    }
  
    return null;
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

  const VideoBlock = ({ src }) => {
    return (
      <div className="video-block">
        <ReactPlayer url={src} controls width="100%" height="auto" />
      </div>
    );
  };
  
  const SocialMediaBlock = ({ linkUrl }) => {
    return (
      <div className="social-media-block">
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkUrl}
        </a>
      </div>
    );
  };
  
  return (
    <div ref={rootElementRef} className="App">
      <div className="Editor-wrapper">
        <header className="App-header">This is the title</header>
        <div className="Editor-container">
          
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              options: ['blockType', 'link', 'image', 'textAlign', 'inline', 'list'],
              blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
              },
              inline: {
                options: ['bold', 'italic'],
              },
              list: {
                options: ['ordered', 'unordered', 'indent'],
              },
              link: {
                options: ['link'],
              },
              image: {
                className: 'custom-option-class',
                uploadEnabled: false, // Disable image upload via toolbar
                alt: { present: true, mandatory: true },
                previewImage: true,
                alignmentEnabled: true,
                defaultSize: {
                  width: '100%',
                  height: 'auto',
                },
              },
              textAlign: {
                options: ['left', 'center', 'right'],
              },
            }}
            plugins={[imagePlugin, videoPlugin]}
            blockRendererFn={mediaBlockRenderer}
          ></Editor>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          {/* Modal content */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // className="modal-input"
            placeholder="Enter URL"
            className={error ? 'modal-input modal-input-error' : 'modal-input'}
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
    </div>

       {showDropdown && (
         <div className="dropdown-container">
           <h2 className="dropdown-title">EMBEDS</h2>
         <ul className="dropdown-options">
           <li onClick={() => handleOptionClick('image')}>
             <img src={PictureIcon} alt="icon" className="option-icon" />
             <div>
               <span className="option-title">Picture</span>
               <p className="option-description">JPEG, PNG</p>
             </div>
           </li>
           <li onClick={() => handleOptionClick('video')}>
        <img src={VideoIcon} alt="Video" className="option-icon" />
       <div>
    <span className="option-title">Video</span>
    <p className="option-description">Embed a YouTube video</p>
  </div>
</li>
           <li onClick={() => handleOptionClick('social-media')}>
             <img src={SocialIcon} alt="Social Media" className="option-icon" />
             <div>
               <span className="option-title">Social</span>
               <p className="option-description">Embed a Facebook link</p>
             </div>
           </li>
         </ul>
       </div>
       
        )}
    </div>
  );

}

export default App;
