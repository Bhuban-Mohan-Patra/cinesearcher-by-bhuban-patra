import {
  keysToCamelCase,
  serializeKeysToSnakeCase,
} from "@bigbinary/neeto-cist";
import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { evolve } from "ramda";

const showSuccessToastr = response => {
  if (response.data?.Response === "False") {
    Toastr.error(t(`error.${response.data.Error}`));
  }
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(t("error.generalError"));
  }
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL = "https://www.omdbapi.com/";
  axios.defaults.params = {
    apikey: process.env.REACT_APP_OMDB_API_KEY,
  };
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
