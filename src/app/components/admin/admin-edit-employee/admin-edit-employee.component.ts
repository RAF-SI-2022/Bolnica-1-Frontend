import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {Zaposleni} from "../../../models/models";

@Component({
  selector: 'app-admin-edit-employee',
  templateUrl: './admin-edit-employee.component.html',
  styleUrls: ['./admin-edit-employee.component.css']
})
export class AdminEditEmployeeComponent implements OnInit {

  ime: string = '';
  prezime: string = '';
  datumRodjenja: string = '';
  JMBG: string = '';
  mestoStanovanja: string = '';
  adresaStanovanja: string = '';
  brojTelefona: string = '';
  imejl: string = '';
  musko: boolean = false;
  zensko: boolean = false;
  titula: string = '';
  zanimanje: string = '';
  odeljenje: string = '';
  ADMIN: boolean = false;
  DR_SPEC_ODELJENJA: boolean = false;
  DR_SPEC: boolean = false;
  VISA_MED_SESTRA: boolean = false;
  MED_SESTRA: boolean = false;
  DR_SPEC_POV: boolean = false;
  RECEPCIONER: boolean = false;
  VISI_LABORATORIJSKI_TEHNICAR: boolean = false;
  LABORATORIJSKI_TEHNICAR: boolean = false;
  MEDICINSKI_BIOHEMICAR: boolean = false;
  SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let zaposleni: Zaposleni = this.userService.getZaposleni()
    this.ime = zaposleni.ime
    this.prezime = zaposleni.prezime
    this.datumRodjenja = zaposleni.datumRodjenja
    this.JMBG = zaposleni.JMBG;
    this.mestoStanovanja = zaposleni.mestoStanovanja;
    this.adresaStanovanja = zaposleni.adresaStanovanja;
    this.brojTelefona = zaposleni.brojTelefona;
    this.imejl = zaposleni.imejl;
    this.musko = zaposleni.musko;
    this.zensko = zaposleni.zensko;
    this.titula = zaposleni.titula;
    this.zanimanje = zaposleni.zanimanje;
    this.ADMIN = zaposleni.ADMIN;
    this.DR_SPEC_ODELJENJA = zaposleni.DR_SPEC_ODELJENJA;
    this.DR_SPEC = zaposleni.DR_SPEC;
    this.VISA_MED_SESTRA = zaposleni.VISA_MED_SESTRA;
    this.MED_SESTRA = zaposleni.MED_SESTRA;
    this.DR_SPEC_POV = zaposleni.DR_SPEC_POV;
    this.RECEPCIONER = zaposleni.RECEPCIONER;
    this.VISI_LABORATORIJSKI_TEHNICAR = zaposleni.VISI_LABORATORIJSKI_TEHNICAR;
    this.LABORATORIJSKI_TEHNICAR = zaposleni.LABORATORIJSKI_TEHNICAR;
    this.MEDICINSKI_BIOHEMICAR = zaposleni.MEDICINSKI_BIOHEMICAR;
    this.SPECIJALISTA_MEDICINSKE_BIOHEMIJE = zaposleni.SPECIJALISTA_MEDICINSKE_BIOHEMIJE;
  }


  editEmployee(){
    this.userService.editEmployee(this.ime, this.prezime, this.datumRodjenja, this.JMBG, this.mestoStanovanja, this.adresaStanovanja
      , this.brojTelefona, this.imejl, this.musko, this.zensko, this.titula, this.zanimanje, this.odeljenje,
      this.ADMIN, this.DR_SPEC_ODELJENJA, this.DR_SPEC, this.VISA_MED_SESTRA, this.MED_SESTRA, this.DR_SPEC_POV, this.RECEPCIONER,
      this.VISI_LABORATORIJSKI_TEHNICAR, this.LABORATORIJSKI_TEHNICAR, this.MEDICINSKI_BIOHEMICAR, this.SPECIJALISTA_MEDICINSKE_BIOHEMIJE).subscribe((response) => {

    }, error => {

    })

  }



}
