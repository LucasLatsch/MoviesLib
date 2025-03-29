import { Routes, Route } from "react-router-dom";
import App from "../App.jsx";
// Pages
import Home from "../pages/Home/Home.jsx";
import Movies from "../pages/Movies/Movies.jsx";
import Search from "../pages/Search/Search.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Serie from "../pages/Series/Serie.jsx";
import People from "../pages/People/People.jsx";
import Details from "../pages/Details/Details.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="series" element={<Serie />} />
        <Route path="movies" element={<Movies />} />
        <Route path="people" element={<People />} />
        <Route path="details/:type/:id" element={<Details />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
