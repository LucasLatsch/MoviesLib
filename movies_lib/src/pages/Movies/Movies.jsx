import { useState, useEffect } from "react";
import Filter from "../../components/Filter/Filter";
import MediaList from "../../components/MediaList/MediaList";
import Pagination from "../../components/Pagination/Pagination";

const movieURL = import.meta.env.VITE_API_MOVIE;
const movieDiscoverURL = import.meta.env.VITE_API_DISCOVER_MOVIE;
const apiKey = import.meta.env.VITE_API_KEY;
const categories = JSON.parse(import.meta.env.VITE_MOVIE_CATEGORIES);
const genres = JSON.parse(import.meta.env.VITE_GENRES_MOVIE);

const Movies = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("top_rated");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("pt-BR");
  const [totalPages, setTotalPages] = useState();

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
    setTotalPages(data.total_pages - 2);
    console.log(url);
  };

  useEffect(() => {
    const categoryUrl = `${movieURL}${category}?${apiKey}&page=${page}&language=${language}`;
    const genreUrl = `${movieDiscoverURL}?${apiKey}&page=${page}&language=pt-BR&with_genres=${genre}`;
    const finalUrl = genre ? genreUrl : categoryUrl;
    window.scrollTo(0, 0);
    getMovie(finalUrl);
  }, [page, category, genre]);

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
      <MediaList mediaList={topMovies} type={"movie"} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Movies;
