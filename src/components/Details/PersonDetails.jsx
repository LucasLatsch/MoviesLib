import { TbChartBarPopular } from "react-icons/tb";
import { FaBirthdayCake } from "react-icons/fa";
import { GiDeathSkull } from "react-icons/gi";
import { AiFillProfile } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

import useFetchPersonDetails from "../../hooks/useFetchPersonDetails";

import Spinner from "../Spinner/Spinner";
import TitleSection from "../TitleSection/TitleSection";
import Carousel from "../Carousel/Carousel";
import Card from "../Card/Card";
import { SwiperSlide } from "swiper/react";

const defaultImage = "/assets/backImage.svg";
const imageSrc = import.meta.env.VITE_IMG;

const PersonDetails = ({ id }) => {
  const { person, loading, galery, combinedCredits } = useFetchPersonDetails(
    id,
    "pt-BR"
  );
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="person-container">
      <div className="person-info">
        <h1 className="title">{person.name}</h1>
        <div className="person-header">
          <span>
            <FaBirthdayCake />

            {person.birthday}
          </span>
          {person.deathday && (
            <>
              <GiDeathSkull />
              <span>{person.deathdayday}</span>
            </>
          )}
          <span>
            <TbChartBarPopular />
            {person.popularity}
          </span>
          <span>
            <AiFillProfile />

            {person.known_for_department}
          </span>
          <span>
            <FaLocationDot />

            {person.place_of_birth}
          </span>
        </div>
        <p>{person.biography}</p>
      </div>
      <div className="galery">
        <TitleSection title={"Galeria de Fotos"} />
        <Carousel slidesPerView={5} id={"trending-movies"}>
          {galery?.length === 0 && <p>Carregando...</p>}
          {galery?.map((media) => (
            <SwiperSlide key={media.id}>
              <img
                className="teste"
                src={imageSrc + media.file_path}
                alt={person.name}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
      <div className="participation-container">
        <TitleSection title={"Participações"} />
        <Carousel slidesPerView={5} id={"trending-movies"}>
          {combinedCredits?.length === 0 && <p>Carregando...</p>}
          {combinedCredits?.map((media) => (
            <SwiperSlide key={media.id}>
              <Card media={media} type={media.media_type} swiper={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PersonDetails;
