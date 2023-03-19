import {Gender} from "../patient-enums/Gender";
import {CountyCode} from "../patient-enums/CountyCode";
import {MaritalStatus} from "../patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../patient-enums/FamilyStatus";

export interface Patient{
  id: number;
  jmbg: string;
  lbp: string;
  name: string;
  parentName: string;
  surname: string;
  gender: Gender;
  dateOfBirth: Date;
  dateAndTimeOfDeath: Date; // ovde je timestamp
  birthPlace: string;
  placeOfLiving: string;
  citizenship: CountyCode;
  phone: string;
  email: string;
  deleted: boolean;
  guardianJmbg: string;
  guardianNameAndSurname: string;
  maritalStatus: MaritalStatus;
  numOfChildren: number;
  expertiseDegree: ExpertiseDegree;
  profession: string;
  familyStatus: FamilyStatus;
}
