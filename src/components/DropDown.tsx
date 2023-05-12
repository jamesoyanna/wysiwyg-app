import React from 'react';
import DropdownOptions from './DropdownOptions';


interface DropdownProps {
  handleOptionClick: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ handleOptionClick }) => {
  const options = [
    {
      option: 'image',
      icon: require('../icons/picture-icon.png'),
      title: 'Picture',
      description: 'JPEG, PNG',
    },
    {
      option: 'video',
      icon: require('../icons/video-icon.png'),
      title: 'Video',
      description: 'Embed a YouTube video',
    },
    {
      option: 'social-media',
      icon: require('../icons/facebook-circle.png'),
      title: 'Social',
      description: 'Embed a Facebook link',
    },
  ];

  return (
    <div className="dropdown-container">
      <h2 className="dropdown-title">EMBEDS</h2>
      <ul className="dropdown-options">
        {options.map((option) => (
          <DropdownOptions
            key={option.option}
            option={option.option}
            icon={option.icon}
            title={option.title}
            description={option.description}
            handleOptionClick={handleOptionClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
