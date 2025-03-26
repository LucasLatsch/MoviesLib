import { React, useState, useEffect } from "react";
import MediaList from "../../components/MediaList/MediaList";
import Pagination from "../../components/Pagination/Pagination";
import useFetchMediaList from "../../hooks/useFetchMediaList ";

const People = () => {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("pt-BR");

  const { media, totalPages, loading } = useFetchMediaList(
    "person",
    null,
    null,
    page,
    language
  );

  return (
    <div>
      <MediaList mediaList={media} type={"person"} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default People;
