import { message } from "antd";
import { ITicket } from "../model/Ticket";
import axiosInstance from "./axios";
import { useMutation, useQueryClient } from "react-query";

export const createTicket = async (ticket: ITicket): Promise<ITicket> => {
  try {
    const response = await axiosInstance.post("/api/Tickets", ticket);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      message.error("No tiene permisos para realizar esta tarea.");
    } else {
      message.error("Error al crear el registro.");
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
      message.error("Error al actualizar el registro.");
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
    } else {
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

// const queryClient = useQueryClient();

export const useAddTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ITicket, unknown, ITicket>(
    "addTicket",
    async (ticket: ITicket) => {
      const response = await createTicket(ticket);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all");
      },
      onError: () => {
        message.error("Error al crear el registro.");
      },
    }
  );
};

export const useUpdateTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ITicket, unknown, ITicket>(
    "updateTicket",
    async (ticket: ITicket) => {
      const response = await updateTicket(ticket);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all");
      },
      onError: () => {
        message.error("Error al actualizar el registro.");
      },
    }
  );
};

export const useDeleteTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      await deleteTicket(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all");
        message.success("Registro eliminado exitosamente");
      },
      onError: () => {
        message.error("Error al encontrar el registro.");
      },
    }
  );
};
