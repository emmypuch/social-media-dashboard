import { useTranslation } from "react-i18next";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ClipLoader } from "react-spinners";
import "../App.css";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useTheme } from "../components/context/ThemeContext";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  text-align: center;
  padding: 20px;
  animation: ${fadeIn} 0.8s ease-in-out;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;

  /* Medium screens (tablets) */
  @media screen and (min-width: 480px) {
    font-size: 1rem;
  }

  /* Large screens (desktops) */
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.inputBackground};
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 1.2s ease-in-out;

  @media screen and (min-width: 480px) {
    width: 70%;
    padding: 15px;
    gap: 15px;
  }

  @media screen and (min-width: 768px) {
    width: 30%;
    padding: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  text-align: center;
  transition: all 0.3s ease;

  &:focus {
    transform: scale(1.05);
    background: ${({ theme }) => theme.inputFocusBackground};
  }
`;

const Button = styled.button`
  background: #ff7eb3;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1.5s ease-in-out;

  &:hover {
    background: #ff4a94;
    transform: scale(1.1);
  }
`;

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Home = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { themeObject } = useTheme();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      setTimeout(() => {
        window.location.href = `/dashboard?username=${username}`;
      }, 2000);
    }
  };

  return (
    <Container theme={themeObject}>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <Title>{t("home.title")}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("home.placeholder")}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <ClipLoader color="#fff" size={20} /> : t("home.submit")}{" "}
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
