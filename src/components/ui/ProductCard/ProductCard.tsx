import styled from 'styled-components';
import Button from '../Button/Button';

const Card = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lightBg};
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'available':
        return theme.colors.success;
      case 'issued':
        return theme.colors.primary;
      case 'returned':
        return theme.colors.neutral;
      case 'broken':
        return theme.colors.destructive;
      default:
        return theme.colors.neutral;
    }
  }};
  color: white;
`;

export interface ProductCardProps {
  imageUrl?: string;
  title: string;
  code?: string;
  description?: string;
  status?: 'available' | 'issued' | 'returned' | 'broken';
  actions?: React.ReactNode;
  onPrimaryAction?: () => void;
  primaryText?: string;
  secondaryText?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  code,
  description,
  status,
  actions,
  onPrimaryAction,
  primaryText = 'Выдать',
}) => {
  return (
    <Card>
      <Img src={imageUrl} alt={title} />
      <Info>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            {code && (
              <div style={{ color: '#8E8E93', fontSize: 13 }}>{code}</div>
            )}
          </div>
          {status && <StatusBadge status={status}>{status}</StatusBadge>}
        </div>
        <div style={{ color: '#6E6E73', fontSize: 13, marginTop: 8 }}>
          {description}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
          {actions}
          {onPrimaryAction && (
            <Button variant="primary" onClick={onPrimaryAction}>
              {primaryText}
            </Button>
          )}
        </div>
      </Info>
    </Card>
  );
};

export default ProductCard;