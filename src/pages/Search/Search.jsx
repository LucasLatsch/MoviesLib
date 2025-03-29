import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MediaList from "../../components/MediaList/MediaList";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "../MediaGrid.css";
import Pagination from "../../components/Pagination/Pagination";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const query = searchParams.get("q");

  // padronizar as funções criando custom hooks
  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSearchedMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}&page=${page}&language=pt-BR`;
    getSearchedMovies(searchWithQueryUrl);
    window.scrollTo(0, 0);
  }, [query, page]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <MediaList mediaList={searchedMovies} type={"movie"} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default Search;
