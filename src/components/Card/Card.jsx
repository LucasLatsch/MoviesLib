import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import "./Card.css";

const imageUrl = import.meta.env.VITE_IMG;
const defaultImageP = "/assets/defaultImage.svg";
const defaultImage = "/assets/defaultImage.jpg";

const translateDepartment = (department) => {
  const translations = {
    Acting: "Ator/Atriz",
    Directing: "Diretor/Diretora",
    Writing: "Roteirista",
    Production: "Produtor/Produtora",
    Editing: "Editor/Editora",
    Camera: "Cinematógrafo/Cinematógrafa",
    Sound: "Designer de Som",
    Art: "Diretor/Diretora de Arte",
    "Costume & Make-Up": "Figurinista/Maquiador(a)",
    "Visual Effects": "Artista de Efeitos Visuais",
    Lighting: "Técnico/Técnica de Iluminação",
    Crew: "Membro da Equipe Técnica",
  };
  return translations[department] || department;
};

const getMediaInfo = (media, type) => {
  switch (type) {
    case "movie":
      return {
        title: media.title,
        image: media.poster_path ? imageUrl + media.poster_path : defaultImage,
        date: media.release_date,
        knownForDepartment: null,
      };
    case "tv":
      return {
        title: media.name,
        image: media.poster_path ? imageUrl + media.poster_path : defaultImage,
        date: media.first_air_date,
        knownForDepartment: null,
      };
    case "person":
      return {
        title: media.original_name,
        image: media.profile_path
          ? imageUrl + media.profile_path
          : defaultImageP,
        date: null,
        knownForDepartment: translateDepartment(media.known_for_department),
      };
    default:
      return {
        title: "Unknown",
        image: null,
        date: null,
        knownForDepartment: null,
      };
  }
};

const Card = ({ media, type, swiper = false }) => {
  const navigate = useNavigate();
  const { title, image, date, knownForDepartment } = getMediaInfo(media, type);

  const handleCardClick = () => {
    navigate(`/details/${type}/${media.id}`);
  };

  return (
    <div
      className={`media-card ${swiper ? "" : "no-swiper"}`}
      onClick={handleCardClick}
    >
      {type !== "person" && (
        <div className="rating-tag">
          <StarRating rating={media.vote_average} />
          <span className="rating-number">{media.vote_average}</span>
        </div>
      )}

      {type === "person" ? (
        <img src={image} alt={title} />
      ) : (
        <img src={image} alt={title} />
      )}

      <div className="media-info">
        <div className="container-card">
          <p>
            {title}
            {date && ` (${new Date(date).getFullYear()})`}
          </p>
          {knownForDepartment && <p>{knownForDepartment}</p>}
        </div>
      </div>
    </div>
  );
};

export default Card;
