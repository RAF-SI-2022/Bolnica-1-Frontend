import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";

export interface PrescriptionDoneDto{
  id: number;
  type: string;
  departmentFromId: number;
  departmentToId:number;
  lbp:string;
  doctorLbz:string;
  date: Date;
  prescriptionStatus: PrescriptionStatus;
}
