// hooks/useFetchMediaList.js
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const useFetchMediaList = (type, timeWindow, language) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMedia = async () => {
      setLoading(true);

      // Definir a URL de acordo com o tipo de mídia (movie ou tv) e timeWindow (day/week)
      let url = "";
      if (type === "movie") {
        const movieURL = import.meta.env.VITE_API_TRENDING_MOVIE;
        url = `${movieURL}${timeWindow}?${apiKey}&language=${language}`;
      } else if (type === "tv") {
        const tvURL = import.meta.env.VITE_API_TRENDING_TV;
        url = `${tvURL}${timeWindow}?${apiKey}&language=${language}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMedia(data.results || []); // Definindo os resultados recebidos como mídia
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      } finally {
        setLoading(false);
      }
    };

    getMedia();
  }, [type, timeWindow, language]);

  return { media, loading };
};

export default useFetchMediaList;
