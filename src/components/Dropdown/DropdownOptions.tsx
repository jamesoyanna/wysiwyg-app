import React from 'react'
import "./dropdown.css";

interface OptionProps {
    option: string;
    icon: string;
    title: string;
    description: string;
    handleOptionClick: (option: string) => void;
  }
  
  const DropdownOptions: React.FC<OptionProps> = ({ option, icon, title, description, handleOptionClick }) => {
    const handleClick = () => {
      handleOptionClick(option);
    };
  
    return (
      <li onClick={handleClick}>
        <img src={icon} alt="icon" className="option-icon" />
        <div>
          <span className="option-title">{title}</span>
          <p className="option-description">{description}</p>
        </div>
      </li>
    );
  };

export default DropdownOptions;