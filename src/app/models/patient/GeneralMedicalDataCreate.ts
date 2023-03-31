import {Vaccination} from "./Vaccination";
import {Allergy} from "./Allergy";

export class GeneralMedicalDataCreate {
  bloodType: string = '';
  rH: string = '';
  vaccinationDtos: Vaccination[] = [];
  allergyDtos: Allergy[] = [];
}
