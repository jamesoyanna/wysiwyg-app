import React from 'react';
import PictureIcon from '../icons/picture-icon.png';
import VideoIcon from '../icons/video-icon.png';
import SocialIcon from '../icons/facebook-con.svg';

interface DropdownProps {
  handleOptionClick: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ handleOptionClick }) => {
  return (
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
  );
};

export default Dropdown;
