import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";
import { setDefaultImage } from "utils/setDefaultImage";

import MovieDetails from "./MovieDetails";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMovies, setSelectedMovie } = useViewHistoryStore();
  const { t } = useTranslation();

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Type: type,
    imdbID: movieID,
  } = movie;

  const imageUrl = setDefaultImage(poster);

  return (
    <div className="m-5 overflow-hidden rounded-lg border border-gray-200  bg-white shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="aspect-[2/3] w-full px-8">
        <img
          alt={title}
          className="h-full w-full object-cover"
          src={imageUrl}
        />
      </div>
      <div className="px-8 py-6 text-center">
        <Typography
          className="mb-2 text-3xl font-bold text-gray-800"
          variant="body1"
        >
          {title}
        </Typography>
        <Typography
          className="text-sm font-semibold text-gray-400"
          variant="body2"
        >
          {type === "movie" ? t("movie.type.movie") : t("movie.type.series")} •{" "}
          {year}
        </Typography>
        <Button
          className="mt-4 bg-gray-100 font-bold text-blue-600"
          onClick={() => {
            setIsModalOpen(true);
            setMovies(movie);
            setSelectedMovie(movie);
          }}
        >
          {t("movie.viewMore")}
        </Button>
      </div>
      {isModalOpen && (
        <MovieDetails
          id={movieID}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieCard;
