import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.body};
  width: 100%;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled.div<{ isSelected?: boolean }>`
  padding: 10px 14px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.body};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBg};
  }
  
  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.colors.lightBg};
    font-weight: 600;
  `}
`;

const DropdownIcon = styled.span<{ isOpen: boolean }>`
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownButton
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <DropdownIcon isOpen={isOpen}>▼</DropdownIcon>
      </DropdownButton>
      <DropdownMenu isOpen={isOpen} role="listbox">
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            isSelected={option.value === value}
            role="option"
            aria-selected={option.value === value}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default Dropdown;