import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysisData} from "./PrescriptionAnalysisData";

// ovaj je sa rute raf.bolnica1.laboratory.dto.prescription.PrescriptionDto;
export interface Prescription{
  id: number;
  type:PrescriptionType;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  doctorId: number;
  comment: string;
  referralDiagnosis: string;
  referralReason: string;
  creationDateTime: Date; // ovde je timestamp
  status: PrescriptionStatus;
  prescriptionAnalysisDataDtoList: PrescriptionAnalysisData[];

}


/*
// ovaj je sa rute raf.bolnica1.laboratory.dto.lab.prescription.PrescriptionDto;
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
*/

