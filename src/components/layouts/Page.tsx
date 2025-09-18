import styled from 'styled-components';
import {BottomTabBar} from "./BottomTabBar/BottomTabBar";

const PageWrapper = styled.div`
  padding: 60px 0 80px 0; /* Отступы для Header и BottomNav */
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

const SectionWrapper = styled.section`
  margin-bottom: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 8px 16px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export const Page: React.FC<PageProps> = ({ children, className }) => {
  return <PageWrapper className={className}>{children}
  <BottomTabBar />
  </PageWrapper>;
};

export interface SectionProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, action, children }) => {
  return (
    <SectionWrapper>
      {(title || action) && (
        <SectionHeader>
          {title && <SectionTitle>{title}</SectionTitle>}
          {action}
        </SectionHeader>
      )}
      {children}
    </SectionWrapper>
  );
};