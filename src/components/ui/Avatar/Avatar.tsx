import styled from 'styled-components';

const AvatarWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.lightBg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusBadge = styled.div<{ status: 'online' | 'offline' | null }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: ${({ status, theme }) =>
    status === 'online' ? theme.colors.success : status === 'offline' ? theme.colors.neutral : 'transparent'};
`;

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: string;
  status?: 'online' | 'offline' | null;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', size = 48, fallback, status = null }) => {
  return (
    <AvatarWrapper size={size}>
      {src ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <div>{fallback || alt.charAt(0)}</div>
      )}
      {status !== null && <StatusBadge status={status} />}
    </AvatarWrapper>
  );
};

export default Avatar;