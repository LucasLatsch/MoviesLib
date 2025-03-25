import { useTheme } from "../../context/ThemeContext"; // Importando o contexto de tema
import { HiSun, HiMoon } from "react-icons/hi";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // Usando o contexto para pegar o tema e função de toggle

  return (
    <button onClick={toggleTheme} className="theme-toggle bx-shadow">
      {theme === "dark" ? (
        <HiSun className="icon sun" />
      ) : (
        <HiMoon className="icon moon" />
      )}
    </button>
  );
}
