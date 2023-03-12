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
  loginForm: FormGroup


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.formBuilder.group(
      {username: ['', [Validators.required]],
      password: ['', [Validators.required]],})
  }

  ngOnInit(): void {
  }

  logIn(): void {
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
      localStorage.setItem('username', decodedToken.username); // ne treba
      localStorage.setItem('LBZ', decodedToken.lbz); // cuva ovo
      console.log("LBZZZZ + " + localStorage.getItem('LBZ'))
      localStorage.setItem('PBO', decodedToken.PBO); // cuva ovo


      if (this.userService.checkAdmin()) this.router.navigate(['/admin-workspace']);
      // else if (this.userService.checkDrSpec() || this.userService.checkDrSpecPov()
      //   || this.userService.checkDrSpecOdeljenja()) this.router.navigate(['/doctor-workspace']);
      // else if (this.userService.checkMedSestra() || this.userService.checkVisaMedSestra())
      //   this.router.navigate(['/nurse-workspace']);

    }, err => {
     console.log(err);

      //switch za razlicite poruke ili name

    })
  }

}
