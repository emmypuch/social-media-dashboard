import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        fontSize: "1.5rem",
        cursor: "pointer",
        padding: "10px",
        height: "55px",
        width: "55px",
        borderRadius: "50%",
      }}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
