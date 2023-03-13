import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from "../services/user-service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  toggleSb: boolean = true;
  title = 'IBIS';
  isLoggedIn: boolean = false;
  constructor(private userService: UserService, private authService: AuthService) { }

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
  }

  isLogged(): boolean {
    console.log("BAJOO");
    return this.authService.isLoggedIn();
  }
}
