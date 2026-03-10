import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://token-management-system-backend.onrender.com",
});

export default axiosInstance;
