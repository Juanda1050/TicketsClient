import { IResponses } from "../model/Reponses";
import { IRegister } from "../model/User";
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
