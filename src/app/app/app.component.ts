import { Component, ElementRef, ViewChild } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from "../services/user-service/user.service";
import {AdminPromeniZaposlenog, Zaposleni} from "../models/models";

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
  
    constructor(private userService: UserService, private authService: AuthService, private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.checkRoles();
        }
      });
    }
  
    ngOnInit(): void {
      this.isLoggedIn = this.isLogged();
    }
  
    toggleSidebar(): void {
      this.toggleSb = !this.toggleSb;
    }
  
    checkRoles(): void {
      this.admin = this.checkRole('ROLE_ADMIN');
      this.doctorSpecOdeljenja = this.checkRole('ROLE_DR_SPEC_ODELJENJA');
      this.doctorSpec = this.checkRole('ROLE_DR_SPEC');
      this.doctorSpecPov = this.checkRole('ROLE_DR_SPEC_POV');
      this.nurse = this.checkRole('ROLE_MED_SESTRA');
      this.nurseVisa = this.checkRole('ROLE_VISA_MED_SESTRA');
      this.technicianVisi = this.checkRole('ROLE_VISI_LAB_TEHNICAR');
      this.technician = this.checkRole('ROLE_LAB_TEHNICAR');
      this.biochemist = this.checkRole('ROLE_MED_BIOHEMICAR');
      this.biochemistSpec = this.checkRole('ROLE_SPEC_MED_BIOHEMIJE');
    }
  
    checkRole(role: string): boolean {
      let hasRole = false;
      this.userService.checkRole(role).subscribe(result => {
        hasRole = result;
      });
      return hasRole;
    }
  
    logout() {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  
    isLogged(): boolean {
      return this.authService.isLoggedIn();
    }
  
    getFullName() {
      return localStorage.getItem('username');
    }
}
