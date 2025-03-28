// hooks/useFetchMediaDetails.js
import { useState, useEffect } from "react";

const detailUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const useFetchMediaDetails = (type, id) => {
  const [media, setMedia] = useState({});
  const [credits, setCredits] = useState(null);
  const [providers, setProviders] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const mediaUrl = `${detailUrl}${type}/${id}?${apiKey}&language=pt-BR`;
        const creditsUrl = `${detailUrl}${type}/${id}/credits?${apiKey}&language=pt-BR`;
        const providersUrl = `${detailUrl}${type}/${id}/watch/providers?${apiKey}`;
        const recommendationsUrl = `${detailUrl}${type}/${id}/recommendations?${apiKey}&language=pt-BR`;
        const videosUrl = `${detailUrl}${type}/${id}/videos?${apiKey}&language=pt-BR`;

        const [
          mediaRes,
          creditsRes,
          providersRes,
          recommendationsRes,
          videosRes,
        ] = await Promise.all([
          fetch(mediaUrl).then((res) => res.json()),
          fetch(creditsUrl).then((res) => res.json()),
          fetch(providersUrl).then((res) => res.json()),
          fetch(recommendationsUrl).then((res) => res.json()),
          fetch(videosUrl).then((res) => res.json()),
        ]);

        setMedia(mediaRes);
        setCredits(creditsRes.cast);
        setProviders(providersRes.results?.BR || null);
        setRecommendations(recommendationsRes);
        setVideos(videosRes);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [type, id]);

  return { media, credits, providers, recommendations, videos, loading };
};

export default useFetchMediaDetails;
