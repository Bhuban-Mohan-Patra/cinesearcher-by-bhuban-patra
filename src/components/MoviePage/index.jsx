import React, { useState } from "react";

import EmptyPage from "components/commons/EmptyPage";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { isEmpty } from "ramda";

import MovieList from "./MovieList";

const MoviePage = () => {
  const [searchText, setSearchText] = useState("");

  const searchParams = { s: searchText };

  const { data: { Search: movies = [] } = {} } = useFetchMovies(searchParams);
  console.log(movies);

  return (
    <div className="p-6">
      <div className="mx-auto mb-8 max-w-2xl">
        <Input
          className="rounded-lg border border-[#ddd]"
          placeholder="Search movie or series..."
          prefix={<Search />}
          type="search"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      <div>
        {isEmpty(searchText) ? <EmptyPage /> : <MovieList movies={movies} />}
      </div>
    </div>
  );
};

export default MoviePage;
