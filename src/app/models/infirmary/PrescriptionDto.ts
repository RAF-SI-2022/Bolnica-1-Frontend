import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";

export interface PrescriptionDto{
  id: number;
  doctorLbz: string;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  creationDateTime: Date; //ovo je Timestamp
  type: PrescriptionType;
  status: PrescriptionStatus;
  referralDiagnosis: string;
  referralReason: string;

}
