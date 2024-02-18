import { message } from "antd";
import { ITicket } from "../model/Ticket";
import axiosInstance from "./axios";

export const createTicket = async (ticket: ITicket): Promise<ITicket> => {
  try {
    const response = await axiosInstance.post("/api/Tickets", ticket);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      message.error("No tiene permisos para realizar esta tarea.");
    } else {
      message.error("Error al crear el ticket.");
    }
    return error;
  }
};

export const updateTicket = async (ticket: ITicket): Promise<ITicket> => {
  try {
    const response = await axiosInstance.put("/api/Tickets", ticket);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      message.error("No tiene permisos para realizar esta tarea.");
    } else {
      message.error("Error al crear el ticket.");
    }
    return error;
  }
};

export const deleteTicket = async (id: number): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/api/Tickets/${id}`);
    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      message.error("No tiene permisos para realizar esta tarea.");
    }else {
      message.error("Error al eliminar el registro.");
    }
    return false;
  }
};

export const getTicketById = async (id: number): Promise<ITicket> => {
  try {
    const response = await axiosInstance.get(`/api/Tickets/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      message.error("No tiene permisos para realizar esta tarea.");
    } else {
      message.error("Error al encontrar el registro.");
    }
    return error;
  }
};

export const getAllTickets = async (): Promise<ITicket[]> => {
  try {
    const response = await axiosInstance.get("/api/Tickets");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      message.error("No tiene permisos para realizar esta tarea.");
    } else {
      message.error("Error al filtrar los recibos.");
    }
    return error;
  }
};
