import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import useFavouriteMoviesStore from "stores/useFavouriteMoviesStore";

import Header from "./commons/Header";

const Favourites = () => {
  const favouriteMovies = useFavouriteMoviesStore(
    state => state.favouriteMovies
  );

  return (
    <div className="mt-20 p-6">
      <Header />
      <div className="mt-10 flex flex-col items-center">
        <div className="max-h-96 w-2/3 space-y-4 overflow-y-auto rounded-lg  border-gray-300 p-4">
          {!isEmpty(favouriteMovies) ? (
            favouriteMovies?.map(({ imdbID, Title, imdbRating }) => (
              <div
                className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-md"
                key={imdbID}
              >
                <Typography className="font-bold text-gray-700">
                  {Title}
                </Typography>
                <div className="flex  items-end gap-2">
                  <span className="text-sm text-gray-500">Rating : </span>
                  <span className="font-semibold text-gray-600">
                    {imdbRating}/10
                  </span>
                </div>
              </div>
            ))
          ) : (
            <Typography className="mt-10 text-center text-gray-500">
              No favourites added yet.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
