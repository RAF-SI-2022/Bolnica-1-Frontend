import {Gender} from "../patient-enums/Gender";
import {CountryCode} from "../patient-enums/CountryCode";
import {MaritalStatus} from "../patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../patient-enums/FamilyStatus";
import {PatientGeneral} from "./PatientGeneral";


// export interface PatientUpdate{
//   jmbg: string;
//   lbp: string;
//   name: string;
//   parentName: string;
//   surname: string;
//   gender: Gender;
//   dateOfBirth: Date;
//   dateAndTimeOfDeath: Date; // ovde je timestamp
//   birthPlace: string;
//   placeOfLiving: string;
//   citizenship: CountryCode;
//   phone: string;
//   email: string;
//   guardianJmbg: string;
//   guardianNameAndSurname: string;
//   maritalStatus: MaritalStatus;
//   numOfChildren: number;
//   expertiseDegree: ExpertiseDegree;
//   profession: string;
//   familyStatus: FamilyStatus;
//
//   deleted: boolean;
// }


export class PatientUpdateClass extends PatientGeneral{
  deleted: boolean = false;
}


