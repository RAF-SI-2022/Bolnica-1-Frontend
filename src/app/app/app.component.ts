import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from "../services/user-service/user.service";
import {AdminPromeniZaposlenog, Zaposleni} from "../models/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  toggleSb: boolean = true;
  title = 'IBIS';
  isLoggedIn: boolean = false;
  employee: Zaposleni;
  lbz: string = '';
  flag: boolean = true

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.employee = new Zaposleni()
  }


  ngOnInit(): void {
      this.isLoggedIn = this.isLogged();
  }

  toggleSidebar() {
    this.toggleSb = !this.toggleSb;
  }
  //todo proveri ovo
  canAddEmployee(): boolean {
    //
    //   if(this.userService.checkAdmin()){
    //     return true
    //   }
    return true
    //
    //
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

    getFullName() {

      return localStorage.getItem('username')
    }

}
