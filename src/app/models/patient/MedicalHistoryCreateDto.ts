import {TreatmentResult} from "../patient-enums/TreatmentResult";
import {DiagnosisCode} from "./DiagnosisCode";

export interface MedicalHistoryCreateDto{
 confidential: boolean;
 treatmentResult: TreatmentResult;
 currStateDesc: string;
 diagnosisCode: DiagnosisCode;
 exists: boolean;
}
