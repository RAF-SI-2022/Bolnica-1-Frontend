import {Vaccination} from "./Vaccination";
import {Allergy} from "./Allergy";

export interface GeneralMedicalDataCreate {
  bloodType: string;
  rH: string;
  vaccinationDtos: Vaccination[];
  allergyDtos: Allergy[];
}
