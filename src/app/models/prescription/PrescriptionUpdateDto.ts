import {PrescriptionType} from "../laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../laboratory-enums/PrescriptionStatus";

export class PrescriptionUpdateDto{
  id: number =0;
  departmentFromId: number = 0;
  departmentToId: number = 0;

  creationDateTime: Date = new Date(); // ovde je timestamp

}
