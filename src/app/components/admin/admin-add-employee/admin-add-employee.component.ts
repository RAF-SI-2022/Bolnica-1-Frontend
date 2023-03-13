import {Component, OnInit} from '@angular/core';
import {Zaposleni} from "../../../models/models";
import {UserService} from "../../../services/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-add-employee',
  templateUrl: './admin-add-employee.component.html',
  styleUrls: ['./admin-add-employee.component.css']
})
export class AdminAddEmployeeComponent implements OnInit {


  addGroup: FormGroup;
  permissions: string[] = [];


  errorMessage: string = ''
  successMessage: string = ''


  constructor(private userService: UserService, private formBuilder: FormBuilder,) {

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
      department: ['', [Validators.required]],
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
  }

  addEmployee(){
    const employee = this.addGroup.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if(form.checkValidity() === false){
    }
    form.classList.add('was-validated');
    if(this.addGroup.get('ADMIN')?.value){
      this.permissions.push('ADMIN')
    }
    if(this.addGroup.get('DR_SPEC_DEPARTMENT')?.value){
      this.permissions.push('DR_SPEC_ODELJENJA')
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

    // @ts-ignore
    let gender = employee.gender
    let genderValue =  gender ? 'female' : 'male'
    this.userService.addEmployee(employee.name, employee.lastName, employee.date, genderValue, employee.JMBG, employee.adress, employee.city,
    employee.phoneNumber, employee.email, employee.title, employee.profession, employee.department, this.permissions).subscribe((response) => {

      this.errorMessage = ''
      this.successMessage = 'Uspesno dodavanje'

    }, error => {
      this.successMessage = ''
      this.errorMessage = 'Zahtev neuspesan'

    })

  }



}
