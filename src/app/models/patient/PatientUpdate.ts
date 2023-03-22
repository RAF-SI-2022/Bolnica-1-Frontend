import {Gender} from "../patient-enums/Gender";
import {CountyCode} from "../patient-enums/CountyCode";
import {MaritalStatus} from "../patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../patient-enums/FamilyStatus";

export interface PatientUpdate{
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
  guardianJmbg: string;
  guardianNameAndSurname: string;
  maritalStatus: MaritalStatus;
  numOfChildren: number;
  expertiseDegree: ExpertiseDegree;
  profession: string;
  familyStatus: FamilyStatus;

  deleted: boolean;
}

export class PatientUpdate{
  jmbg: string = '';
  lbp: string = '';
  name: string = '';
  parentName: string = '';
  surname: string = '';
  gender: Gender = 0;
  dateOfBirth: Date = new Date();
  dateAndTimeOfDeath: Date = new Date(); // ovde je timestamp
  birthPlace: string = '';
  placeOfLiving: string = '';
  citizenship: CountyCode = 197;
  phone: string = '';
  email: string = '';
  guardianJmbg: string = '';
  guardianNameAndSurname: string = '';
  maritalStatus: MaritalStatus = 0;
  numOfChildren: number = 0;
  expertiseDegree: ExpertiseDegree = 0;
  profession: string = '';
  familyStatus: FamilyStatus = 0;

  deleted: boolean = false;
}


