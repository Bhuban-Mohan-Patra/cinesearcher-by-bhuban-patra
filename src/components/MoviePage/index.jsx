import React, { useState, useRef, useEffect } from "react";

import EmptyPage from "components/commons/EmptyPage";
import PageLoader from "components/commons/PageLoader";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";
import MovieList from "./MovieList";

const MoviePage = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, searchTerm = "" } = queryParams;
  const [searchText, setSearchText] = useState(searchTerm);

  const handleUpdateQueryParams = useFuncDebounce(value => {
    const params = filterNonNull({
      searchTerm: value || null,
      page: value ? DEFAULT_PAGE_NUMBER : null,
    });

    history.replace(buildUrl(routes.root, params));
  });

  const moviesParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_NUMBER,
  };

  const { data: { Search: movies = [], totalResults } = {}, isLoading } =
    useFetchMovies(moviesParams);

  const handlePageNavigation = page =>
    history.push(buildUrl(routes.root, mergeLeft({ page }, queryParams)));

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

  return (
    <div className="h-screen w-full p-6">
      <div className="mx-auto mb-8 max-w-2xl">
        <Input
          className="rounded-lg border border-[#ddd]"
          placeholder={t("search.placeholder")}
          prefix={<Search />}
          ref={inputRef}
          type="search"
          value={searchText}
          onChange={e => {
            const {
              target: { value },
            } = e;
            setSearchText(`${value}`);
            handleUpdateQueryParams(`${value}`);
          }}
        />
      </div>
      {isLoading && <PageLoader />}
      {!isLoading && !searchTerm.trim() && <EmptyPage />}
      {!isLoading && searchTerm.trim() && (
        <div className="relative h-5/6">
          <MovieList movies={movies} />
          <div className="absolute right-4 mt-6">
            <Pagination
              count={totalResults}
              navigate={handlePageNavigation}
              pageNo={Number(page) || DEFAULT_PAGE_NUMBER}
              pageSize={DEFAULT_PAGE_SIZE}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
