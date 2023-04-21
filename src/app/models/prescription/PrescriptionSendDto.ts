import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysisData} from "../laboratory/PrescriptionAnalysisData";

export class PrescriptionSendDto{
  type:PrescriptionType = PrescriptionType.STACIONAR;
  doctorLbz: string = '';
  departmentFromId: number = 0;
  departmentToId: number = 0;
  lbp: string = '';
  creationDateTime: Date = new Date(); // ovde je timestamp
  status: PrescriptionStatus = PrescriptionStatus.NEREALIZOVAN;
}
