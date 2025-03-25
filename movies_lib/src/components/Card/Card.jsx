import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

import StarRating from "../StarRating/StarRating";
import Modal from "../Modal/Modal";

import "./Card.css";

const imageUrl = import.meta.env.VITE_IMG;
const defaultImage = "/default-image.png"; // Defina uma imagem padrão no seu projeto

const Card = ({ media, type, swiper = false }) => {
  const navigate = useNavigate();
  const mediaTitle = type === "movie" ? media.title : media.name;
  const mediaImage = type === "person" ? media.profile_path : media.poster_path;
  const imageSrc = mediaImage ? imageUrl + mediaImage : defaultImage;

  const handleCardClick = (id) => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <>
      <div
        className={swiper ? "media-card" : "media-card no-swiper"}
        onClick={() => handleCardClick(media.id)}
      >
        {/* Selo de Avaliação */}
        {type !== "person" && (
          <div className="rating-tag">
            <StarRating rating={media.vote_average} />
            <span className="rating-number">{media.vote_average}</span>
          </div>
        )}

        <img src={imageSrc} alt={mediaTitle} />

        {/* Informações */}
        <div className="media-info">
          {type === "person" ? (
            <div className="container-card">
              <p className="rating-tag">{mediaTitle}</p>
              <p>
                <strong>Conhecido por:</strong>
              </p>
              <ul>
                {media.known_for.map((item) => (
                  <li key={item.id}>{item.title || item.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="container-card">
              <p>{mediaTitle}</p>
              <p>{media.release_date}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
