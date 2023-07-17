import {PatientArrival} from "../laboratory-enums/PatientArrival";
import {Vaccination} from "../patient/Vaccination";
import {Patient} from "../patient/Patient";

export interface ScheduledVaccinationDto{
  id: number;
  dateAndTime: Date;
  arrivalStatus: PatientArrival;
  note: string;
  lbz: String;
  vaccination: Vaccination;
  patient: Patient;

}
