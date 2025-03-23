import React, { useState, useRef, useEffect } from "react";

import EmptyPage from "components/commons/EmptyPage";
import PageLoader from "components/commons/PageLoader";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, Kbd } from "neetoui";
import { isEmpty } from "ramda";

import MovieList from "./MovieList";

const MoviePage = () => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  const debouncedSearchKey = useDebounce(searchText);

  const searchParams = { s: debouncedSearchKey };
  const { data: { Search: movies = [] } = {}, isLoading } =
    useFetchMovies(searchParams);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-6">
      <div className="mx-auto mb-8 max-w-2xl">
        <Input
          className="rounded-lg border border-[#ddd]"
          placeholder="Search movie or series..."
          prefix={<Search />}
          ref={inputRef}
          suffix={<Kbd keyName="/" />}
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
