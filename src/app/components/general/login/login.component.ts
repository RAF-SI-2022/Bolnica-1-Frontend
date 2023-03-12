import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if(form.checkValidity() === false){
    }

    form.classList.add('was-validated');
    
    this.userService.login({
      username: this.username,
      password: this.password
    }).subscribe(response => {
      
      localStorage.setItem('token', response.message);
      this.userService.token = response.message;
      const helper = new JwtHelperService();
      
      const decodedToken = helper.decodeToken(response.message);

      /* Cuvati i username */
      // localStorage cuvati i username
      localStorage.setItem('name', decodedToken.name); // ne treba
      localStorage.setItem('lastName', decodedToken.lastName); // ne treba
      localStorage.setItem('title', decodedToken.title); // ne treba
      localStorage.setItem('job', decodedToken.job); // ne treba
      localStorage.setItem('LBZ', decodedToken.LBZ); // cuva ovo
      localStorage.setItem('PBO', decodedToken.PBO); // cuva ovo
      localStorage.setItem('department', decodedToken.department); // ne treba
      localStorage.setItem('hospital', decodedToken.hospital); // ne treba
      localStorage.setItem('privilege', decodedToken.privilege); // ne treba

      if (this.userService.checkAdmin()) this.router.navigate(['/admin-workspace']);
      else if (this.userService.checkDrSpec() || this.userService.checkDrSpecPov()
        || this.userService.checkDrSpecOdeljenja()) this.router.navigate(['/doctor-workspace']);
      else if (this.userService.checkMedSestra() || this.userService.checkVisaMedSestra())
        this.router.navigate(['/nurse-workspace']);

    }, err => {
     console.log(err);
    
      //switch za razlicite poruke ili name

    })
  }

}
