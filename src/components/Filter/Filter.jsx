// components/Filter/Filter.js
import "./Filter.css";

const Filter = ({
  categories,
  genres,
  category,
  genre,
  onCategoryChange,
  onGenreChange,
}) => {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="category">Categoria:</label>
        <select id="category" value={category} onChange={onCategoryChange}>
          {categories &&
            categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="genre">Gênero:</label>
        <select id="genre" value={genre} onChange={onGenreChange}>
          <option value="">Todos os Gêneros</option>
          {genres &&
            genres.map((gen) => (
              <option key={gen.value} value={gen.value}>
                {gen.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
