import axios from "axios";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.patch["x-auth-token"] = localStorage.getItem(
  "auth-token"
);
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error", error);
    alert("An unexpected error occurred");
  }
  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
