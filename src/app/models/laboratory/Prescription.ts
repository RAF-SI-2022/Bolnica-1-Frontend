import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysisData} from "./PrescriptionAnalysisData";

// ovaj je sa rute raf.bolnica1.laboratory.dto.prescription.PrescriptionDto;
export class Prescription{
  id: number = 0;
  type:PrescriptionType = PrescriptionType.STACIONAR;
  departmentFromId: number = 0;
  departmentToId: number = 0;
  lbp: string = '';
  doctorId: number = 0;
  comment: string = '';
  referralDiagnosis: string = '';
  referralReason: string = '';
  creationDateTime: Date = new Date; // ovde je timestamp
  status: PrescriptionStatus = PrescriptionStatus.NEREALIZOVAN;
  prescriptionAnalysisDataDtoList: PrescriptionAnalysisData[] = [];

}

export interface ChartData {
    name: string;
    value: number;
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

