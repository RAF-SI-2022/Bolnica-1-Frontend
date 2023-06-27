import {Vaccination} from "../patient/Vaccination";
import {Allergy} from "../patient/Allergy";

export interface DischargeListDto {
  id: number;
  followingDiagnosis: string;
  anamnesis: string;
  analysis: string;
  courseOfDisease: string;
  summary: string;
  therapy: string;
  lbzPrescribing:string;
  lbzDepartment:string;
  creation: Date; // ovo je timestamp
  hospitalizationId:number;
}

export class DischargeListDto {
  id: number = 0;
  followingDiagnosis: string = '';
  anamnesis: string = '';
  analysis: string = '';
  courseOfDisease: string = '';
  summary: string = '';
  therapy: string = '';
  lbzPrescribing:string = '';
  lbzDepartment:string = '';
  creation: Date = new Date(); // ovo je timestamp
  hospitalizationId:number = 0;
}


