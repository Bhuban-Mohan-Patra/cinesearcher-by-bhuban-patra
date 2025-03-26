import { Typography } from "neetoui";
import { NavLink } from "react-router-dom";

const Header = () => (
  <nav className="fixed top-0 flex w-full items-center justify-between bg-white px-6 py-4 shadow-md">
    <div className="flex items-center space-x-8">
      <Typography className="text-2xl font-medium">
        <span className="text-blue-600">Cine</span>
        <span className="ml-1 text-gray-800">Searcher</span>
      </Typography>
      <div className="flex space-x-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-600" : "text-gray-800"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-600" : "text-gray-800"
          }
        >
          Favourites
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Header;
