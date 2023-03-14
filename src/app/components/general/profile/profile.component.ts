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

  permissionsList: string[] = [];

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
      // CHIEF: '',
      DR_SPEC_DEPARTMENT: '',
      DR_SPEC: '',
      DR_SPEC_POV: '',
      VISA_MED_SESTRA: '',
      MED_SESTRA: '',
      // RECEPTIONIST: '',
      // SENIOR_LAB_TECHNICIAN: '',
      // LAB_TECHNICIAN: '',
      // MED_BIOCHEMIST: '',
      // SPECIALIST_MED_BIOCHEMIST: ''

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
    this.getUserPermissions();
    this.getDepartments();

  }

  getDepartments() {
    this.userService.getDepartments().subscribe(result => {
      this.departments = result;
      for (let d of this.departments)
        console.log("de " + d.name);
    }, err => {

    });
  }

  getUser(LBZ: string): void {
    this.userService.getUser(LBZ).subscribe(result => {
    }, err => {
      console.log()
      if (err.status == 302) { // found!
        this.userEdit = err.error; // citanje poruka je sa err.errors TO JE BODY-PORUKA
        this.department = this.userEdit.department.pbo
        console.log("sss " + err.error.department.name);
      }
    })
  }

  getUserPermissions() {
    this.userService.getUserRoles().subscribe(result => {
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
      else if (p.shortName == 'VISA_MED_SESTRA')
        this.userPermissionDisplayed.visa_med_sestra = true;
      else if (p.shortName == 'DR_SPEC_POV')
        this.userPermissionDisplayed.dr_spec_pov = true;

      console.log(p)
    }
  }


  saveUser(): void {

    console.log("zovem saveUser() metodu")

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');


    if(this.userPermissionDisplayed.admin == true) this.permissionsList.push('ADMIN');
    if(this.userPermissionDisplayed.dr_spec == true) this.permissionsList.push('DR_SPEC');
    if(this.userPermissionDisplayed.dr_spec_pov == true) this.permissionsList.push('DR_SPEC_POV');
    if(this.userPermissionDisplayed.med_sestra == true) this.permissionsList.push('MED_SESTRA');
    if(this.userPermissionDisplayed.visa_med_sestra == true) this.permissionsList.push('VISA_MED_SESTRA');
    if (this.permissionsList.length == 0) {
      this.errorMessage = 'Izaberi barem jednu privilegiju!';
      return;
    }

    console.log("uloge " + this.permissionsList)

    if (form.checkValidity() === true) {
      {
        //let newPassword = this.userForm.get('newPassword')?.value
        //let confirmPassword = this.userForm.get('confirmPassword')?.value

        //if(newPassword == confirmPassword){

        this.userService.editProfile(

          this.authService.getLBZ(),
          this.userForm.get('name')?.value,
          this.userForm.get('lastName')?.value,
          this.userForm.get('date')?.value, //mora date
          this.userForm.get('gender')?.value,
          this.userForm.get('JMBG')?.value,
          this.userForm.get('adress')?.value,
          this.userForm.get('city')?.value,
          this.userForm.get('phoneNumber')?.value,
          this.userForm.get('email')?.value,
          this.userForm.get('username')?.value,
          false,
          this.userForm.get('title')?.value,
          this.userForm.get('profession')?.value,
          this.department,
          this.permissionsList

        ).subscribe(response => {
          console.log("USPEH " + response.name);
        })


        //} else alert("Lozinke se ne poklapaju!")


      }
    }

    this.permissionsList = [];
    console.log("uloge prazne" + this.permissionsList)

    //sta se ovde htelo?
    // let newPassword = this.userForm.get('newPassword')?.value
    // let confirmPassword = this.userForm.get('confirmPassword')?.value
    //
    // if (this.userForm.errors != null) {
    //   if (newPassword.equals(confirmPassword)) {
    //     // nesto
    //   }
    // }
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
