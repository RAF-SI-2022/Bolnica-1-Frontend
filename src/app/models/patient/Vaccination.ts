import {VaccinationType} from "../patient-enums/VaccinationType";

export class Vaccination {
  name: string = '';
  type: VaccinationType
  description: string = '';
  manufacturer: string = '';
  vaccinationDate: Date = new Date();

  constructor(name: string, type: VaccinationType, description: string, manufacturer: string, vaccinationDate: Date) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.manufacturer = manufacturer;
    this.vaccinationDate = vaccinationDate;
  }
}
