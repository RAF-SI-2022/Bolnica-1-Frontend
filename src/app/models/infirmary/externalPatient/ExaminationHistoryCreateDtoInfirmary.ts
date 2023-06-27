import {DiagnosisCodeDto} from "../../patient/DiagnosisCode";
import {AnamnesisDto} from "../../patient/Anamnesis";

export interface ExaminationHistoryCreateDtoInfirmary {
  lbp: string,
  examDate: Date;
  lbz: string;
  confidential: boolean;
  objectiveFinding: string;
  advice: string;
  therapy: string;

  diagnosisCodeDto: DiagnosisCodeDto;
  anamnesisDto: AnamnesisDto;
}
