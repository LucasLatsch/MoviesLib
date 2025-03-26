// hooks/useFetchMediaList.js
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const useFetchMediaList = (type, category, genre, page, language) => {
  const [media, setMedia] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMedia = async () => {
      setLoading(true);

      // Definir a URL de acordo com o tipo de mídia
      let url = "";
      if (type === "movie") {
        const movieURL = import.meta.env.VITE_API_MOVIE;
        const movieDiscoverURL = import.meta.env.VITE_API_DISCOVER_MOVIE;
        url = genre
          ? `${movieDiscoverURL}?${apiKey}&page=${page}&language=${language}&with_genres=${genre}`
          : `${movieURL}${category}?${apiKey}&page=${page}&language=${language}`;
      } else if (type === "tv") {
        const tvURL = import.meta.env.VITE_API_TV;
        const tvDiscoverURL = import.meta.env.VITE_API_DISCOVER_TV;
        url = genre
          ? `${tvDiscoverURL}?${apiKey}&page=${page}&language=${language}&with_genres=${genre}`
          : `${tvURL}${category}?${apiKey}&page=${page}&language=${language}`;
      } else if (type === "person") {
        const personURL = import.meta.env.VITE_API_PEOPLE;
        url = `${personURL}?${apiKey}&page=${page}&language=${language}`;
        console.log(url);
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMedia(data.results || data.cast || []); // Ajusta para lidar com diferentes tipos de resposta
        setTotalPages(data.total_pages - 2); // Ajuste no total de páginas (se necessário)
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      } finally {
        setLoading(false);
      }
    };

    getMedia();
    window.scrollTo(0, 0);
  }, [type, category, genre, page, language]);

  return { media, totalPages, loading };
};

export default useFetchMediaList;
