import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../../components/Details/MovieDetails";
import "./Details.css";
import TvDetails from "../../components/Details/TvDetails";

const MoviePage = () => {
  const { id, type } = useParams(); // Pega o id da URL

  return (
    <div>
      {type === "movie" && <MovieDetails id={id} />}
      {type === "tv" && <TvDetails id={id} />}
      {type === "person" && <MovieDetails id={id} />}
    </div>
  );
};

export default MoviePage;
