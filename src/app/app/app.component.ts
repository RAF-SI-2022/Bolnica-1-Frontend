import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from "../services/user-service/user.service";
import { AdminPromeniZaposlenog, Zaposleni } from "../models/models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    toggleSb = true;
    title = 'IBIS';
    isLoggedIn = false;
    admin = false;
    doctorSpec = false;
    doctorSpecOdeljenja = false;
    doctorSpecPov = false;
    nurse = false;
    nurseVisa = false;
    technician = false;
    technicianVisi = false;
    biochemist = false;
    biochemistSpec = false;
    receptionist = false;
    covid = false;

    constructor(private userService: UserService, private authService: AuthService, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {

                if (localStorage.getItem('token') != null) {
                    this.checkAdmin();
                    this.checkDoctorSpecOdeljenja();
                    this.checkDoctorSpec();
                    this.checkDoctorSpecPov();
                    this.checkMedSestra();
                    this.checkVisaMedSestra();
                    this.checkVisiLabTehnicar();
                    this.checkLabTehnicar();
                    this.checkMedBiohemicar();
                    this.checkSpecMedBiohemije();
                    this.checkReceptionist();
                    //DODATO:
                    this.checkCovid();
                }

            }
        });
    }

    ngOnInit(): void {
        this.isLoggedIn = this.isLogged();
    }

    toggleSidebar(): void {
        this.toggleSb = !this.toggleSb;
    }

    checkAdmin(): boolean {
        console.log("LOL");
        this.userService.checkRole('ROLE_ADMIN').subscribe(hasRole => {
            if (hasRole) {
                this.admin = true;
            }
            else this.admin = false;
        });
        return this.admin;
    }

    //DODATO:
    isCovid(): boolean {
        return this.covid;
    }

    checkDoctorSpecOdeljenja(): boolean {
        this.userService.checkRole('ROLE_DR_SPEC_ODELJENJA').subscribe(hasRole => {
            if (hasRole) {
                this.doctorSpecOdeljenja = true;
            }
            else this.doctorSpecOdeljenja = false;
        });
        return this.doctorSpecOdeljenja;
    }

    checkDoctorSpec(): boolean {
        this.userService.checkRole('ROLE_DR_SPEC').subscribe(hasRole => {
            if (hasRole) {
                this.doctorSpec = true;
            }
            else this.doctorSpec = false;
        });
        return this.doctorSpec;
    }

    checkDoctorSpecPov(): boolean {
        this.userService.checkRole('ROLE_DR_SPEC_POV').subscribe(hasRole => {
            if (hasRole) {
                this.doctorSpecPov = true;
            }
            else this.doctorSpecPov = false;
        });
        return this.doctorSpecPov;
    }

    checkMedSestra(): boolean {
        this.userService.checkRole('ROLE_MED_SESTRA').subscribe(hasRole => {
            if (hasRole) {
                this.nurse = true;
            }
            else this.nurse = false;
        });
        return this.nurse;
    }

    checkVisaMedSestra(): boolean {
        this.userService.checkRole('ROLE_VISA_MED_SESTRA').subscribe(hasRole => {
            if (hasRole) {
                this.nurseVisa = true;
            }
            else this.nurseVisa = false;
        });
        return this.nurseVisa;
    }

    checkVisiLabTehnicar(): boolean {
        this.userService.checkRole('ROLE_VISI_LAB_TEHNICAR').subscribe(hasRole => {
            if (hasRole) {
                this.technicianVisi = true;
            }
            else this.technicianVisi = false;
        });
        return this.technicianVisi;
    }

    checkLabTehnicar(): boolean {
        this.userService.checkRole('ROLE_LAB_TEHNICAR').subscribe(hasRole => {
            if (hasRole) {
                this.technician = true;
            }
            else this.technician = false;
        });
        return this.technician;
    }

    checkMedBiohemicar(): boolean {
        this.userService.checkRole('ROLE_MED_BIOHEMICAR').subscribe(hasRole => {
            if (hasRole) {
                this.biochemist = true;
            }
            else this.biochemist = false;
        });
        return this.biochemist;
    }

    checkSpecMedBiohemije(): boolean {
        this.userService.checkRole('ROLE_SPEC_MED_BIOHEMIJE').subscribe(hasRole => {
            if (hasRole) {
                this.biochemistSpec = true;
            }
            else this.biochemistSpec = false;
        });
        return this.biochemistSpec;
    }

    checkReceptionist(): boolean {
        console.log("receptioner lol");
        this.userService.checkRole('ROLE_RECEPCIONER').subscribe(hasRole => {
            if (hasRole) {
                this.receptionist = true;
            }
            else this.receptionist = false;
        });
        return this.receptionist;
    }

    // DODATO:
    checkCovid() {
        let lbz = localStorage.getItem('LBZ');
        this.userService.findDepartmentByLbz(lbz!).subscribe(
            res => {
                this.userService.getDepartmentDto(res).subscribe(
                    res2 =>{
                        if(res2.name == "Covid"){
                            this.covid = true;

                        }else{
                            this.covid = false;
                        }

                        localStorage.setItem('covid', String(this.covid));
                        console.log("kovid " + this.covid)
                        console.log("kovid iz storidza "+ localStorage.getItem('covid'))
                    }
                );
            }
        );
    }

    logout() {
        this.userService.logout();
        this.covid = false;
        this.router.navigate(['/login']);
    }

    isLogged(): boolean {
        return this.authService.isLoggedIn();
    }

    getFullName() {
        return localStorage.getItem('username');
    }
}
