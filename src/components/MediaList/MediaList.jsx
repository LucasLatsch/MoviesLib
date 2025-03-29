import Card from "../Card/Card";
import "./MediaList.css";

const MediaGrid = ({ mediaList, type }) => {
  return (
    <div className="media-container">
      {mediaList && mediaList.length === 0 && <p>Carregando...</p>}
      {mediaList &&
        mediaList.length > 0 &&
        mediaList.map((item) => (
          <Card key={item.id} media={item} type={type} />
        ))}
    </div>
  );
};

export default MediaGrid;
