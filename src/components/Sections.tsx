import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import styled from "styled-components";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const SectionContainer = styled.div`
  background: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: left;
`;

const SectionTitle = styled.h3`
  color: #222;
  margin-bottom: 10px;
`;

const Sections = ({ title, children }: SectionProps) => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <SectionTitle>{t(title)}</SectionTitle>
      {children}
    </SectionContainer>
  );
};

export default Sections;
