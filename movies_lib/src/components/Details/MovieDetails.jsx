import React from "react";
import { SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import TimeRangeToggle from "../TimeRangeToggle/TimeRangeToggle";
import Carousel from "../Carousel/Carousel";
import YouTubeVideo from "../YoutubeVideo/YouTubeVideo";
import useFetchMediaDetails from "../../hooks/useFetchMediaDetails";

const imageSrc = import.meta.env.VITE_IMG;

const MovieDetails = ({ id }) => {
  const { media, credits, providers, recommendations, videos, loading } =
    useFetchMediaDetails("movie", id);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="details-container">
      <div className="image-container">
        <img
          className="backdrop"
          src={imageSrc + media.backdrop_path}
          alt={media.title}
        />
        <div className="details-info">
          <h1 className="title">{media.title}</h1>
          {media.tagline && <p className="tagline">{media.tagline}</p>}
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
              media.production_companies.map((prod) => (
                <p key={prod.id}>{prod.name}</p>
              ))}
          </div>
          <div className="providers-container">
            {providers?.flatrate &&
              providers.flatrate.map((prov) => (
                <a href={media.homepage} target="_blank" key={prov.provider_id}>
                  <img
                    src={imageSrc + prov.logo_path}
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
        <TimeRangeToggle title={"movie"} toggle={false} />
        <Carousel slidesPerView={5} id={"trending-movies"}>
          {recommendations?.results.length === 0 && <p>Carregando...</p>}
          {recommendations?.results.map((media) => (
            <SwiperSlide key={media.id}>
              <Card media={media} type={"movie"} swiper={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieDetails;
