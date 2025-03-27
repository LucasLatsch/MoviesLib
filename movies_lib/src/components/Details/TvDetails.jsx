import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import YouTubeVideo from "../YoutubeVideo/YouTubeVideo";
import useFetchMediaDetails from "../../hooks/useFetchMediaDetails";
import TitleSection from "../TitleSection/TitleSection";
import "./Details.css";

const imageSrc = import.meta.env.VITE_IMG;

const TvDetails = ({ id }) => {
  const { media, credits, providers, recommendations, videos, loading } =
    useFetchMediaDetails("tv", id);

  const [selectedSeason, setSelectedSeason] = useState(0);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  return (
    <div className="details-container">
      <div className="image-container">
        <img
          className="backdrop"
          src={imageSrc + media.backdrop_path}
          alt={media.title}
        />
        <div className="details-info">
          <h1 className="title">{media.name}</h1>
          {media.tagline && <p className="tagline">{media.tagline}</p>}
          <div className="genres-container">
            {media.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <div className="details-header">
            <p>{media.number_of_seasons} Temporadas</p>
            <p>|</p>
            <p>{new Date(media.first_air_date).getFullYear()}</p>
            <p>|</p>
            <p>{media.original_language?.toUpperCase().slice(0, 2)}</p>
          </div>
          <p className="preview">{media.overview}</p>

          <div className="credits-container">
            <p>Estrelado por: </p>
            {credits?.slice(0, 5).map((actor, index, array) => (
              <span key={actor.id}>
                {actor.name}
                {index < array.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>

          <div className="credits-container">
            <p>Produtoras: </p>
            {media?.production_companies?.map((prod) => (
              //navegar para pagina do ator quando clicar no nome
              <p key={prod.id}>{prod.name}</p>
            ))}
          </div>

          <div className="providers-container">
            {providers?.flatrate?.map((prov) => (
              <a href={media.homepage} target="_blank" key={prov.provider_id}>
                <img src={imageSrc + prov.logo_path} alt={prov.provider_name} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="season-container">
        <TitleSection title={"Temporadas"} />
        <div className="season-buttons">
          {media?.seasons.map((season, index) => (
            <button
              className="btn"
              key={season.id}
              onClick={handleSeasonChange}
              value={index}
              disabled={selectedSeason === index}
            >
              {season.name}
            </button>
          ))}
        </div>
        <div className="season-card">
          {media?.seasons[selectedSeason] && (
            <div className="season-info-container">
              <img
                style={{ height: "20em" }}
                src={imageSrc + media.seasons[selectedSeason].poster_path}
                alt={media.seasons[selectedSeason].name}
              />
              <div className="season-info">
                <div className="season-header">
                  <p className="title">{media.seasons[selectedSeason].name}</p>
                  <p className="year">
                    {new Date(
                      media.seasons[selectedSeason].air_date
                    ).getFullYear()}
                  </p>
                </div>
                <p className="preview">
                  {media.seasons[selectedSeason].overview}
                </p>
                <p className="episodes">
                  {media.seasons[selectedSeason].episode_count} Episódios
                </p>

                {media.seasons[selectedSeason].vote_average !== 0 ? (
                  <p>{media.seasons[selectedSeason].vote_average}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="trailer-container">
        <TitleSection title={"Trailer"} />
        <YouTubeVideo videoId={videos?.results[0]?.key} />
      </div>

      <div className="recommendations-container">
        <TitleSection title={"Recomendados"} />
        <Carousel slidesPerView={5} id={"trending-movies"}>
          {recommendations?.results.length === 0 && <p>Carregando...</p>}
          {recommendations?.results.map((media) => (
            <SwiperSlide key={media.id}>
              <Card media={media} type={"tv"} swiper={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TvDetails;
