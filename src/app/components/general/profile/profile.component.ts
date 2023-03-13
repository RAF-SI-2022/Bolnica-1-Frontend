import { Component, OnInit } from '@angular/core';
import { AdminPromeniZaposlenog, Uloga, UlogaShort, UlogeZaposlenog, Zaposleni } from "../../../models/models";
import { UserService } from "../../../services/user-service/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userRoles: UlogeZaposlenog;
  userEdit: AdminPromeniZaposlenog;
  userPermissions: Uloga[];

  disabledValue: boolean = true;
  userForm: FormGroup
  gender: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
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
    this.userRoles = new UlogeZaposlenog();
    this.userEdit = new AdminPromeniZaposlenog();
    this.userPermissions = [];
  }

  ngOnInit(): void {
    this.userForm.get('name')?.disable()
    this.userForm.get('lastName')?.disable()
    this.userForm.get('email')?.disable()
    this.userForm.get('gender')?.disable()
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
    console.log("LBZ " + localStorage.getItem("LBZ")!);
    this.getUser(localStorage.getItem("LBZ")!);
    this.getUserPermissions();
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
  updateUser(): void {
    this.userForm.get('name')?.enable()
    this.userForm.get('lastName')?.enable()
    this.userForm.get('gender')?.enable()
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

  fillPagePermissions(): void{
    for(let p of this.userPermissions){
      if(p.shortName == 'ADMIN')
        this.userRoles.admin = true;
      else if(p.shortName == 'DR_SPEC')
        this.userRoles.dr_spec = true;
      else if(p.shortName == 'DR_SPEC_ODELJENJA')
        this.userRoles.dr_spec_odeljenja = true;
      else if(p.shortName == 'MED_SESTRA')
        this.userRoles.med_sestra = true;
      else if(p.shortName == 'VISA_MED_SES')
        this.userRoles.visa_med_sestra = true;
        else if(p.shortName == 'DR_SPEC_POV')
        this.userRoles.dr_spec_pov = true;
    }
}
  saveUser(): void {

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');

    if (form.checkValidity() === false) {
      {
        this.userService.editEmployee(
          this.userForm.get('name')?.value,
          this.userForm.get('lastName')?.value(),
          this.userForm.get('gender')?.value(),
          this.userForm.get('gender')?.value(),
          this.userForm.get('email')?.value(),
          this.userForm.get('phoneNumber')?.value(),
          this.userForm.get('JMBG')?.value(),
          this.userForm.get('adress')?.value(),
          this.userForm.get('city')?.value(),
          this.userForm.get('date')?.value(),
          this.userForm.get('title')?.value(),
          this.userForm.get('department')?.value(),
          this.userForm.get('profession')?.value(),
          this.userForm.get('yourPassword')?.value(),
          this.userForm.get('newPassword')?.value(),
          this.userForm.get('confirmPassword')?.value(),
          this.userForm.get('ADMIN')?.value(),
          this.userForm.get('CHIEF')?.value(),
          this.userForm.get('RECEPCIONIST')?.value(),
          this.userForm.get('DR_SPEC')?.value(),
          this.userForm.get('DR_SPEC_POV')?.value(),
          this.userForm.get('SENIOR_NURSE')?.value(),
          this.userForm.get('NURSE')?.value(),
          this.userForm.get('SENIOR_LAB_TECHNICIAN')?.value(),
          // this.userForm.get('LAB_TECHNICIAN')?.value(),
          // this.userForm.get('MED_BIOCHEMIST')?.value(),
          // this.userForm.get('SPECIALIST_MED_BIOCHEMIST')?.value(),

        ).subscribe(response => {

        })
      }
    }

    let newPassword = this.userForm.get('newPassword')?.value()
    let confirmPassword = this.userForm.get('confirmPassword')?.value()

    if (this.userForm.errors != null) {
      if (newPassword.equals(confirmPassword)) {


      }
    }
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  canUpdate(): boolean {

    if (this.userService.checkRole('ADMIN')) {
      return true
    }
    return false

  }

}
