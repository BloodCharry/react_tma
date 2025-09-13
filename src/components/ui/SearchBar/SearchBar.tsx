import styled from 'styled-components';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';

const Wrap = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.lightBg};
  border-radius: 10px;
`;

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onAdd?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Я ищу...',
  value,
  onChange,
  onAdd,
}) => {
  return (
    <Wrap>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Icon name="search" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            flex: 1,
            border: 0,
            outline: 'none',
            background: 'transparent',
          }}
        />
        {onAdd && (
          <button onClick={onAdd} aria-label="Добавить">
            <Icon name="plus" />
          </button>
        )}
      </div>
    </Wrap>
  );
};

export default SearchBar;