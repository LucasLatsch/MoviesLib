import "./Pagination.css";
import {
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination">
      <button onClick={() => setPage(1)} disabled={page === 1} className="btn">
        <MdKeyboardDoubleArrowLeft />
      </button>

      <button
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={page === 1}
        className="btn"
      >
        <MdKeyboardArrowLeft />
      </button>

      <span className="page-number">Página {page}</span>

      <button
        onClick={() =>
          setPage((prevPage) => Math.min(prevPage + 1, totalPages))
        }
        disabled={page === totalPages}
        className="btn"
      >
        <MdKeyboardArrowRight />
      </button>

      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className="btn"
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
