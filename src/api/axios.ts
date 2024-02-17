import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL: string | undefined = process.env.REACT_APP_DEV_URL;

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
