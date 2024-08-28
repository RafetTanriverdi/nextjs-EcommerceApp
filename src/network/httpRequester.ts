import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://1fir202pd4.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      if (config.headers) {
        // Use the set method to add Authorization header
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    } else {
      console.error("Access token is undefined");
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
