import {Vaccination} from "./Vaccination";
import {Allergy} from "./Allergy";

export class GeneralMedicalData {
  id: number = 0;
  bloodType: string = '';
  rh: string = '';
  vaccinationDtos: Vaccination[] = [] ;
  allergyDtos: Allergy[] = [];
}
