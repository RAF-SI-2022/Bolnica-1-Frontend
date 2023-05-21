import {DiagnosisCode, DiagnosisCodeDto} from "./DiagnosisCode";
import {Anamnesis, AnamnesisDto} from "./Anamnesis";

export interface ExaminationHistory {
  id: number;
  examDate: Date;
  lbz: string;
  confidential: boolean;
  objectiveFinding: string;
  advice: string;
  therapy: string;

  diagnosisCodeDto: DiagnosisCode;
  anamnesisDto: AnamnesisDto;
}
