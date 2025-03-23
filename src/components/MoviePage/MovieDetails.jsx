import { useShowMovies } from "hooks/reactQuery/useMoviesApi";
import { Modal, Spinner, Tag, Typography } from "neetoui";
import { isEmpty } from "ramda";

const MovieDetails = ({ id, isOpen, onClose }) => {
  const { Header, Body } = Modal;

  const { isLoading, data: movie = {} } = useShowMovies(id);

  const {
    Title: title,
    Year: year,
    Genre: genre,
    Poster: poster,
    Plot: plot,
    Actors: actors,
    Director: director,
    BoxOffice: boxOffice,
    Runtime: runTime,
    Language: language,
    Rated: rated,
  } = movie;

  const genres = genre ? genre.split(", ") : [];

  const movieDetails = [
    { label: "Director", value: director },
    { label: "Actors", value: actors },
    { label: "Box Office", value: boxOffice },
    { label: "Year", value: year },
    { label: "Runtime", value: runTime },
    { label: "Language", value: language },
    { label: "Rated", value: rated },
  ];

  return (
    <Modal isOpen={isOpen} size="large" onClose={onClose}>
      <Header>
        <Typography>{title}</Typography>
        {!isEmpty(genres) &&
          genres.map(genre => (
            <Tag className="my-3 mr-2" key={genre} type="solid">
              {genre}
            </Tag>
          ))}
      </Header>
      <Body>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex h-full">
            <div className="w-1/3 p-1">
              <img
                alt={title}
                className="neeto-ui-rounded-lg object-contain"
                src={poster}
              />
            </div>
            <div className="ml-10 w-2/3 space-y-4 p-4">
              <Typography component="i" style="body2" weight="light">
                {plot}
              </Typography>
              <div className="space-y-2">
                {movieDetails.map(({ label, value }) => (
                  <div className="flex items-center gap-2" key={label}>
                    <Typography style="body2" weight="bold">
                      {label}
                    </Typography>
                    <Typography style="body2">{value}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Body>
    </Modal>
  );
};
export default MovieDetails;
