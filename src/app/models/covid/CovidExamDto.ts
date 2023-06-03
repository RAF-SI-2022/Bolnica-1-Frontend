import {PatientArrival} from "../laboratory-enums/PatientArrival";
import {CovidExaminationType} from "../covid-enums/CovidExaminationType";

export interface CovidExamDto {
  id: number;
  dateAndTime: Date;
  patientArrival: PatientArrival;
  type: CovidExaminationType;
  lbz: string;
  lbp: string;
}
