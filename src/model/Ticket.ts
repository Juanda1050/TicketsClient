import dayjs from 'dayjs';

export interface ITicket {
  id: number;
  monto: number;
  moneda: string;
  proveedor: string;
  comentario: string;
  fecha: dayjs.Dayjs;
}
