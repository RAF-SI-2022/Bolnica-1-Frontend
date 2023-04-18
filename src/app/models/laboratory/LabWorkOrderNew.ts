import {Prescription} from "./Prescription";
import {OrderStatus} from "../laboratory-enums/OrderStatus";

export interface LabWorkOrderNew {
  id: number;
  prescription: Prescription;
  lbp: string;
  creationDateTime: Date;
  status: OrderStatus;
  technicianLbz: string;
  biochemistLbz: string;
}
