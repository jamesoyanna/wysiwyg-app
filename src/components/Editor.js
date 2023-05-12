import React, { useState, useEffect, useRef } from 'react';
import { ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImagePlugin from 'draft-js-image-plugin';
import VideoPlugin from 'draft-js-video-plugin';
import '../App.css';

const imagePlugin = ImagePlugin();
const videoPlugin = VideoPlugin();

const EditorComponent = () => {
  const _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const contentState = convertFromRaw(raw);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const [wordCount, setWordCount] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fileInputRef.current = document.createElement('input');
    fileInputRef.current.type = 'file';
  }, []);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText('');
    const words = plainText.trim().split(/\s+/);
    setWordCount(words.length);
  };
  

  const handleImageUpload = (file) => {
    // Handle image upload logic here
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const mediaBlockRenderer = (block) => {
    // Handle media block rendering logic here
  };

  const addImageBlock = () => {
    // Handle adding an image block logic here
  };

  return (
    <div className="EditorComponent">
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
            onClick: addImageBlock,
          },
          textAlign: {
            options: ['left', 'center', 'right'],
          },
        }}
        readOnly={wordCount >= 1000}
        plugins={[imagePlugin, videoPlugin]}
        blockRendererFn={mediaBlockRenderer}
      />
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="Editor-footer">
  <div className="word-count">{`${wordCount}/1000 words`}</div>
  <button className="post-button" style={{ backgroundColor: 'green' }}>
    Post
  </button>
</div>
    </div>
  );
};

export default EditorComponent;
