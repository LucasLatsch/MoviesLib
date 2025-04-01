import React from "react";
import { SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import TitleSection from "../TitleSection/TitleSection";
import Carousel from "../Carousel/Carousel";
import YouTubeVideo from "../YoutubeVideo/YouTubeVideo";
import useFetchMediaDetails from "../../hooks/useFetchMediaDetails";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const imageSrc = import.meta.env.VITE_IMG;

const defaultImage = "/assets/backImage.svg";

const MovieDetails = ({ id }) => {
  const navigate = useNavigate();
  const { media, credits, providers, recommendations, videos, loading } =
    useFetchMediaDetails("movie", id);

  const handleClick = (actorId) => {
    navigate(`/details/person/${actorId}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="details-container">
      <div className="image-container">
        <img
          className="backdrop"
          src={
            media.backdrop_path ? imageSrc + media.backdrop_path : defaultImage
          }
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
                <span key={actor.id} onClick={() => handleClick(actor.id)}>
                  {actor.name}
                  {index < array.length - 1 ? ", " : ""}
                </span>
              ))}
          </div>
          <div className="credits-container">
            <p>Produtoras: </p>
            {media?.production_companies &&
              media.production_companies.map((prod, index, array) => (
                <span key={prod.id}>
                  {prod.name}
                  {index < array.length - 1 ? ", " : ""}
                </span>
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
      {videos?.results[0]?.key ? (
        <div className="trailer-container">
          <TitleSection title={"Trailer"} />

          <YouTubeVideo videoId={videos?.results[0]?.key} />
        </div>
      ) : (
        <></>
      )}

      {recommendations?.results.length ? (
        <div className="recommendations-container">
          <TitleSection title={"Recomendados"} />
          <Carousel id={"trending-movies"}>
            {recommendations?.results.map((media) => (
              <SwiperSlide key={media.id}>
                <Card media={media} type={"movie"} swiper={true} />
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovieDetails;
