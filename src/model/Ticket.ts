import moment from "moment";

export interface ITicket {
  monto: number;
  moneda: string;
  proveedor: string;
  comentario: string;
  fechaCreo: moment.Moment;
}
