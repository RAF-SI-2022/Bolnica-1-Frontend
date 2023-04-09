import {DiagnosisCode} from "./DiagnosisCode";
import {Anamnesis} from "./Anamnesis";

export interface ExaminationHistory {
  id: number;
  examDate: Date;
  lbz: string;
  confidential: boolean;
  objectiveFinding: string;
  advice: string;
  therapy: string;

  DiagnosisCodeDto: DiagnosisCode;
  AnamnesisDto: Anamnesis;
}
