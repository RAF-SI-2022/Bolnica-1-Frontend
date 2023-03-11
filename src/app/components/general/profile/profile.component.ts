import {Component, OnInit} from '@angular/core';
import {Zaposleni} from "../../../models/models";
import {UserService} from "../../../services/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: Zaposleni

  disabledValue: boolean = true;
  userForm: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      site_state: ['', [Validators.required]],
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
      admin: ['', [Validators.required]],
      chief: ['', [Validators.required]],
      receptionist: ['', [Validators.required]],
      doctorSpecialist: ['', [Validators.required]],
      doctorSpecialistPrivate: ['', [Validators.required]],
      seniorNurse: ['', [Validators.required]],
      nurse: ['', [Validators.required]],
      seniorLabTechnician: ['', [Validators.required]],
      labTechnician: ['', [Validators.required]],
      biochemist: ['', [Validators.required]],
      specMedBiohemist: ['', [Validators.required]],

    })
    this.userInfo = {
      ime: '',
      prezime: '',
      datumRodjenja: '',
      JMBG: '',
      lozinka: '',
      mestoStanovanje: '',
      adresaStanovanja: '',
      brojTelefona: '',
      imejl: '',
      musko: false,
      zensko: false,
      titula: '',
      odeljenje: '',
      zanimanje: '',
      ADMIN: false,
      NACELNIK: false,
      DR_SPEC_ODELJENJA: false,
      DR_SPEC: false,
      DR_SPEC_POV: false,
      VISA_MED_SESTRA: false,
      MED_SESTRA: false,
      RECEPCIONER: false,
      VISI_LABORATORIJSKI_TEHNICAR: false,
      LABORATORIJSKI_TEHNICAR: false,
      MEDICINSKI_BIOHEMICAR: false,
      SPECIJALISTA_MEDICINSKE_BIOHEMIJE: false
    }
  }

  ngOnInit(): void {
    this.userForm.get('name')?.disable()
    this.userForm.get('lastName')?.disable()
    this.userForm.get('email')?.disable()
    this.userForm.get('phoneNumber')?.disable()
    this.userForm.get('JMBG')?.disable()
    this.userForm.get('adress')?.disable()
    this.userForm.get('city')?.disable()
    this.userForm.get('date')?.disable()
    this.userForm.get('title')?.disable()
    this.userForm.get('department')?.disable()
    this.userForm.get('profession')?.disable()
    this.userForm.get('yourPassword')?.disable()
    this.userForm.get('newPassword')?.disable()
    this.userForm.get('confirmPassword')?.disable()

    const LBZ: number = parseInt(<string>localStorage.getItem("LBZ"));
   // this.getUser(LBZ)

  }

  getUser(LBZ: number): void{
    this.userService.getUser(LBZ).subscribe(result => {
      this.userInfo.ime = result.ime
      this.userInfo.prezime = result.prezime
      this.userInfo.datumRodjenja = result.datumRodjenja
      this.userInfo.JMBG = result.JMBG
      this.userInfo.mestoStanovanje = result.mestoStanovanje
      this.userInfo.adresaStanovanja = result.adresaStanovanja
      this.userInfo.brojTelefona = result.brojTelefona
      this.userInfo.imejl = result.ime
      this.userInfo.musko = result.musko
      this.userInfo.zensko = result.zensko
      this.userInfo.titula = result.titula
      this.userInfo.odeljenje = result.odeljenje
      this.userInfo.zanimanje = result.zanimanje
      this.userInfo.NACELNIK = result.NACELNIK
      this.userInfo.ADMIN = result.ADMIN
      this.userInfo.DR_SPEC_ODELJENJA = result.DR_SPEC_ODELJENJA
      this.userInfo.DR_SPEC = result.DR_SPEC
      this.userInfo.DR_SPEC_POV = result.DR_SPEC_POV
      this.userInfo.VISA_MED_SESTRA = result.VISA_MED_SESTRA
      this.userInfo.MED_SESTRA = result.MED_SESTRA
      this.userInfo.RECEPCIONER = result.RECEPCIONER
      this.userInfo.VISI_LABORATORIJSKI_TEHNICAR = result.VISI_LABORATORIJSKI_TEHNICAR
      this.userInfo.LABORATORIJSKI_TEHNICAR = result.LABORATORIJSKI_TEHNICAR
      this.userInfo.MEDICINSKI_BIOHEMICAR = result.MEDICINSKI_BIOHEMICAR
      this.userInfo.SPECIJALISTA_MEDICINSKE_BIOHEMIJE = result.SPECIJALISTA_MEDICINSKE_BIOHEMIJE
    })
  }
  updateUser(): void {
    this.userForm.get('name')?.enable()
    this.userForm.get('lastName')?.enable()
    this.userForm.get('email')?.enable()
    this.userForm.get('phoneNumber')?.enable()
    this.userForm.get('JMBG')?.enable()
    this.userForm.get('adress')?.enable()
    this.userForm.get('city')?.enable()
    this.userForm.get('date')?.enable()
    this.userForm.get('title')?.enable()
    this.userForm.get('department')?.enable()
    this.userForm.get('profession')?.enable()
    this.userForm.get('yourPassword')?.enable()
    this.userForm.get('newPassword')?.enable()
    this.userForm.get('confirmPassword')?.enable()

    this.disabledValue = false

  }

  saveUser(): void {
    let newPassword = this.userForm.get('newPassword')?.value()
    let confirmPassword = this.userForm.get('confirmPassword')?.value()

    if(newPassword.equals(confirmPassword))
    {
      this.userService.updateUser(this.userInfo, newPassword, confirmPassword ).subscribe(result => {
      console.log(result)
    })

    }

  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;
  }

  canUpdate(): boolean{

    if(this.userService.checkAdmin()){
      return true
    }
    return false

  }

}
