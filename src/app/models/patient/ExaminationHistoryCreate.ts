import {DiagnosisCode, DiagnosisCodeDto} from "./DiagnosisCode";
import {Anamnesis, AnamnesisDto} from "./Anamnesis";

export interface ExaminationHistoryCreate {
  examDate: Date;
  lbz: string;
  confidential: boolean;
  objectiveFinding: string;
  advice: string;
  therapy: string;

  // DiagnosisCodeDto: DiagnosisCode;
  // AnamnesisDto: Anamnesis;

  diagnosisCodeDto: DiagnosisCodeDto;
  anamnesisDto: AnamnesisDto;
}

export interface ExaminationHistoryCreateDto {
  examDate: Date;
  lbz: string;
  confidential: boolean;
  objectiveFinding: string;
  advice: string;
  therapy: string;

  // DiagnosisCodeDto: DiagnosisCode;
  // AnamnesisDto: Anamnesis;

  diagnosisCodeDto: DiagnosisCodeDto;
  anamnesisDto: AnamnesisDto;
}


