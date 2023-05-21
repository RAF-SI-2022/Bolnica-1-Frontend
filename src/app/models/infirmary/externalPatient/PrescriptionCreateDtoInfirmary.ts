import {PrescriptionType} from "../../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../../laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysis} from "../../laboratory/PrescriptionAnalysis";

export interface PrescriptionCreateDtoInfirmary{
  type: PrescriptionType;
  doctorLbz: string;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  creationDateTime: Date; //ovde je timestamp
  status: PrescriptionStatus;
  comment: string;
  prescriptionAnalysisDtos: PrescriptionAnalysis[];

}
