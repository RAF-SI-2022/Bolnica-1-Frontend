import {PatientArrival} from "./laboratory-enums/PatientArrival";

export interface ExamPatientDoctorDto{
  lbp: string;
  examDate: Date;
  doctor: string;
  departmentName: string;
}
