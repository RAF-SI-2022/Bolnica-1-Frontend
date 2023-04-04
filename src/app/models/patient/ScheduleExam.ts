import {PatientArrival} from "../laboratory-enums/PatientArrival";
import {ExaminationStatus} from "../laboratory-enums/ExaminationStatus";
import {PatientExaminationStatus} from "../patient-enums/PatientExaminationStatus";

export interface ScheduleExam{

  // id: number;
  // dateAndTime: Date; //ovde je timestamp
  // patientArrival: PatientArrival;
  // examinationStatus: PatientExaminationStatus;
  // doctorId: number;
  // lbz: string;
  // lbp: string;

  id: number;
  dateAndTime: Date;
  patientArrival: PatientArrival;
  lbz: string;
  lbp: string;

}
