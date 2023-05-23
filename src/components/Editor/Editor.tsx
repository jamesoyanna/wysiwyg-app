import React, { useState, useEffect, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './editor.css';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fileInputRef.current = document.createElement('input');
    fileInputRef.current.type = 'file';
  }, []);

  const handleEditorChange = (state) => {
    const contentState = state.getCurrentContent();
    const plainText = contentState.getPlainText('');
    const words = plainText.trim().split(/\s+/);
    const currentWordCount = words.length;

    setEditorState(state);
    setWordCount(currentWordCount);
    setIsLimitExceeded(currentWordCount > 1000);
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
            uploadEnabled: false,
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
        readOnly={isLimitExceeded}
      />

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
      <div className="Editor-footer">
        <span className={`word-count ${isLimitExceeded ? 'exceeded' : ''}`}>
          {`${wordCount}/1000 words`}
        </span>
        {isLimitExceeded && <span className="limit-exceeded">Limit exceeded</span>}
      </div>

    </div>
  );
};

export default EditorComponent;
