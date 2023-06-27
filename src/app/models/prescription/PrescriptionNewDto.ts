import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysisDataDto} from "./PrescriptionAnalysisDataDto";

export interface PrescriptionNewDto{
  id: number;
  type: string;
  departmentFromId: number;
  departmentToId: number;
  lbp: string;
  doctorLbz:string;
  comment: string;
  creationDate: Date;
  status: PrescriptionStatus;
  prescriptionAnalysisDataDtoList: PrescriptionAnalysisDataDto[];

}
