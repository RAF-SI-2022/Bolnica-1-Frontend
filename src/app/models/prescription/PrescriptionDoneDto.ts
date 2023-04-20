import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";

export interface PrescriptionDoneDto{
  id: number;
  type: string;
  departmentFromId: number;
  departmentToId:number;
  lbp:string;
  doctorLbz:string;
  comment:string
  creationDateTime: Date;
  status: PrescriptionStatus;
}
