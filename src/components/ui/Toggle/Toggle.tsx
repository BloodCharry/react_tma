import styled from 'styled-components';

const ToggleWrapper = styled.label<{ size: 'sm' | 'md' }>`
  position: relative;
  display: inline-block;
  width: ${({ size }) => (size === 'sm' ? '40px' : '50px')};
  height: ${({ size }) => (size === 'sm' ? '24px' : '30px')};
  cursor: pointer;
`;

const Slider = styled.span<{ size: 'sm' | 'md'; checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.neutral};
  transition: .4s;
  border-radius: ${({ size }) => (size === 'sm' ? '24px' : '30px')};

  &:before {
    position: absolute;
    content: "";
    height: ${({ size }) => (size === 'sm' ? '20px' : '26px')};
    width: ${({ size }) => (size === 'sm' ? '20px' : '26px')};
    left: ${({ size }) => (size === 'sm' ? '2px' : '2px')};
    bottom: ${({ size }) => (size === 'sm' ? '2px' : '2px')};
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    transform: ${({ checked, size }) =>
      checked ? `translateX(${size === 'sm' ? '16px' : '20px'})` : 'translateX(0)'};
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
`;

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  size = 'md',
  disabled = false,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <ToggleWrapper size={size}>
        <HiddenCheckbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-checked={checked}
        />
        <Slider size={size} checked={checked} />
      </ToggleWrapper>
      {label && <span>{label}</span>}
    </div>
  );
};

export default Toggle;