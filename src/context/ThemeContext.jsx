import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Carregar o tema inicial do localStorage, ou "light" se não houver nenhum tema salvo
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light");

  // Alterar o tema e salvar no localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Agora salva o novo tema no localStorage
  };

  // Garantir que o tema seja aplicado à página
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]); // Alterar o tema da página sempre que o estado mudar

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
