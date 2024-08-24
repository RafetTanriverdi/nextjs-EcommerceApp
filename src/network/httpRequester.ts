import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://1fir202pd4.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
