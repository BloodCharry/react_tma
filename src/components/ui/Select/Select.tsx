import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Input from '../Input/Input';
import { DropdownOption } from '../Dropdown/Dropdown';

const SelectWrapper = styled.div`
  position: relative;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const SelectInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.body};
  min-height: 40px;
  flex-wrap: wrap;
  gap: 4px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
  }
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 13px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  margin-left: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: bold;
`;

const DropdownIcon = styled.span<{ isOpen: boolean }>`
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const OptionsContainer = styled.div<{ isOpen: boolean }>`
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

const OptionItem = styled.div<{ isSelected?: boolean; isFocused?: boolean }>`
  padding: 10px 14px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.body};
  
  &:hover, &.focused {
    background-color: ${({ theme }) => theme.colors.lightBg};
  }
  
  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.colors.lightBg};
    font-weight: 600;
  `}
`;

const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export interface SelectProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Выберите...',
  searchable = false,
  multiple = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Приводим value к массиву для единообразной обработки
  const values = useMemo(() => (Array.isArray(value) ? value : [value]), [value]);

  // Фильтруем опции на основе поискового запроса
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchValue('');
        setFocusedIndex(-1);
      }
    }
  };

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      // Для множественного выбора
      const newValues = values.includes(optionValue)
        ? values.filter(v => v !== optionValue)
        : [...values, optionValue];

      onChange?.(newValues);
    } else {
      // Для одиночного выбора
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchValue('');
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      const newValues = values.filter(v => v !== optionValue);
      onChange?.(newValues);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchValue('');
        setFocusedIndex(-1);
        break;
    }
  };

  const selectedOptions = options.filter(option => values.includes(option.value));

  return (
    <SelectWrapper ref={selectRef}>
      <SelectContainer>
        <SelectInput
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {multiple && values.length > 0 ? (
            selectedOptions.map(option => (
              <SelectedItem key={option.value}>
                {option.label}
                <RemoveButton
                  onClick={(e) => handleRemove(option.value, e)}
                  aria-label={`Удалить ${option.label}`}
                >
                  ×
                </RemoveButton>
              </SelectedItem>
            ))
          ) : values.length > 0 ? (
            <span>{selectedOptions[0]?.label || placeholder}</span>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}

          {searchable && isOpen && (
            <Input
              ref={inputRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder=""
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                flex: 1,
                minWidth: '50px'
              }}
              onKeyDown={(e) => {
                // Предотвращаем закрытие dropdown при нажатии Backspace в пустом поле
                if (e.key === 'Backspace' && searchValue === '') {
                  e.stopPropagation();
                }
              }}
            />
          )}

          <DropdownIcon isOpen={isOpen}>▼</DropdownIcon>
        </SelectInput>
      </SelectContainer>

      <OptionsContainer isOpen={isOpen} role="listbox">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <OptionItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              isSelected={values.includes(option.value)}
              isFocused={index === focusedIndex}
              className={index === focusedIndex ? 'focused' : ''}
              role="option"
              aria-selected={values.includes(option.value)}
            >
              {option.label}
            </OptionItem>
          ))
        ) : (
          <OptionItem>Нет совпадений</OptionItem>
        )}
      </OptionsContainer>
    </SelectWrapper>
  );
};

export default Select;