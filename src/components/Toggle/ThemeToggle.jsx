import { useTheme } from "../../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";
import "./Toggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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
