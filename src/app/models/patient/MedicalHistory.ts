import {TreatmentResult} from "../patient-enums/TreatmentResult";
import {DiagnosisCode} from "./DiagnosisCode";

export interface MedicalHistory {
  startDate: Date;
  endDate: Date;
  treatmentResult: TreatmentResult;
  currStateDesc: string;
  validFrom: Date;
  validTo : Date;
  valid: boolean;
  diagnosisCodeDto: DiagnosisCode;
}
