import React, { useRef, useEffect } from "react";

import classNames from "classnames";
import useViewHistoryStore from "stores/useViewHistoryStore";

const ViewHistory = () => {
  const movies = useViewHistoryStore(state => state.movies);
  const selectedMovie = useViewHistoryStore(state => state.selectedMovie);
  const historyContainerRef = useRef(null);
  const movieItemRefs = useRef({});

  useEffect(() => {
    if (selectedMovie) {
      movieItemRefs.current[selectedMovie.Title]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedMovie]);

  return (
    <div className="h-screen w-full overflow-scroll rounded-lg bg-white p-4 shadow-lg">
      <h2 className="mb-4 text-center text-lg font-bold">View history</h2>
      <div
        className="max-h-[70vh] space-y-2 overflow-y-auto"
        ref={historyContainerRef}
      >
        {movies.map((movie, index) => (
          <div
            key={`${movie.Title}-${index}`}
            ref={el => (movieItemRefs.current[movie.Title] = el)}
            className={classNames(
              "rounded-lg p-3 text-center transition-colors",
              movie === selectedMovie
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-black"
            )}
          >
            {movie.Title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHistory;
