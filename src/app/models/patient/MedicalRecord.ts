import {Patient} from "./Patient";
import {GeneralMedicalData} from "./GeneralMedicalData";
import {Operation} from "./Operation";
import {MedicalHistory} from "./MedicalHistory";
import {ExaminationHistory} from "./ExaminationHistory";

export interface MedicalRecord {
  id:number;
  registrationDate: Date;
  patient: Patient;
  generalMedicalDataDto: GeneralMedicalData;
  operationDtos: Operation[];
  medicalHistoryDtos: MedicalHistory[];
  examinationHistoryDtos: ExaminationHistory[];
}
