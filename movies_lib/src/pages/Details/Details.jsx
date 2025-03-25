import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import Card from "../../components/Card/Card";
import TimeRangeToggle from "../../components/TimeRangeToggle/TimeRangeToggle";
import MediaList from "../../components/MediaList/MediaList";
import Carousel from "../../components/Carousel/Carousel";
import "./Details.css";
import YouTubeVideo from "../../components/YoutubeVideo/YouTubeVideo ";

const detailUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Details = () => {
  const [height, setHeight] = useState("100vh");
  const { id, type } = useParams();
  const [media, setMedia] = useState({});
  const [credits, setCredits] = useState(null);
  const [providers, setProviders] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [videos, setVideos] = useState(null);
  const mediaTitle = type === "movie" ? media.title : media.name;
  const mediaImage =
    type === "person" ? media.profile_path : media.backdrop_path;
  const imageSrc = imageUrl + mediaImage;

  const getAllData = async () => {
    const mediaUrl = `${detailUrl}${type}/${id}?${apiKey}&language=pt-BR`;
    const creditsUrl = `${detailUrl}${type}/${id}/credits?${apiKey}&language=pt-BR`;
    const providersUrl = `${detailUrl}${type}/${id}/watch/providers?${apiKey}`;
    const recommendationsUrl = `${detailUrl}${type}/${id}/recommendations?${apiKey}&language=pt-BR`;
    const videosUrl = `${detailUrl}${type}/${id}/videos?${apiKey}&language=pt-BR`;

    const [mediaRes, creditsRes, providersRes, recommendationsRes, videosRes] =
      await Promise.all([
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
    console.log("MEDIA: ", mediaRes);
    console.log("ATORES: ", creditsRes);
    console.log("RECOMENDADOS: ", recommendationsRes);
    console.log("PROVIDERS: ", providersRes.results?.BR);
    console.log("VIDEOS: ", videosRes);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllData();
  }, [id, type]);

  return (
    <div className="details-container">
      <div className="image-container">
        <img className="backdrop" src={imageSrc} alt={mediaTitle} />
        <div className="details-info">
          <h1 className="title">{mediaTitle}</h1>
          {media.tagline ? <p className="tagline">{media.tagline}</p> : <></>}
          <div className="genres-container">
            {media.genres &&
              media.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
          </div>
          <div className="details-header">
            <p>{`${Math.floor(media.runtime / 60)}h ${
              media.runtime % 60
            }min`}</p>
            <p>|</p>
            <p>{new Date(media.release_date).getFullYear()}</p>
            <p>|</p>
            <p>
              {media.original_language &&
                media.original_language[0].toUpperCase() +
                  media.original_language[1].toLowerCase()}
            </p>
          </div>
          <p className="preview">{media.overview}</p>
          <div className="credits-container">
            <p>Estrelado por: </p>
            {credits &&
              credits.slice(0, 5).map((actor, index, array) => (
                <span key={actor.id}>
                  {actor.name}
                  {index < array.length - 1 ? ", " : ""}
                </span>
              ))}
          </div>
          <div className="credits-container">
            <p>Produtoras: </p>
            {media?.production_companies &&
              media.production_companies.map((prod) => <p>{prod.name} </p>)}
          </div>
          <div className="providers-container">
            {providers?.flatrate &&
              providers.flatrate.map((prov) => (
                <a href={media.homepage} target="_blank" key={prov.provider_id}>
                  <img
                    src={imageUrl + prov.logo_path}
                    alt={prov.provider_name}
                  />
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className="trailer-container">
        <p className="title border-line">Trailer</p>
        <YouTubeVideo videoId={videos?.results[0]?.key} />
      </div>
      <div className="recommendations-container">
        <TimeRangeToggle title={type} toggle={false} />
        <Carousel slidesPerView={5} id={"trending-movies"}>
          {recommendations?.results.length === 0 && <p>Carregando...</p>}
          {recommendations?.results.map((media) => (
            <SwiperSlide key={media.id}>
              <Card media={media} type={type} swiper={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Details;
