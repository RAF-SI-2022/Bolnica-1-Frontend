import { Component, OnInit } from '@angular/core';
import { AdminPromeniZaposlenog, DeparmentShort, Uloga, UlogaShort, UlogeZaposlenog, Zaposleni } from "../../../models/models";
import { UserService } from "../../../services/user-service/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEdit: AdminPromeniZaposlenog;
  userPermissionDisplayed: UlogeZaposlenog;
  userPermissions: Uloga[];
  departments: DeparmentShort[];

  disabledValue: boolean = true;
  userForm: FormGroup
  gender: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  department: string = '';

  constructor(private userService: UserService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      yourPassword: ['', [Validators.required]],
      username: ['', Validators.required],
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
    this.userPermissionDisplayed = new UlogeZaposlenog();
    this.userEdit = new AdminPromeniZaposlenog();
    this.userPermissions = [];
    this.departments = [];
  }

  showSuccessMessage(){
    this.successMessage = 'Uspesno dodat korisnik!'
    setTimeout(() => {
      this.successMessage = ''
    }, 3000);
  }
  
  ngOnInit(): void {
    this.userForm.get('name')?.disable()
    this.userForm.get('lastName')?.disable()
    this.userForm.get('email')?.disable()
    this.userForm.get('gender')?.disable()
    this.userForm.get('phoneNumber')?.disable()
    this.userForm.get('JMBG')?.disable()
    this.userForm.get('adress')?.disable()
    this.userForm.get('username')?.disable()
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
    this.getUserPermissions(localStorage.getItem("LBZ")!);
    this.getDepartments();

  }

  getDepartments() {
    this.userService.getDepartments().subscribe(result => {
      this.departments = result;
    }, err => {

    });
  }

  getUser(LBZ: string): void {
    this.userService.getUser(LBZ).subscribe(result => {
    }, err => {
      if (err.status == 302) { // found!
        this.userEdit = err.error; // citanje poruka je sa err.errors TO JE BODY-PORUKA
        ///this.userEdit.department = err.error.department;
        this.department = this.userEdit.department.pbo
        console.log("sss " + this.userEdit.department.name);
      }
    })
  }
  getUserPermissions(lbz:string) {
    this.userService.getUserPermissions(lbz).subscribe(result => {
      this.userPermissions = <Uloga[]><unknown>result;
      this.fillPagePermissions();
    }, err => {
      console.log(" nesto " + err.error);
    });
  }
  status: boolean = false;
  updateUser(): void {
    if (!this.status) {
      this.userForm.get('name')?.enable();
      this.userForm.get('lastName')?.enable()
      this.userForm.get('gender')?.enable()
      this.userForm.get('email')?.enable()
      this.userForm.get('username')?.enable()
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
    else {
      this.userForm.get('name')?.disable();
      this.userForm.get('lastName')?.disable()
      this.userForm.get('gender')?.disable()
      this.userForm.get('email')?.disable()
      this.userForm.get('username')?.disable()
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
      this.disabledValue = true;

    }
    this.status = !this.status;
  }

  fillPagePermissions(): void {
    for (let p of this.userPermissions) {
      if (p.shortName == 'ADMIN')
        this.userPermissionDisplayed.admin = true;
      else if (p.shortName == 'DR_SPEC')
        this.userPermissionDisplayed.dr_spec = true;
      else if (p.shortName == 'DR_SPEC_ODELJENJA')
        this.userPermissionDisplayed.dr_spec_odeljenja = true;
      else if (p.shortName == 'MED_SESTRA')
        this.userPermissionDisplayed.med_sestra = true;
      else if (p.shortName == 'VISA_MED_SES')
        this.userPermissionDisplayed.visa_med_sestra = true;
      else if (p.shortName == 'DR_SPEC_POV')
        this.userPermissionDisplayed.dr_spec_pov = true;
    }
  }
  saveUser(): void {

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
        return;
    }

    //todo ovo treba da se popravi
    /*
lbz: string, name: string, surname: string, dateOfBirth: Date, gender: string,  
jmbg: string, address: string, placeOfLiving: string, phone: string,
    email: string, username: string, password: string, deleted: boolean,
    title: Title, profession: Profession, departmentPbo: string,permissions: string[]
    */

      
    this.userService.editEmployee(
      this.authService.getLBZ(),
      this.userForm.get('name')?.value,
      this.userForm.get('surname')?.value(),
      this.userForm.get('dateOfBirth')?.value(),
      'male',
      this.userForm.get('jmbg')?.value(),
      this.userForm.get('address')?.value(),
      this.userForm.get('placeOfLiving')?.value(),
      this.userForm.get('phoneNumber')?.value(),
      this.userForm.get('email')?.value(),
      this.userForm.get('username')?.value(),
      this.userForm.get('password')?.value(),
      this.userForm.get('deleted')?.value(),
      this.userForm.get('title')?.value(),
      this.userForm.get('profession')?.value(),
      this.department,
      this.userForm.get('userPermission')?.value()
    ).subscribe(response => {
      console.log("USPEH " + response.name);
    })
      
    

    let newPassword = this.userForm.get('newPassword')?.value()
    let confirmPassword = this.userForm.get('confirmPassword')?.value()

    if (this.userForm.errors != null) {
      if (newPassword.equals(confirmPassword)) {


      }
    }
  }


  clickEvent() {
    this.status = !this.status;
  }

  canUpdate(): boolean {

    if (this.userService.checkRole('ADMIN')) {
      return true
    }
    return false

  }

  resetPassword(){
      this.router.navigate(['/new-password']);
  }

  onSelectionChange(event: any) {
    const id = event.target.options[event.target.selectedIndex].getAttribute('data-id');
    this.department = id;
  }
}
