import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import YouTubeVideo from "../YoutubeVideo/YouTubeVideo";
import useFetchMediaDetails from "../../hooks/useFetchMediaDetails";
import TitleSection from "../TitleSection/TitleSection";

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

      {/* Dropdown de Seleção de Temporada */}
      <div className="season-dropdown">
        <TitleSection title={"Temporadas"} />
        <select
          id="season-select"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          {media?.seasons.map((season, index) => (
            <option key={season.id} value={index}>
              {season.name}
            </option>
          ))}
        </select>
      </div>

      {/* Exibição da Temporada Selecionada */}
      <div className="season-container">
        {media?.seasons[selectedSeason] && (
          <div className="season-card">
            <img
              style={{ height: "20em" }}
              src={imageSrc + media.seasons[selectedSeason].poster_path}
              alt={media.seasons[selectedSeason].name}
            />
            <div className="season-info">
              <p>{media.seasons[selectedSeason].name}</p>
              <p>{media.seasons[selectedSeason].overview}</p>
              <p>{media.seasons[selectedSeason].episode_count} Episódios</p>
              <p>
                {new Date(media.seasons[selectedSeason].air_date).getFullYear()}
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
