import React from 'react';

const SocialMediaBlockComponent = ({ linkUrl }) => {
  return (
    <div className="social-media-block">
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        {linkUrl}
      </a>
    </div>
  );
};

export default SocialMediaBlockComponent;
