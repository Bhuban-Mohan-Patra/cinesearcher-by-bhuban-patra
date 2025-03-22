import React, { useState } from "react";

import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import { Search } from "neetoicons";
import { Input } from "neetoui";

const MoviePage = () => {
  const [searchText, setSearchText] = useState("");

  const searchParams = { s: searchText };

  const { data: { Search: movies = [] } = {} } = useFetchMovies(searchParams);
  console.log(movies);

  return (
    <div className="bg-red-100 p-6">
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
      <div>{JSON.stringify(movies)}</div>
    </div>
  );
};

export default MoviePage;
