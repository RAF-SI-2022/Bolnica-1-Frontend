import {PatientArrival} from "../laboratory-enums/PatientArrival";
import {ExaminationStatus} from "../laboratory-enums/ExaminationStatus";
import {PatientExaminationStatus} from "../patient-enums/PatientExaminationStatus";

export interface ExamForPatient{
  id: number;
  lbp: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  gender: string;
  patientArrival: PatientArrival;
  examDate: Date;

}
