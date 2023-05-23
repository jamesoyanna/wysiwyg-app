import React from 'react';
import DropdownOptions from './DropdownOptions';
import "./dropdown.css";

interface Option {
  option: string;
  icon: string;
  title: string;
  description: string;
}

interface DropdownProps {
  handleOptionClick: (option: string) => void;
}

const options: Option[] = [
  {
    option: 'image',
    icon: require('../../icons/picture-icon.png'),
    title: 'Picture',
    description: 'JPEG, PNG',
  },
  {
    option: 'video',
    icon: require('../../icons/video-icon.png'),
    title: 'Video',
    description: 'Embed a YouTube video',
  },
  {
    option: 'social-media',
    icon: require('../../icons/facebook-circle.png'),
    title: 'Social',
    description: 'Embed a Facebook link',
  },
];

const Dropdown: React.FC<DropdownProps> = ({ handleOptionClick }) => {
  return (
    <div className="dropdown-container">
      <h2 className="dropdown-title">EMBEDS</h2>
      <ul className="dropdown-options">
        {options.map((option) => (
          <DropdownOptions
            key={option.option}
            handleOptionClick={handleOptionClick}
            {...option}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
