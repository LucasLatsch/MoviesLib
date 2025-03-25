import { useState, useEffect } from "react";

import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel"; // Importando o componente de carrossel
import TimeRangeToggle from "../../components/TimeRangeToggle/TimeRangeToggle";
import { SwiperSlide } from "swiper/react";

import "../MediaGrid.css";

const moviesURL = import.meta.env.VITE_API_TRENDING_MOVIE;
const seriesURL = import.meta.env.VITE_API_TRENDING_TV;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [timeWindowSeries, setTimeWindowSeries] = useState("day");
  const [timeWindowMovies, setTimeWindowMovies] = useState("day");

  const getTrendingMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTrendingMovies(data.results);
    console.log("Filmes: ", data.results);
  };

  const getTrendingSeries = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTrendingSeries(data.results);
    console.log("TV: ", data.results);
  };

  useEffect(() => {
    const finalMoviesUrl = `${moviesURL}${timeWindowMovies}?${apiKey}&language=pt-BR`;
    const finalSeriesUrl = `${seriesURL}${timeWindowSeries}?${apiKey}&language=pt-BR`;
    getTrendingMovies(finalMoviesUrl);
    getTrendingSeries(finalSeriesUrl);
  }, [timeWindowSeries, timeWindowMovies]);

  return (
    <div>
      <div>
        <TimeRangeToggle
          timeWindow={timeWindowMovies}
          setTimeWindow={setTimeWindowMovies}
          title={"movie"}
        />

        <Carousel slidesPerView={5} id={"trending-movies"}>
          {trendingMovies.length === 0 && <p>Carregando...</p>}
          {trendingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Card media={movie} type={"movie"} swiper={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
      <div>
        <TimeRangeToggle
          timeWindow={timeWindowSeries}
          setTimeWindow={setTimeWindowSeries}
          title={"TV"}
        />
        <Carousel slidesPerView={5} id={"trending-series"}>
          {trendingSeries.length === 0 && <p>Carregando...</p>}
          {trendingSeries.map((serie) => (
            <SwiperSlide key={serie.id}>
              <Card
                media={serie}
                type={"tv"}
                swiper={true}
                onClick={() => handleCardClick(serie)}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
