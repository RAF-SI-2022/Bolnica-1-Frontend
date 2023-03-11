import { Component, ElementRef, ViewChild } from '@angular/core';
import {UserService} from "../services/user-service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  toggleSb: boolean = true;
  title = 'Bolnica-1-Frontend';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
}

  toggleSidebar(){
      this.toggleSb = !this.toggleSb;
  }

  canAddEmployee(): boolean{

    if(this.userService.checkAdmin()){
      return true
    }
    return false

  }

}
