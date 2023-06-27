import {Vaccination} from "./Vaccination";
import {Allergy} from "./Allergy";

export class GeneralMedicalDataCreate {
  bloodType: string = '';
  rh: string = '';
  vaccinationDtos: Vaccination[] = [];
  allergyDtos: Allergy[] = [];
}
