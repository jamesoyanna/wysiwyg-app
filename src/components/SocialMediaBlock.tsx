import React from "react";

interface SocialMediaBlockProps {
  linkUrl: string;
}

const SocialMediaBlockComponent: React.FC<SocialMediaBlockProps> = ({ linkUrl }) => {
  return (
    <div className="social-media-block">
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        {linkUrl}
      </a>
    </div>
  );
};

export default SocialMediaBlockComponent;
