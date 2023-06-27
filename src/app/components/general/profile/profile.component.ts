import { Component, OnInit } from '@angular/core';
import { AdminPromeniZaposlenog, DeparmentShort, Uloga, UlogaShort, UlogeZaposlenog, Zaposleni } from "../../../models/models";
import { UserService } from "../../../services/user-service/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { interval } from 'rxjs';

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

    constructor(private userService: UserService, private snackBar: SnackbarServiceService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.userForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            gender: false,
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
            DR_SPEC_ODELJENJA: '',
            DR_SPEC: '',
            DR_SPEC_POV: '',
            VISA_MED_SESTRA: '',
            MED_SESTRA: '',
            VISI_LAB_TEHNICAR: '',
            LAB_TEHNICAR: '',
            MED_BIOHEMICAR: '',
            SPEC_MED_BIOHEMIJE: ''
        })

        this.userPermissionDisplayed = new UlogeZaposlenog();
        this.userEdit = new AdminPromeniZaposlenog();
        this.userPermissions = [];
        this.departments = [];
    }

    ngOnInit(): void {
        this.disableUserFormFields();
        console.log("[Debug]: LBZ " + localStorage.getItem("LBZ")!);
        this.getUser(localStorage.getItem("LBZ")!);
        //interval(5000).subscribe(() => {
            this.updateData();
          //});
    }

    updateData(){
        this.getUserPermissions();
        this.getDepartments();
    }
    getDepartments(): void {
        this.userService.getDepartments().subscribe(result => {
            this.departments = result;
        }, err => { });
    }

    getUser(LBZ: string): void {
        this.userService.getEmployee(LBZ).subscribe(result => { },
            err => {
                if (err.status == 302) { // found!
                    this.userEdit = err.error;
                    this.department = this.userEdit.department.pbo
                    this.userForm.get('gender')?.setValue(this.userEdit.gender == 'true' ? true : false);
                }
            })
    }

    getUserPermissions(): void {
        this.userService.getUserRoles().subscribe(result => {
            this.userPermissions = <Uloga[]><unknown>result;
            this.fillPagePermissions();
        }, err => {
            console.log("Error: " + err.error);
        });
    }

    status: boolean = false;

    updateUser(): void {
        if (!this.status) {
            this.enableUserFormFields();
            this.disabledValue = false
        }
        else {
            this.disableUserFormFields();
            this.disabledValue = true;
        }

        this.status = !this.status;
    }

    fillPagePermissions(): void {
        for (let p of this.userPermissions) {
            if (p.shortName == 'ROLE_ADMIN')
                this.userPermissionDisplayed.admin = true;
            else if (p.shortName == 'ROLE_DR_SPEC_ODELJENJA')
                this.userPermissionDisplayed.dr_spec_odeljenja = true;
            else if (p.shortName == 'ROLE_DR_SPEC')
                this.userPermissionDisplayed.dr_spec = true;
            else if (p.shortName == 'ROLE_DR_SPEC_POV')
                this.userPermissionDisplayed.dr_spec_pov = true;
            else if (p.shortName == 'ROLE_MED_SESTRA')
                this.userPermissionDisplayed.med_sestra = true;
            else if (p.shortName == 'ROLE_VISA_MED_SESTRA')
                this.userPermissionDisplayed.visa_med_sestra = true;
            else if (p.shortName == 'ROLE_VISI_LAB_TEHNICAR')
                this.userPermissionDisplayed.visi_lab_tehnicar = true;
            else if (p.shortName == 'ROLE_LAB_TEHNICAR')
                this.userPermissionDisplayed.lab_tehnicar = true;
            else if (p.shortName == 'ROLE_MED_BIOHEMICAR')
                this.userPermissionDisplayed.med_biohemicar = true;
            else if (p.shortName == 'ROLE_SPEC_MED_BIOHEMIJE')
                this.userPermissionDisplayed.spec_med_biohemije = true;
            console.log(p)
        }
    }

    saveUser(): void {
        if (!this.validateFields())
            return;
        if (!this.populateAndValidatePermissions())
            return;

        console.log("uloge " + this.permissionsList)

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
            // console.log("[Debug]: USPEH " + response.name);
            // this.errorMessage = '';
            // this.showSuccessMessage("Uspesno sacuvan korisnik!");
            this.snackBar.openSuccessSnackBar("Uspesno sacuvan korisnik!")
        }, err => {
            // this.errorMessage = "Mejl mora biti na domenu @ibis.rs";
            this.snackBar.openErrorSnackBar("Korisnik nije sacuvan!")
        })

        this.permissionsList = [];
        console.log("uloge prazne" + this.permissionsList)
    }

    clickEvent(): void {
        this.status = !this.status;
    }

    canUpdate(): boolean {
        if (this.userService.checkRole('ROLE_ADMIN')) {
            return true;
        }
        return false;
    }

    goToResetPassword(): void {
        this.router.navigate(['/new-password']);
    }

    onSelectionChange(event: any): void {
        const id = event.target.options[event.target.selectedIndex].getAttribute('data-id');
        this.department = id;
    }

    /**
     * Shows success message on screen
     * @param message Success message to show
     */
    showSuccessMessage(message: string): void {
        this.successMessage = message;
        setTimeout(() => {
            this.successMessage = '';
        }, 3000);
    }

    validateFields(): boolean {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
            return false;
        }
        return true;
    }

    disableUserFormFields(): void {
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
    }

    enableUserFormFields(): void {
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
    }

    populateAndValidatePermissions(): boolean {
        if (this.userPermissionDisplayed.admin == true) this.permissionsList.push('ROLE_ADMIN');
        if (this.userPermissionDisplayed.dr_spec == true) this.permissionsList.push('ROLE_DR_SPEC');
        if (this.userPermissionDisplayed.dr_spec_pov == true) this.permissionsList.push('ROLE_DR_SPEC_POV');
        if (this.userPermissionDisplayed.med_sestra == true) this.permissionsList.push('ROLE_MED_SESTRA');
        if (this.userPermissionDisplayed.visa_med_sestra == true) this.permissionsList.push('ROLE_VISA_MED_SESTRA');
        if (this.userPermissionDisplayed.med_biohemicar == true) this.permissionsList.push('ROLE_MED_BIOHEMICAR');
        if (this.userPermissionDisplayed.spec_med_biohemije == true) this.permissionsList.push('ROLE_SPEC_MED_BIOHEMIJE');
        if (this.userPermissionDisplayed.visi_lab_tehnicar == true) this.permissionsList.push('ROLE_VISI_LAB_TEHNICAR');
        if (this.userPermissionDisplayed.lab_tehnicar == true) this.permissionsList.push('ROLE_LAB_TEHNICAR');
        if (this.userPermissionDisplayed.dr_spec_odeljenja == true) this.permissionsList.push('ROLE_DR_SPEC_ODELJENJA');
        if (this.permissionsList.length == 0) {
            // this.errorMessage = 'Izaberi barem jednu privilegiju!';
            this.snackBar.openErrorSnackBar("Izaberi bar 1 privilegiju!")
            return false;
        }
        return true;
    }
}
