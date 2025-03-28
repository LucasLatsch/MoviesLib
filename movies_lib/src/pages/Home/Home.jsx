import { useState, useEffect } from "react";

import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
import TitleSection from "../../components/TitleSection/TitleSection";
import { SwiperSlide } from "swiper/react";

import "../MediaGrid.css";
import Spinner from "../../components/Spinner/Spinner";
import useFetchMediaTrending from "../../hooks/useFetchMediaTrending";

const Home = () => {
  const [timeWindowMovies, setTimeWindowMovies] = useState("day");
  const [timeWindowSeries, setTimeWindowSeries] = useState("day");
  const language = "pt-BR"; // O idioma pode ser dinâmico conforme necessário

  const { media: trendingMovies, loading: loadingMovies } =
    useFetchMediaTrending("movie", timeWindowMovies, language);
  const { media: trendingSeries, loading: loadingSeries } =
    useFetchMediaTrending("tv", timeWindowSeries, language);

  if (loadingMovies && timeWindowSeries) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="media-carousel">
        <TitleSection
          timeWindow={timeWindowMovies}
          setTimeWindow={setTimeWindowMovies}
          title={"Filmes em alta"}
          toggle={true}
        />
        <Carousel slidesPerView={5} id={"trending-movies"}>
          {/* {loadingMovies && <Spinner heightContainer={200} />} */}
          {trendingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Card media={movie} type={"movie"} swiper={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
      <div className="media-carousel">
        <TitleSection
          timeWindow={timeWindowSeries}
          setTimeWindow={setTimeWindowSeries}
          toggle={true}
          title={"Em alta na TV"}
        />
        <Carousel slidesPerView={5} id={"trending-series"}>
          {/* {loadingSeries && <Spinner heightContainer={200} />} */}
          {trendingSeries.map((serie) => (
            <SwiperSlide key={serie.id}>
              <Card media={serie} type={"tv"} swiper={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
