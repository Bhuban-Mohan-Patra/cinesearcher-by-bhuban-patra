import axios from "axios";

const fetch = ({ searchTerm, page }) =>
  axios.get("/", { params: { s: searchTerm, page } });

const show = imdbID => axios.get("/", { params: { i: imdbID } });

const moviesApi = { fetch, show };

export default moviesApi;
