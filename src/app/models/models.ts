export class NapraviZaposlenog {
  lbz: string = '';
  name: string = '';
  surname: string = '';
  dateOfBirth: Date = new Date();
  gender: string = '';
  jmbg: string = '';
  address: string = '';
  placeOfLiving: string = '';
  phone: string = '';
  email: string = '';
  title: Title = Title.DIPL_FARM;
  profession: Profession = Profession.MED_SESTRA;
  department: number = 0;
}

export class AdminPromeniZaposlenog{
  name: string = '';
  surname: string = '';
  dateOfBirth: Date = new Date();
  gender: string = '';
  jmbg: string = '';
  address: string = '';
  placeOfLiving: string = '';
  phone: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  deleted: boolean = false;
  title: Title = Title.DIPL_FARM;
  profession: Profession = Profession.MED_SESTRA;
  department: Department = new Department();
} 

export class Uloga{
    id: number = 1;
    "shortName": string = ''
}

export enum UlogaShort{
    ADMIN,
    DR_SPEC_ODELJENJA,
    DR_SPEC,
    DR_SPEC_POV,
    MED_SESTRA,
    VISA_MED_SES
}

export class UlogeZaposlenog{
    admin: boolean = false;
    dr_spec_odeljenja: boolean = false;
    dr_spec: boolean = false;
    dr_spec_pov: boolean = false;
    med_sestra: boolean = false;
    visa_med_sestra: boolean = false;
}

export class Zaposleni {
  id: number = 1;
  lbz: string = '';
  name: string = '';
  surname: string = '';
  dateOfBirth: Date = new Date();
  gender: string = '';
  jmbg: string = '';
  address: string = '';
  placeOfLiving: string = '';
  phone: string = '';
  email: string = '';
  username: string = '';
  deleted: boolean = false;
  title: Title = Title.MR;
  profession: Profession = Profession.MED_SESTRA;
  department: Department = new Department();
}

export enum Title {
  PROF_DR_MED = 'PROF_DR_MED',
  DR_MED_SPEC = 'DR_MED_SPEC',
  DR_SCI_ME = 'DR_SCI_ME',
  DIPL_FARM = 'DIPL_FARM',
  MAG_FARM = 'MAG_FARM',
  MR = 'MR'
}

export enum Profession {
  MED_SESTRA = 'MED_SESTRA',
  SPEC_BIOHEMICAR = 'SPEC_BIOHEMICAR',
  SPEC_GASTROENTEROLOG = 'SPEC_GASTROENTEROLOG',
  SPEC_GINEKOLOG = 'SPEC_GINEKOLOG',
  SPEC_ENDOKRINOLOG = 'SPEC_ENDOKRINOLOG',
  SPEC_KARDIOLOG = 'SPEC_KARDIOLOG',
  SPEC_NEUROLOG = 'SPEC_NEUROLOG',
  SPEC_NEFROLOG = 'SPEC_NEFROLOG',
  SPEC_PSIHIJATAR = 'SPEC_PSIHIJATAR',
  SPEC_PULMOLOG = 'SPEC_PULMOLOG',
  SPEC_UROLOG = 'SPEC_UROLOG',
  SPEC_HEMATOLOG = 'SPEC_HEMATOLOG',
  SPEC_HIRURG = 'SPEC_HIRURG'
}

export class Department {
  id: number = 0;
  pbo: string = '';
  name: string = '';
  deleted: boolean = false;
  hospital: Hospital = new Hospital();
}

export class Hospital {
  id: number = 0;
  pbb: string = '';
  fullName: string = '';
  shortName: string = '';
  place: string = '';
  address: string = '';
  dateOfEstablishment: Date = new Date();
  activity: string = '';
  deleted: boolean = false;
}

