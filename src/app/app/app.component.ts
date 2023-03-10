import { Component } from '@angular/core';
import {UserService} from "../services/user-service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bolnica-1-Frontend';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
      
  }
}
