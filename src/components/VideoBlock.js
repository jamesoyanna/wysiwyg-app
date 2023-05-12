import React from 'react';
import ReactPlayer from 'react-player';

const VideoBlock = ({ src }) => {
  return (
    <div className="video-block">
      <ReactPlayer url={src} controls width="100%" height="auto" />
    </div>
  );
};

export default VideoBlock;
