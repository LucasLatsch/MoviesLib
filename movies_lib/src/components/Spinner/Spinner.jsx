import { useState, useEffect } from "react";
import "./Spinner.css";

const Spinner = ({ heightContainer }) => {
  const [height, setHeight] = useState("100vh");

  // Função para converter px para rem
  const convertToRem = (px) => {
    const baseFontSize = 16; // Tamanho da fonte raiz padrão
    return `${px / baseFontSize}rem`;
  };

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      setHeight(`calc(100vh - ${convertToRem(navbarHeight)}rem)`); // Convertendo a altura da navbar para rem
    }

    // Se 'heightContainer' for fornecido, converte ele para rem
    if (heightContainer) {
      const containerHeightInPx = parseInt(heightContainer, 10); // Converte a string para número
      setHeight(convertToRem(containerHeightInPx)); // Ajusta a altura com rem
    }
  }, [heightContainer]); // Dependência no heightContainer para recalcular

  return (
    <div className="spinner-container" style={{ height }}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
