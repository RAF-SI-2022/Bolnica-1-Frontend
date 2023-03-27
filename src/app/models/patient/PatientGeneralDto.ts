import {CountryCode} from "../patient-enums/CountryCode";
import {MaritalStatus} from "../patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../patient-enums/FamilyStatus";

export class PatientGeneralDto{
  id: number = 1
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
  citizenship: CountryCode  = CountryCode.SRB;
  phone: string = '';
  email: string = '';
  deleted: boolean = false;
  guardianJmbg: string = '';
  guardianNameAndSurname: string = '';
  maritalStatus: MaritalStatus = 1;
  numOfChildren: number = 0;
  expertiseDegree: ExpertiseDegree = 1;
  profession: string = '';
  familyStatus: FamilyStatus = 1;

}
