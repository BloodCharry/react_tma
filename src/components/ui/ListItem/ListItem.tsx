import React from 'react';
import styled from 'styled-components';

const Row = styled.div<{ $selectable?: boolean; $selected?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBg};
  cursor: ${({ $selectable }) => ($selectable ? 'pointer' : 'default')};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.lightBg : 'transparent'};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $selectable, theme }) =>
      $selectable ? theme.colors.lightBg : 'transparent'};
  }
`;

const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;

const Right = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export interface ListItemProps {
  /** URL аватара */
  avatar?: string;
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Бейдж справа */
  badge?: string | number;
  /** Контент справа (кнопки, иконки и т.д.) */
  right?: React.ReactNode;
  /** Можно ли выбрать элемент */
  selectable?: boolean;
  /** Выбран ли элемент */
  selected?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  avatar,
  title,
  subtitle,
  badge,
  right,
  selectable = false,
  selected = false,
  onClick,
}) => {
  return (
    <Row
      $selectable={selectable}
      $selected={selected}
      onClick={selectable ? onClick : undefined}
    >
      {avatar ? (
        <AvatarImg src={avatar} alt={title} />
      ) : (
        <AvatarImg src="/placeholder.png" alt={title} />
      )}

      <div>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>

      <Right>
        {badge && (
          <div
            aria-hidden
            style={{
              background: '#eee',
              padding: '6px 8px',
              borderRadius: 10,
            }}
          >
            {badge}
          </div>
        )}
        {right}
      </Right>
    </Row>
  );
};

export default ListItem;
