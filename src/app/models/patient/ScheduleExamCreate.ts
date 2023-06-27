import {PatientArrival} from "../laboratory-enums/PatientArrival";
import {ExaminationStatus} from "../laboratory-enums/ExaminationStatus";

export interface ScheduleExamCreate{
  dateAndTime: Date; // ovde je timestamp
  doctorLbz: string;
  lbp: string;
  note: string;
}
