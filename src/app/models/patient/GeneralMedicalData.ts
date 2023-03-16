import {Vaccination} from "./Vaccination";
import {Allergy} from "./Allergy";

export interface GeneralMedicalData {
  id: number;
  bloodType: string;
  rH: string;
  vaccinationDtos: Vaccination[];
  allergyDtos: Allergy[];
}
