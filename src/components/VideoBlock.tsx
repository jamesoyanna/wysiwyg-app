import React from 'react';
import ReactPlayer from 'react-player';

interface VideoBlockProps {
  src: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ src }) => {
  return (
    <div className="video-block">
      <ReactPlayer url={src} controls width="100%" height="auto" />
    </div>
  );
};

export default VideoBlock;
