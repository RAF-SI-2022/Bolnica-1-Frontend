import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user-service/user.service";
import { AdminPromeniZaposlenog, DeparmentShort, Uloga, UlogeZaposlenog, Zaposleni } from "../../../models/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-edit-employee',
  templateUrl: './admin-edit-employee.component.html',
  styleUrls: ['./admin-edit-employee.component.css']
})
export class AdminEditEmployeeComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  userEdit: AdminPromeniZaposlenog;
  editGroup: FormGroup;

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
  department: string = '';


  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
    this.editGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: false,
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      JMBG: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      department: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      deleted: false,
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
    this.getUser(this.lbz);
    this.getUserPermissions(this.lbz);
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

  getUser(LBZ: string): void {
    this.userService.getUser(LBZ).subscribe(result => {
    }, err => {
      console.log()
      if (err.status == 302) { // found!
        this.userEdit = err.error; // citanje poruka je sa err.errors TO JE BODY-PORUKA
        this.department = this.userEdit.department.pbo
        this.editGroup.get('gender')?.setValue(this.userEdit.gender.toLowerCase() === 'female');
        console.log("sss " +  this.editGroup.get('gender')?.value);
      }
    })
  }

  getUserPermissions(lbz:string){
    this.userService.getUserPermissions(lbz).subscribe(result => {
      this.userPermissions = result;
      console.log("jejee" + result)
      this.fillPagePermissions();
    }, err => {
      console.log(" nesto " + err.error);
    });
  }

  editEmployee() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
    }

    form.classList.add('was-validated');
    if (this.editGroup.get('ADMIN')?.value) {
      this.permissions.push('ADMIN')
    }

    if (this.editGroup.get('DR_SPEC')?.value) {
      this.permissions.push('DR_SPEC')
    }
    if (this.editGroup.get('DR_SPEC_POV')?.value) {
      this.permissions.push('DR_SPEC_POV')
    }
    if (this.editGroup.get('NURSE')?.value) {
      this.permissions.push('MED_SESTRA')
    }
    if (this.editGroup.get('SENIOR_NURSE')?.value) {
      this.permissions.push('SENIOR_NURSE')
    }
    if (this.permissions.length == 0) {
      this.errorMessage = 'Izaberi barem jednu privilegiju!';
      return;
    }
    console.log(this.editGroup.get('deleted')?.value )
    this.userService.editEmployee(this.lbz, this.editGroup.get('name')?.value, this.editGroup.get('lastName')?.value,
        this.editGroup.get('date')?.value, this.editGroup.get('gender')?.value, this.editGroup.get('JMBG')?.value,
        this.editGroup.get('adress')?.value,
        this.editGroup.get('city')?.value, this.editGroup.get('phoneNumber')?.value, this.editGroup.get('email')?.value,
        this.editGroup.get('username')?.value, this.editGroup.get('password')?.value, this.editGroup.get('deleted')?.value , this.editGroup.get('title')?.value,
        this.editGroup.get('profession')?.value, this.department, this.permissions).subscribe((response) => {
          this.showSuccessMessage()
            console.log(response)
      }, error => {
          this.errorMessage = 'Mejl mora biti unikat sadrzati bar 5 slova i biti na domenu @ibis.rs';
      })


  }

  showSuccessMessage() {
    this.errorMessage = '';
    this.successMessage = 'Uspesno sacuvan korisnik!'
    setTimeout(() => {
      this.successMessage = ''
    }, 3000);
  }

  showErrorMessage() {
    this.errorMessage = 'Mejl mora biti unikat sadrzati bar 5 slova i biti na domenu @ibis.rs';
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000);
  }

  onSelectionChange(event: any) {
    const id = event.target.options[event.target.selectedIndex].getAttribute('data-id');
    this.department = id;
  }

}
