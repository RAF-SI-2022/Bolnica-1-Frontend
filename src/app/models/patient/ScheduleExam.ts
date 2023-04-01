import {PatientArrival} from "../laboratory-enums/PatientArrival";
import {ExaminationStatus} from "../laboratory-enums/ExaminationStatus";

export interface ScheduleExam{

  id: number;
  dateAndTime: Date; //ovde je timestamp
  patientArrival: PatientArrival;
  examinationStatus: ExaminationStatus;
  doctorId: number;
  lbz: number;
  lbp: string;
}
