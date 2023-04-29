import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user-service/user.service";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Zaposleni } from "../../../models/models";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    loginForm: FormGroup
    showError: boolean = false;
    lbz: string = '';
    employee: Zaposleni;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        })

        this.employee = new Zaposleni()
    }

    ngOnInit(): void { }

    setUsername(): string {
        // @ts-ignore
        this.lbz = localStorage.getItem('LBZ').toString()
        this.userService.getEmployee(this.lbz).subscribe(result => {
        }, err => {
            if (err.status == 302) { // found!
                this.employee = err.error; // citanje poruka je sa err.errors TO JE BODY-PORUKA
                localStorage.setItem('username', this.employee.username);
            }
        })
        return this.employee.username;
    }

    logIn(): void {
        const form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

        if (this.username.length === 0 || this.password.length === 0) {
            form.classList.add('was-validated');
            return;
        }

        this.userService.login({ username: this.username, password: this.password }).subscribe(
            (response) => {
                localStorage.setItem('token', response.message);
                this.userService.token = response.message;
                const decodedToken = new JwtHelperService().decodeToken(response.message);

                localStorage.setItem('LBZ', decodedToken.sub);
                this.setUsername();
                localStorage.setItem('PBO', decodedToken.pbo);
                //localStorage.setItem('ID', decodedToken.id);

                this.navigateBasedOnRole();
                this.userService.getEmployee(this.lbz).subscribe(res => { },
                    err => {
                        if (err.status == 302) { // found!
                            localStorage.setItem('ID', err.error.id);


                        }
                    })

            },
            (err) => {
                console.log(err);
                this.showError = true;
            }
        );
    }

    navigateBasedOnRole(): void {
        const roles = [
            { role: 'ROLE_ADMIN', path: '/admin-workspace' },
            { role: 'ROLE_DR_SPEC', path: '/doctor-workspace' },
            { role: 'ROLE_DR_SPEC_POV', path: '/doctor-workspace' },
            { role: 'ROLE_DR_SPEC_ODELJENJA', path: '/doctor-workspace' },
            { role: 'ROLE_MED_SESTRA', path: '/nurse-workspace' },
            { role: 'ROLE_VISA_MED_SESTRA', path: '/nurse-workspace' },
            { role: 'ROLE_VISI_LAB_TEHNICAR', path: '/technician-workspace' },
            { role: 'ROLE_LAB_TEHNICAR', path: '/technician-workspace' },
            { role: 'ROLE_MED_BIOHEMICAR', path: '/biochemist-workspace' },
            { role: 'ROLE_SPEC_MED_BIOHEMIJE', path: '/biochemist-daily' },
        ];

        this.checkRolesAndNavigate(roles);
    }

    checkRolesAndNavigate(roles: { role: string; path: string }[], index: number = 0): void {
        if (index >= roles.length) {
            // Handle the case where the user has no roles
            return;
        }

        this.userService.checkRole(roles[index].role).subscribe((hasRole) => {
            if (hasRole) {
                this.router.navigate([roles[index].path]);
            } else {
                this.checkRolesAndNavigate(roles, index + 1);
            }
        });
    }
}
