import React, { useState, useRef } from 'react';
import { ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import ImagePlugin from 'draft-js-image-plugin';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';
import PictureIcon from './icons/picture-icon.png'
import VideoIcon from './icons/video-icon.png'
import SocialIcon from './icons/facebook-con.svg'

const imagePlugin = ImagePlugin();

function App() {
  const _contentState = ContentState.createFromText('Sample content state');
  const raw = convertToRaw(_contentState);
  const contentState = convertFromRaw(raw); // Convert raw JSON to ContentState
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleImageUpload = async (file) => {
    try {
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
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
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
    console.log('Selected Option:', option);
    setShowDropdown(false);
  };
  

  return (
    <div className="App">
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
            plugins={[imagePlugin]}
          ></Editor>

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
      </div>
      <button onClick={handleButtonClick}>+</button>
       {/* Dropdown */}
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
