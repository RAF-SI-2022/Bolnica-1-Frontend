import {DiagnosisCode} from "./DiagnosisCode";
import {Anamnesis} from "./Anamnesis";

export interface PatientReport {
  id: number;
  examDate: Date;
  lbz: string;
  confidential: boolean;
  objectiveFinding: string;
  advice: string;
  diagnosisCode: DiagnosisCode;
  anamnesis: Anamnesis;

}
