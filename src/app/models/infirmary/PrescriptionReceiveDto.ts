import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";

export interface PrescriptionReceiveDto{
  type: PrescriptionType;
  doctorLbz: string;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  creationDateTime: Date; // ovo je Timestamp
  status: PrescriptionStatus;

  referralDiagnosis: string;
  referralReason: string;
}
