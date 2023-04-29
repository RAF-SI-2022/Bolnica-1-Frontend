import {Prescription} from "./Prescription";
import {OrderStatus} from "../laboratory-enums/OrderStatus";
import {Patient} from "../patient/Patient";
import {PatientGeneralDto} from "../patient/PatientGeneralDto";

export interface LabWorkOrderNew {
  id: number;
  prescription: Prescription;
  lbp: string;
  creationDateTime: Date;
  status: OrderStatus;
  technicianLbz: string;
  biochemistLbz: string;

  // dodato za biochemist
  patient: PatientGeneralDto;
}
