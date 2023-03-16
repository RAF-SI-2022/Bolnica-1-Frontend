import {GeneralMedicalData} from "./GeneralMedicalData";

export interface LightMedicalRecord {
  id: number;
  registrationDate: Date;
  deleted: boolean;
  generalMedicalData: GeneralMedicalData;
}
