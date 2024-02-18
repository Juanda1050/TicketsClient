import { IResponseToken, IResponses } from "../model/Reponses";
import { ILogin, IRegister } from "../model/User";
import axiosInstance from "./axios";

export const registerUser = async (
  userData: IRegister
): Promise<IResponses> => {
  try {
    const response = await axiosInstance.post("/api/Users/register", userData);
    return {
      message: response.data.message,
      isError: false,
    };
  } catch (error: any) {
    return {
      message: error.response?.data?.message || "Error de servidor",
      isError: true,
    };
  }
};

export const loginUser = async (loginData: ILogin): Promise<IResponseToken> => {
  try {
    const response = await axiosInstance.post("/api/Users/login", loginData); // Cambia la URL del endpoint según corresponda
    return {
      token: response.data.token,
      usuarioId: response.data.usuarioId,
    };
  } catch (error: any) {
    return {
      token: "",
      usuarioId: "",
    };
  }
};
