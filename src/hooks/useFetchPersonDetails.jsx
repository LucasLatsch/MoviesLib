import { useState, useEffect } from "react";

const detailUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const useFetchPersonDetails = (id, language) => {
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  const [galery, setGalery] = useState([]);
  const [combinedCredits, setCombinedCredits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const mediaUrl = `${detailUrl}person/${id}?${apiKey}`;
        const mediaImageUrl = `${detailUrl}person/${id}/images?${apiKey}`;
        const creditsUrl = `${detailUrl}person/${id}/combined_credits?${apiKey}&language=${language}`;

        const personReq = await fetch(mediaUrl);
        const personRes = await personReq.json();
        setPerson(personRes);

        const galeryReq = await fetch(mediaImageUrl);
        const galeryRes = await galeryReq.json();
        setGalery(galeryRes.profiles);

        const creditsReq = await fetch(creditsUrl);
        const creditsRes = await creditsReq.json();
        setCombinedCredits(creditsRes.cast.slice(0, 20));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, language]);

  return { person, loading, galery, combinedCredits };
};

export default useFetchPersonDetails;
