import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {AdminPromeniZaposlenog, DeparmentShort, Uloga, UlogeZaposlenog, Zaposleni} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-edit-employee',
  templateUrl: './admin-edit-employee.component.html',
  styleUrls: ['./admin-edit-employee.component.css']
})
export class AdminEditEmployeeComponent implements OnInit {

  successMessage: string = '';
  userEdit: AdminPromeniZaposlenog;
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
  userPermissions: Uloga[];
  userPermissionDisplayed: UlogeZaposlenog;
  departments: DeparmentShort[];
  permissions: string[] = [];
  lbz: string = ''


  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
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
    this.userEdit = new AdminPromeniZaposlenog();
    this.userPermissions = [];
    this.userPermissionDisplayed = new UlogeZaposlenog();
    this.departments = [];

  }

  ngOnInit(): void {
    this.lbz = <string>this.route.snapshot.paramMap.get('lbz');
    //let zaposleni: Zaposleni = this.userService.getZaposleni()
    this.getUser(this.lbz);
    this.getUserPermissions();
    this.getDepartments();

    /*this.ime = zaposleni.ime
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
    this.SPECIJALISTA_MEDICINSKE_BIOHEMIJE = zaposleni.SPECIJALISTA_MEDICINSKE_BIOHEMIJE;*/
  }
  getDepartments(){
    this.userService.getDepartments().subscribe(result => {
      this.departments = result;
      for(let d of this.departments)
        console.log("de " + d.name);
    }, err =>{

    });
  }
  fillPagePermissions(): void{
    for(let p of this.userPermissions){
      if(p.shortName == 'ADMIN')
        this.userPermissionDisplayed.admin = true;
      else if(p.shortName == 'DR_SPEC')
        this.userPermissionDisplayed.dr_spec = true;
      else if(p.shortName == 'DR_SPEC_ODELJENJA')
        this.userPermissionDisplayed.dr_spec_odeljenja = true;
      else if(p.shortName == 'MED_SESTRA')
        this.userPermissionDisplayed.med_sestra = true;
      else if(p.shortName == 'VISA_MED_SES')
        this.userPermissionDisplayed.visa_med_sestra = true;
      else if(p.shortName == 'DR_SPEC_POV')
        this.userPermissionDisplayed.dr_spec_pov = true;
    }
  }

  getUser(LBZ: string): void {
    this.userService.getUser(LBZ).subscribe(result => {
    }, err => {
      console.log()
      if (err.status == 302) { // found!
        this.userEdit = err.error; // citanje poruka je sa err.errors TO JE BODY-PORUKA
        console.log("sss " + err.error.profession);
      }
    })
  }

  getUserPermissions(){
    this.userService.getUserPermissions().subscribe(result => {
      this.userPermissions = <Uloga[]><unknown>result;
      this.fillPagePermissions();
    }, err => {
      console.log(" nesto " + err.error);
    });
  }

  editEmployee(){

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
    }

    form.classList.add('was-validated');
    if(this.editGroup.get('ADMIN')?.value){
      this.permissions.push('ADMIN')
    }

    if(this.editGroup.get('DR_SPEC')?.value){
      this.permissions.push('DR_SPEC')
    }
    if(this.editGroup.get('DR_SPEC_POV')?.value){
      this.permissions.push('DR_SPEC_POV')
    }
    if(this.editGroup.get('NURSE')?.value){
      this.permissions.push('NURSE')
    }
    if(this.editGroup.get('SENIOR_NURSE')?.value){
      this.permissions.push('SENIOR_NURSE')
    }
      this.userService.editEmployee(this.lbz, this.editGroup.get('name')?.value, this.editGroup.get('lastName')?.value,
        this.editGroup.get('date')?.value, this.editGroup.get('gender')?.value, this.editGroup.get('JMBG')?.value,
        this.editGroup.get('adress')?.value,
        this.editGroup.get('city')?.value, this.editGroup.get('phoneNumber')?.value, this.editGroup.get('email')?.value,
        this.userEdit.username,"", this.userEdit.deleted, this.editGroup.get('title')?.value,
        this.editGroup.get('profession')?.value, this.editGroup.get('department')?.value, this.permissions).subscribe((response) => {


      }, error => {

      })


    }

    showSuccessMessage(){
      this.successMessage = 'Uspesno dodat korisnik!'
      setTimeout(() => {
        this.successMessage = ''
      }, 3000);
    }
}
