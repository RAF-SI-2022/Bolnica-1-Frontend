    import { Component, OnInit } from '@angular/core';
    import { UserService } from "../../../services/user-service/user.service";
    import { AdminPromeniZaposlenog, DeparmentShort, Uloga, UlogeZaposlenog, Zaposleni } from "../../../models/models";
    import { FormBuilder, FormGroup, Validators } from "@angular/forms";
    import { ActivatedRoute } from "@angular/router";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { interval } from 'rxjs';

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

    constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: SnackbarServiceService ,private route: ActivatedRoute) {
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
        this.userEdit = new AdminPromeniZaposlenog();
        this.userPermissionDisplayed = new UlogeZaposlenog();
        this.userPermissions = [];
        this.departments = [];
    }

    ngOnInit(): void {
        this.lbz = <string>this.route.snapshot.paramMap.get('lbz');
        this.getUser(this.lbz);
        this.getUserPermissions(this.lbz);
        //interval(5000).subscribe(() => {
            this.getDepartments();
          //});
    }

    getDepartments(): void {
        this.userService.getDepartments().subscribe(result => {
        this.departments = result;
        });
    }

    /**
     * Display user permissions on page
     */
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

    getUser(LBZ: string): void {
        this.userService.getUser(LBZ).subscribe(result => {
        }, err => {
            if (err.status == 302) { // found!
                this.userEdit = err.error; // Message recieved on error -> err.error to get message
                this.department = this.userEdit.department.pbo
                this.editGroup.get('gender')?.setValue(this.userEdit.gender.toLowerCase() === 'female');
            }
        });
    }

    getUserPermissions(lbz:string){
        this.userService.getUserPermissions(lbz).subscribe(result => {
        this.userPermissions = result;
        this.fillPagePermissions();
        }, err => {
            console.log("[Debug] Error message: " + err.error);
        });
    }

    editEmployee(): void {
        if(!this.validateEntries())
            return;
        if(!this.prepareAndValidatePermissionOutputString())
            return;

        this.userService.editEmployee(this.lbz, this.editGroup.get('name')?.value, this.editGroup.get('lastName')?.value,
            this.editGroup.get('date')?.value, this.editGroup.get('gender')?.value, this.editGroup.get('JMBG')?.value,
            this.editGroup.get('adress')?.value,
            this.editGroup.get('city')?.value, this.editGroup.get('phoneNumber')?.value, this.editGroup.get('email')?.value,
            this.editGroup.get('username')?.value, this.editGroup.get('password')?.value, this.editGroup.get('deleted')?.value , this.editGroup.get('title')?.value,
            this.editGroup.get('profession')?.value, this.department, this.permissions).subscribe((response) => {
            // this.showSuccessMessage("Uspesno sacuvan korisnik!")
            this.snackBar.openSuccessSnackBar("Uspesno sacuvan korisnik");
        }, error => {
            // this.errorMessage = 'Mejl mora biti unikat sadrzati bar 5 slova i biti na domenu @ibis.rs';
            this.snackBar.openErrorSnackBar("Mejl mora biti unikat i duzine makar 5 karaktera")
        })
    }

    /**
    * Populates editGroup and validates it.
    * @returns true if user has chosen one or more permissions
    */
    prepareAndValidatePermissionOutputString(): boolean {

        if (this.editGroup.get('ADMIN')?.value) {
            this.permissions.push('ROLE_ADMIN')
        }
        if (this.editGroup.get('DR_SPEC_ODELJENJA')?.value) {
            this.permissions.push('ROLE_DR_SPEC_ODELJENJA')
        }
        if (this.editGroup.get('DR_SPEC')?.value) {
            this.permissions.push('ROLE_DR_SPEC')
        }
        if (this.editGroup.get('DR_SPEC_POV')?.value) {
            this.permissions.push('ROLE_DR_SPEC_POV')
        }
        if (this.editGroup.get('MED_SESTRA')?.value) {
             this.permissions.push('ROLE_MED_SESTRA')
        }
        if (this.editGroup.get('VISA_MED_SESTRA')?.value) {
          this.permissions.push('ROLE_VISA_MED_SESTRA')
        }
        if (this.editGroup.get('VISI_LAB_TEHNICAR')?.value) {
          this.permissions.push('ROLE_VISI_LAB_TEHNICAR')
        }
        if (this.editGroup.get('LAB_TEHNICAR')?.value) {
          this.permissions.push('ROLE_LAB_TEHNICAR')
        }
        if (this.editGroup.get('MED_BIOHEMICAR')?.value) {
          this.permissions.push('ROLE_MED_BIOHEMICAR')
        }
        if (this.editGroup.get('SPEC_MED_BIOHEMIJE')?.value) {
          this.permissions.push('ROLE_SPEC_MED_BIOHEMIJE')
        }
        if (this.permissions.length == 0) {
            this.errorMessage = 'Izaberi barem jednu privilegiju!';
            return false;
        }

        return true;
    }

    /**
     * Shows success message on screen
     * @param message Success message to show
     */
    showSuccessMessage(message: string): void {
        this.errorMessage = '';
        this.successMessage = message;
        setTimeout(() => {
            this.successMessage = '';
        }, 3000);
    }

    onSelectionChange(event: any): void {
        const id = event.target.options[event.target.selectedIndex].getAttribute('data-id');
        this.department = id;
    }

    /**
     * Validates every html input
     * @returns true if every input is filled in correctly
     */
    validateEntries(): boolean {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        form.classList.add('was-validated');

        if(form.checkValidity() === false){
            return false;
        }

        return true;
    }
}
