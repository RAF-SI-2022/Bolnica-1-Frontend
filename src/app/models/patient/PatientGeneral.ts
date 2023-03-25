import {Gender} from "../patient-enums/Gender";
import {CountyCode} from "../patient-enums/CountyCode";
import {MaritalStatus} from "../patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../patient-enums/FamilyStatus";
import {Timestamp} from "rxjs";

export class PatientGeneral{
  jmbg: string = '';
  lbp: string = '';
  name: string = '';
  parentName: string = '';
  surname: string = '';
  // gender: Gender = 0;
  gender: string = '';
  dateOfBirth: Date = new Date();
  dateAndTimeOfDeath: Date = new Date(); // ovde je timestamp
  birthPlace: string = '';
  placeOfLiving: string = '';
  citizenship: CountyCode  = CountyCode.SRB;
  phone: string = '';
  email: string = '';
  guardianJmbg: string = '';
  guardianNameAndSurname: string = '';
  maritalStatus: MaritalStatus = 1;
  numOfChildren: number = 0;
  expertiseDegree: ExpertiseDegree = 1;
  profession: string = '';
  familyStatus: FamilyStatus = 1;

}

