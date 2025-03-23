import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 10px;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 45px;
    width: 45px;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    height: 35px;
    width: 35px;
    font-size: 1rem;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledButton onClick={toggleTheme}>
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </StyledButton>
  );
};

export default ThemeToggle;
