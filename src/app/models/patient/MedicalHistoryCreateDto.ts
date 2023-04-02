import {TreatmentResult} from "../patient-enums/TreatmentResult";
import {DiagnosisCode, DiagnosisCodeDto} from "./DiagnosisCode";

export interface MedicalHistoryCreateDto{
 confidential: boolean;
 treatmentResult: TreatmentResult;
 currStateDesc: string;
 diagnosisCodeDto: DiagnosisCodeDto;
 exists: boolean;
}
