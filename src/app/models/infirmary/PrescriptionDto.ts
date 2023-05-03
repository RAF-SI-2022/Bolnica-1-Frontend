import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysisData} from "../laboratory/PrescriptionAnalysisData";

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

export class PrescriptionDto{
  id: number = 0;
  doctorLbz: string = '';
  departmentFromId: number = 0;
  departmentToId: number = 0;
  lbp: string = '';
  creationDateTime: Date =  new Date; //ovo je Timestamp
  type: PrescriptionType = PrescriptionType.STACIONAR;
  status: PrescriptionStatus = PrescriptionStatus.NEREALIZOVAN;
  referralDiagnosis: string = '';
  referralReason: string= '';

}
