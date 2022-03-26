import axios from "axios";
const BASE_URL = "http://127.0.0.1:3050/api/v1/users";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
