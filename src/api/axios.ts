import axios, { AxiosInstance } from "axios";

const baseURL: string | undefined = "https://localhost:7249/";

if (!baseURL) {
  throw new Error("La variable de entorno REACT_APP_DEV_URL no está definida");
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
