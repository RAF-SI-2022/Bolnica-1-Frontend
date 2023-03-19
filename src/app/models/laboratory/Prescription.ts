import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";

export interface Prescription {
  type: PrescriptionType;
  doctorId: number;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  creationDateTime: Date; //ovde je timestamp
  status: PrescriptionStatus;
  requestedTests: string;
  comment: string;
  referralDiagnosis: string;
  referralReason: string;

}
