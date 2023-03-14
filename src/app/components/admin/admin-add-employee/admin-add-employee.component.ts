import {Component, OnInit} from '@angular/core';
import {DeparmentShort, Zaposleni} from "../../../models/models";
import {UserService} from "../../../services/user-service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-add-employee',
  templateUrl: './admin-add-employee.component.html',
  styleUrls: ['./admin-add-employee.component.css']
})
export class AdminAddEmployeeComponent implements OnInit {

  addGroup: FormGroup;
  permissions: string[] = [];

  departments: DeparmentShort[] = [];
  errorMessage: string = ''
  successMessage: string = ''
  selectedDepartment: DeparmentShort = new DeparmentShort();

  emailErrorMessage: string = '';

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

    this.addGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      JMBG: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      department: [new DeparmentShort(), [Validators.required]],
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

    });
    
  }

  ibisEmailValidator(control: FormControl) {
    const email = control.value;
    const isIbisEmail = email.endsWith('@ibis.rs');
    return isIbisEmail ? null : { ibisEmail: true };
  }

  ngOnInit(): void {
      this.getDepartments();
  }

  getDepartments(){
      this.userService.getDepartments().subscribe(res=>{
          this.departments = res;
      });
  }

  addEmployee(){
    const employee = this.addGroup.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    this.checkEmailError();
    form.classList.add('was-validated');
    if(form.checkValidity() === false){
        return;
    }

    form.classList.add('was-validated');

    if(this.addGroup.get('ADMIN')?.value){
      this.permissions.push('ADMIN')
    }
    if(this.addGroup.get('DR_SPEC_DEPARTMENT')?.value){
      this.permissions.push('DR_SPEC_ODELJENJA')
    }
    if(this.addGroup.get('RECEPTIONIST')?.value){
      this.permissions.push('RECEPTIONIST')
    }
    if(this.addGroup.get('DR_SPEC')?.value){
      this.permissions.push('DR_SPEC')
    }
    if(this.addGroup.get('DR_SPEC_POV')?.value){
      this.permissions.push('DR_SPEC_POV')
    }
    if(this.addGroup.get('NURSE')?.value){
      this.permissions.push('NURSE')
    }
    if(this.addGroup.get('SENIOR_NURSE')?.value){
      this.permissions.push('SENIOR_NURSE')
    }
    if(this.addGroup.get('SENIOR_LAB_TECHNICIAN')?.value){
      this.permissions.push('SENIOR_LAB_TECHNICIAN')
    }
    if(this.addGroup.get('LAB_TECHNICIAN')?.value){
      this.permissions.push('LAB_TECHNICIAN')
    }
    if(this.addGroup.get('MED_BIOCHEMIST')?.value){
      this.permissions.push('MED_BIOCHEMIST')
    }
    if(this.addGroup.get('SPECIALIST_MED_BIOCHEMIST')?.value){
      this.permissions.push('SPECIALIST_MED_BIOCHEMIST')
    }

    if(this.permissions.length == 0){
      this.errorMessage = 'Izaberite barem 1 privilegiju!';
      setTimeout(() => {
        this.errorMessage = ''
      }, 3000);
      return;
    }
    let gender = employee.gender
    let genderValue =  gender ? 'female' : 'male'
    this.userService.addEmployee(employee.name, employee.lastName, employee.date, genderValue, employee.JMBG, employee.adress, employee.city,
    employee.phoneNumber, employee.email, employee.title, employee.profession, this.selectedDepartment.pbo, this.permissions).subscribe((response) => {

      this.errorMessage = '';
      this.successMessage = 'Uspesno dodat korisnik!'
    }, error => {
        console.log("Error " + error.status);
        if(error.status == 409){
            this.errorMessage = 'Email je zauzet!';
        }
    })

  }

  checkEmailError(){
    if(!(<string>this.addGroup.get('email')?.value).endsWith("@ibis.rs")){
      this.emailErrorMessage = "Email mora da bude na domenu @ibis.rs";
    }
    else{
      this.emailErrorMessage = "Email greska";
    }
  }

}
