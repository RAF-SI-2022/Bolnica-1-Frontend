import {TreatmentResult} from "../patient-enums/TreatmentResult";

export interface PatientDesease{
  id: number;
  startDate: Date;
  endDate: Date;
  treatmentResult: TreatmentResult;
  currStateDesc: string;
  validFrom: Date;
  validTo: Date;
  valid: boolean;
}
