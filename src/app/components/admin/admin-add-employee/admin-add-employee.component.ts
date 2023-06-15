import { Component, OnInit } from '@angular/core';
import { DeparmentShort, Zaposleni } from "../../../models/models";
import { UserService } from "../../../services/user-service/user.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';

@Component({
    selector: 'app-admin-add-employee',
    templateUrl: './admin-add-employee.component.html',
    styleUrls: ['./admin-add-employee.component.css']
})
export class AdminAddEmployeeComponent implements OnInit {

    addGroup: FormGroup;
    permissions: string[] = [];

    initialFormValues: any;

    successMessage: string = ''
    errorMessage: string = ''
    emailErrorMessage: string = '';

    departments: DeparmentShort[] = [];
    selectedDepartment: DeparmentShort = new DeparmentShort();

    constructor(private userService: UserService, private formBuilder: FormBuilder, private snackBar: SnackbarServiceService) {
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
            DR_SPEC_ODELJENJA: '',
            DR_SPEC: '',
            DR_SPEC_POV: '',
            VISA_MED_SESTRA: '',
            MED_SESTRA: '',
            VISI_LAB_TEHNICAR: '',
            LAB_TEHNICAR: '',
            MED_BIOHEMICAR: '',
            SPEC_MED_BIOHEMIJE: ''
        });
    }

    ngOnInit(): void {
      // Store initial form values
      this.initialFormValues = this.addGroup.getRawValue();

      this.getDepartments();
    }

    getDepartments(): void {
        this.userService.getDepartments().subscribe(res => {
            this.departments = res;
        });
    }

    addEmployee(): void {
        // if (!this.validateEntries())
        //     return;
        if (!this.populateAndValidatePermissions())
            return;

        const employee = this.addGroup.value
        let genderValue = employee.gender ? 'female' : 'male'

        this.userService.addEmployee(employee.name, employee.lastName, employee.date, genderValue, employee.JMBG, employee.adress, employee.city,
            employee.phoneNumber, employee.email, employee.title, employee.profession, employee.department, this.permissions).subscribe((response) => {

                // this.errorMessage = '';
                // this.successMessage = 'Uspesno dodat korisnik!'
                this.snackBar.openSuccessSnackBar("Korisnik uspesno dodat!")

          // Reset the form
          this.addGroup.reset();

          // Update form controls with initial values
          Object.keys(this.addGroup.controls).forEach((controlName) => {
            const control = this.addGroup.get(controlName);
            const initialValue = this.initialFormValues[controlName];
            // @ts-ignore
            control.setValue(initialValue);
            // @ts-ignore
            control.markAsPristine();
          });

          this.permissions = []



            }, error => {
                console.log("Error " + error.status);
                if (error.status == 409) {
                    this.errorMessage = 'Email je zauzet!';
                  this.snackBar.openWarningSnackBar("Email je zauzet!")
                }else{
                  this.snackBar.openErrorSnackBar("Popunite polja ispravno!")
                }
            })
    }

    /**
     * Print error message if input email is not in @ibis domain
     */
    checkEmailError(): void {
            // this.emailErrorMessage = "Email greska";
            this.snackBar.openErrorSnackBar("Pogresan format maila")

    }

    /**
     * Validates every html input
     * @returns true if every input is filled in correctly
     */

    validateEntries() : boolean {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        // this.checkEmailError();
        form.classList.add('was-validated');
        console.log("LALALALLA " + form.checkValidity().valueOf())
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
        if (this.addGroup.get('ADMIN')?.value) {
            this.permissions.push('ROLE_ADMIN')
        }
        if (this.addGroup.get('DR_SPEC_ODELJENJA')?.value) {
            this.permissions.push('ROLE_DR_SPEC_ODELJENJA')
        }

        if (this.addGroup.get('DR_SPEC')?.value) {
            this.permissions.push('ROLE_DR_SPEC')
        }
        if (this.addGroup.get('DR_SPEC_POV')?.value) {
            this.permissions.push('ROLE_DR_SPEC_POV')
        }
        if (this.addGroup.get('MED_SESTRA')?.value) {
            this.permissions.push('ROLE_MED_SESTRA')
        }
        if (this.addGroup.get('VISA_MED_SESTRA')?.value) {
            this.permissions.push('ROLE_VISA_MED_SESTRA')
        }
        if (this.addGroup.get('VISI_LAB_TEHNICAR')?.value) {
            this.permissions.push('ROLE_VISI_LAB_TEHNICAR')
        }
        if (this.addGroup.get('LAB_TECHNICAR')?.value) {
            this.permissions.push('ROLE_LAB_TEHNICAR')
        }
        if (this.addGroup.get('MED_BIOHEMICAR')?.value) {
            this.permissions.push('ROLE_MED_BIOHEMICAR')
        }
        if (this.addGroup.get('SPEC_MED_BIOHEMIJE')?.value) {
            this.permissions.push('ROLE_SPEC_MED_BIOHEMIJE')
        }

        if (this.permissions.length == 0) {
            this.errorMessage = 'Izaberite barem 1 privilegiju!';
            setTimeout(() => {
                this.errorMessage = ''
            }, 3000);
            return false;
        }
        return true;
    }

}
