import React, { useState } from "react";
import Filter from "../../components/Filter/Filter";
import MediaList from "../../components/MediaList/MediaList";
import Pagination from "../../components/Pagination/Pagination";
import useFetchMediaList from "../../hooks/useFetchMediaList ";

const categories = JSON.parse(import.meta.env.VITE_MOVIE_CATEGORIES);
const genres = JSON.parse(import.meta.env.VITE_GENRES_MOVIE);

const Movies = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("top_rated");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("pt-BR");

  const { media, totalPages, loading } = useFetchMediaList(
    "movie",
    category,
    genre,
    page,
    language
  );

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container">
      <Filter
        categories={categories}
        genres={genres}
        category={category}
        genre={genre}
        onCategoryChange={(e) => setCategory(e.target.value)}
        onGenreChange={(e) => setGenre(e.target.value)}
      />
      <h2 className="title">
        {categories.find((cat) => cat.value === category)?.label}
      </h2>
      <MediaList mediaList={media} type={"movie"} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Movies;
