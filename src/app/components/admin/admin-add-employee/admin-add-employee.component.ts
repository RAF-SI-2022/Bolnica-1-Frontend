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

    successMessage: string = ''
    errorMessage: string = ''
    emailErrorMessage: string = '';

    departments: DeparmentShort[] = [];
    selectedDepartment: DeparmentShort = new DeparmentShort();

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

    ngOnInit(): void {
        this.getDepartments();
    }

    getDepartments(): void {
        this.userService.getDepartments().subscribe(res=>{
            this.departments = res;
        });
    }

    addEmployee(): void {
        if(!this.validateEntries())
        return;
        if(!this.populateAndValidatePermissions())
        return;

        const employee = this.addGroup.value
        let genderValue =  employee.gender ? 'female' : 'male'

        this.userService.addEmployee(employee.name, employee.lastName, employee.date, genderValue, employee.JMBG, employee.adress, employee.city,
        employee.phoneNumber, employee.email, employee.title, employee.profession, employee.department, this.permissions).subscribe((response) => {

        this.errorMessage = '';
        this.successMessage = 'Uspesno dodat korisnik!'
        }, error => {
            console.log("Error " + error.status);
            if(error.status == 409){
                this.errorMessage = 'Email je zauzet!';
            }
        })
    }

    /**
     * Print error message if input email is not in @ibis domain
     */
    checkEmailError(): void {
        if(!(<string>this.addGroup.get('email')?.value).endsWith("@ibis.rs")){
        this.emailErrorMessage = "Email mora da bude na domenu @ibis.rs";
        }
        else{
        this.emailErrorMessage = "Email greska";
        }
    }

    /**
     * Validates every html input
     * @returns true if every input is filled in correctly
     */
    validateEntries() : boolean {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        this.checkEmailError();
        form.classList.add('was-validated');

        if(form.checkValidity() === false){
            return false;
        }

        return true;
    }
    
   /**
    * Populates addGroup and validates it.
    * @returns true if user has chosen one or more permissions
    */
    populateAndValidatePermissions(): boolean {
        if(this.addGroup.get('ADMIN')?.value){
            this.permissions.push('ROLE_ADMIN')
        }
        if(this.addGroup.get('DR_SPEC_DEPARTMENT')?.value){
            this.permissions.push('ROLE_DR_SPEC_ODELJENJA')
        }
        if(this.addGroup.get('RECEPTIONIST')?.value){
            this.permissions.push('ROLE_RECEPTIONIST')
        }
        if(this.addGroup.get('DR_SPEC')?.value){
            this.permissions.push('ROLE_DR_SPEC')
        }
        if(this.addGroup.get('DR_SPEC_POV')?.value){
            this.permissions.push('ROLE_DR_SPEC_POV')
        }
        if(this.addGroup.get('NURSE')?.value){
            this.permissions.push('ROLE_MED_SESTRA')
        }
        if(this.addGroup.get('SENIOR_NURSE')?.value){
            this.permissions.push('ROLE_VISA_MED_SESTRA')
        }
        if(this.addGroup.get('SENIOR_LAB_TECHNICIAN')?.value){
            this.permissions.push('ROLE_SENIOR_LAB_TECHNICIAN')
        }
        if(this.addGroup.get('LAB_TECHNICIAN')?.value){
            this.permissions.push('ROLE_LAB_TECHNICIAN')
        }
        if(this.addGroup.get('MED_BIOCHEMIST')?.value){
            this.permissions.push('ROLE_MED_BIOCHEMIST')
        }
        if(this.addGroup.get('SPECIALIST_MED_BIOCHEMIST')?.value){
            this.permissions.push('ROLE_SPECIALIST_MED_BIOCHEMIST')
        }

        if(this.permissions.length == 0){
            this.errorMessage = 'Izaberite barem 1 privilegiju!';
            setTimeout(() => {
                this.errorMessage = ''
            }, 3000);
            return false;
        }
        return true;
    }

}
