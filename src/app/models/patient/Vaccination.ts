export class Vaccination {
  name: string = '';
  type: string = '';
  description: string = '';
  manufacturer: string = '';
  vaccinationDate: Date = new Date();

  constructor(name: string, type: string, description: string, manufacturer: string, vaccinationDate: Date) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.manufacturer = manufacturer;
    this.vaccinationDate = vaccinationDate;
  }
}
