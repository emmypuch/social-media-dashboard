import { useTranslation } from "react-i18next";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: ${({ theme }) => theme.buttonBackground};
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: ${({ theme }) => theme.buttonTextColor};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background: ${({ theme }) => theme.background};
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  z-index: 1;

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.buttonTextColor};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).catch((err) => {
      console.error("Error changing language:", err);
    });
  };

  return (
    <DropdownContainer>
      <DropdownButton>🌐 Language</DropdownButton>
      <DropdownContent>
        <DropdownItem onClick={() => changeLanguage("en")}>
          English
        </DropdownItem>
        <DropdownItem onClick={() => changeLanguage("es")}>
          Español
        </DropdownItem>
        <DropdownItem onClick={() => changeLanguage("fr")}>
          Français
        </DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default LanguageSwitcher;
