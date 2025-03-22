import axios from "axios";

const fetch = params => axios.get("", { params });

const moviesApi = { fetch };

export default moviesApi;
