import { useState, useEffect } from "react";
import "./NotFound.css";

const NotFound = () => {
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      setHeight(`calc(100vh - ${navbarHeight}px)`);
    }
  }, []);

  return (
    <div className="not-found" style={{ height }}>
      <h1>404</h1>
      <h2>Página Não Encontrada</h2>
      <p>A página que você está procurando não existe ou foi movida.</p>
      <a href="/" className="back-home">
        Voltar para a Home
      </a>
    </div>
  );
};

export default NotFound;
