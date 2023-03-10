export interface Zaposleni{
  ime: string;
  prezime: string;
  datumRodjenja: string;
  JMBG: string;
  mestoStanovanje: string;
  adresaStanovanja: string;
  brojTelefona: string;
  imejl: string;
  //proveri za pol
  pol: boolean;
  titula: string;
  zanimanje: string;
  odeljenje: string;
  admin: boolean;
  dr_spec_odeljenja: boolean;
  dr_spec: boolean;
  dr_spec_pov: boolean;
  visa_med_sestra: boolean;
  med_sestra: boolean;
}
