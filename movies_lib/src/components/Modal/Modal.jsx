import "./Modal.css";

const Modal = ({ media, onClose }) => {
  if (!media) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`}
          alt={media.title || media.name}
        />
        <h2>{media.title || media.name}</h2>
        <p>{media.overview || "Descrição não disponível."}</p>
        <p>
          <strong>Nota:</strong> {media.vote_average}
        </p>
        <p>
          <strong>Data de lançamento:</strong>{" "}
          {media.release_date || media.first_air_date}
        </p>
      </div>
    </div>
  );
};

export default Modal;
