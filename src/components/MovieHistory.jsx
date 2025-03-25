import React, { useRef, useEffect, useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Alert, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";

const ViewHistory = () => {
  const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
  const { t } = useTranslation();
  const movies = useViewHistoryStore(state => state.movies);
  const selectedMovie = useViewHistoryStore(state => state.selectedMovie);

  const removeMovie = useViewHistoryStore(state => state.removeMovie);
  const clearHistory = useViewHistoryStore(state => state.clearHistory);

  const historyContainerRef = useRef(null);
  const movieItemRefs = useRef({});

  useEffect(() => {
    if (selectedMovie) {
      movieItemRefs.current[selectedMovie.Title]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedMovie]);

  const handleClearHistory = () => {
    setIsClearAlertOpen(true);
  };

  const confirmClearHistory = () => {
    clearHistory();
    setIsClearAlertOpen(false);
  };

  return (
    <div className="h-screen max-h-screen w-full overflow-y-scroll rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-center text-lg font-bold">
          {t("viewHistory.title")}
        </h2>
        <Button
          className="font-semibold text-red-600 "
          disabled={movies.length === 0}
          label="Clear all"
          style="tertiary"
          onClick={handleClearHistory}
        />
      </div>
      <div
        className="max-h-[70vh] space-y-2 overflow-y-auto"
        ref={historyContainerRef}
      >
        {movies.map((movie, index) => (
          <div
            key={`${movie.Title}-${index}`}
            ref={el => (movieItemRefs.current[movie.Title] = el)}
            className={classNames(
              "flex items-center justify-between rounded-lg px-4 py-3 transition-colors",
              movie === selectedMovie
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-black"
            )}
          >
            <span>{movie.Title}</span>
            <Delete
              className="cursor-pointer"
              onClick={() => removeMovie(movie.imdbID)}
            />
          </div>
        ))}
      </div>
      <Alert
        cancelButtonLabel="Cancel"
        closeOnOutsideClick={false}
        isOpen={isClearAlertOpen}
        message="Are you sure you want to clear all history?"
        submitButtonLabel="Clear"
        title="Clear view history"
        onClose={() => setIsClearAlertOpen(false)}
        onSubmit={confirmClearHistory}
      />
    </div>
  );
};

export default ViewHistory;
