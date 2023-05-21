import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysis} from "./PrescriptionAnalysis";

export interface PrescriptionCreate{
  type: PrescriptionType;
  doctorId: number;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  creationDateTime: Date; //ovde je timestamp
  status: PrescriptionStatus;
  comment: string;
  referralDiagnosis: string;
  referralReason: string;
  prescriptionAnalysisDtos: PrescriptionAnalysis[];

}

export interface PrescriptionCreateDto{
  type: PrescriptionType;
  doctorId: number;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  creationDateTime: Date; //ovde je timestamp
  status: PrescriptionStatus;
  comment: string;
  referralDiagnosis: string;
  referralReason: string;
  prescriptionAnalysisDtos: PrescriptionAnalysis[];

}

