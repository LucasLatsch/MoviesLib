import { React, useState, useEffect } from "react";
import MediaList from "../../components/MediaList/MediaList";
import Pagination from "../../components/Pagination/Pagination";

const peopleUrl = import.meta.env.VITE_API_PEOPLE;
const apiKey = import.meta.env.VITE_API_KEY;

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const getPeople = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setPeople(data.results);
    setTotalPages(data.total_pages - 2);
  };

  useEffect(() => {
    const finalPeopleUrl = `${peopleUrl}?${apiKey}&page=${page}&language=pt-BR`;
    window.scrollTo(0, 0);
    getPeople(finalPeopleUrl);
  }, [page]);

  return (
    <div>
      <MediaList mediaList={people} type={"person"} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default People;
