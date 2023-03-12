import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {Zaposleni} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-edit-employee',
  templateUrl: './admin-edit-employee.component.html',
  styleUrls: ['./admin-edit-employee.component.css']
})
export class AdminEditEmployeeComponent implements OnInit {
  editGroup: FormGroup;
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


  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.editGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      yourPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      JMBG: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      department: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      ADMIN: '',
      CHIEF: '',
      DR_SPEC_DEPARTMENT: '',
      DR_SPEC: '',
      DR_SPEC_POV: '',
      SENIOR_NURSE: '',
      NURSE: '',
      RECEPTIONIST: '',
      SENIOR_LAB_TECHNICIAN: '',
      LAB_TECHNICIAN: '',
      MED_BIOCHEMIST: '',
      SPECIALIST_MED_BIOCHEMIST: ''

    })

  }

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

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
    }

    form.classList.add('was-validated');

      this.userService.editEmployee(this.editGroup.get('name')?.value, this.editGroup.get('lastName')?.value,
        this.editGroup.get('date')?.value, this.editGroup.get('JMBG')?.value, this.editGroup.get('city')?.value,
        this.editGroup.get('adress')?.value, this.editGroup.get('phoneNumber')?.value, this.editGroup.get('email')?.value,
        this.editGroup.get('gender')?.value,this.editGroup.get('gender')?.value, this.editGroup.get('title')?.value,
        this.editGroup.get('profession')?.value, this.editGroup.get('department')?.value,
        this.editGroup.get('ADMIN')?.value, this.editGroup.get('DR_SPEC_DEPARTMENT')?.value,
        this.editGroup.get('DR_SPEC')?.value, this.editGroup.get('SENIOR_NURSE')?.value,
        this.editGroup.get('NURSE')?.value, this.editGroup.get('DR_SPEC_POV')?.value, this.editGroup.get('RECEPCIONIST')?.value,
        this.editGroup.get('SENIOR_LAB_TECHNICIAN')?.value, this.editGroup.get('LAB_TECHNICIAN')?.value,
        this.editGroup.get('MED_BIOCHEMIST')?.value, this.editGroup.get('SPECIALIST_MED_BIOCHEMIST')?.value).subscribe((response) => {

      }, error => {

      })


    }
}
