import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../../components/Details/MovieDetails";
import TvDetails from "../../components/Details/TvDetails";
import PersonDetails from "../../components/Details/PersonDetails";

const MoviePage = () => {
  const { id, type } = useParams();

  return (
    <div>
      {type === "movie" && <MovieDetails id={id} />}
      {type === "tv" && <TvDetails id={id} />}
      {type === "person" && <PersonDetails id={id} />}
    </div>
  );
};

export default MoviePage;
