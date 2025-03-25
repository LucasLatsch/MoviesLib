import { React, useState, useEffect } from "react";

import "../MediaGrid.css";
import Filter from "../../components/Filter/Filter";
import MediaGrid from "../../components/MediaList/MediaList";
import Pagination from "../../components/Pagination/Pagination";

const serieURL = import.meta.env.VITE_API_TV;
const serieDiscoverURL = import.meta.env.VITE_API_DISCOVER_TV;
const apiKey = import.meta.env.VITE_API_KEY;
const categories = JSON.parse(import.meta.env.VITE_TV_CATEGORIES);
const genres = JSON.parse(import.meta.env.VITE_GENRES_TV);

const Serie = () => {
  const [topSeries, setTopSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("top_rated");
  const [totalPages, setTotalPages] = useState();
  const [genre, setGenre] = useState("");

  const getSeries = async (url) => {
    console.log(url);

    const res = await fetch(url);
    const data = await res.json();
    setTopSeries(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    const categoryUrl = `${serieURL}${category}?${apiKey}&page=${page}&language=pt-BR`;
    const genreUrl = `${serieDiscoverURL}?${apiKey}&page=${page}&language=pt-BR&with_genres=${genre}`;
    const finalUrl = genre ? genreUrl : categoryUrl;
    window.scrollTo(0, 0);
    getSeries(finalUrl);
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
        {" "}
        {categories.find((cat) => cat.value === category)?.label}
      </h2>
      <MediaGrid mediaList={topSeries} type={"tv"} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Serie;
