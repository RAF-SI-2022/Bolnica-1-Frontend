import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user-service/user.service";
import { Router } from "@angular/router";
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
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })
  }

  ngOnInit(): void { }

  logIn(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');

    if (form.checkValidity() === false) {
      return;
    }

    this.userService.login({
      username: this.username,
      password: this.password
    }).subscribe(response => {

      localStorage.setItem('token', response.message);
      this.userService.token = response.message;
      const decodedToken = new JwtHelperService().decodeToken(response.message);

      localStorage.setItem('username', decodedToken.username);
      localStorage.setItem('LBZ', decodedToken.lbz);
      localStorage.setItem('PBO', decodedToken.pbo);
      console.log("ADMIN SAMss");

      this.userService.checkRole('ADMIN').subscribe(hasRole => {
        if (hasRole) {
          this.router.navigate(['/admin-workspace']);
        }
        else {
          this.userService.checkRole('DR_SPEC').subscribe(hasDrSpecRole => {
            if (hasDrSpecRole) {
              this.router.navigate(['/doctor-workspace']);
            }
            else {
              this.userService.checkRole('DR_SPEC_POV').subscribe(hasDrSpecPovRole => {
                if (hasDrSpecPovRole) {
                  this.router.navigate(['/doctor-workspace']);
                }
                else {
                  this.userService.checkRole('DR_SPEC_ODE').subscribe(hasDrSpecOdeRole => {
                    if (hasDrSpecOdeRole) {
                      this.router.navigate(['/doctor-workspace']);
                    }
                    else {
                      this.userService.checkRole('MED_SES').subscribe(hasMedSesRole => {
                        if (hasMedSesRole) {
                          this.router.navigate(['/nurse-workspace']);
                        }
                        else {
                          this.userService.checkRole('VISA_MED_SES').subscribe(hasVisaMedSesRole => {
                            if (hasVisaMedSesRole) {
                              this.router.navigate(['/nurse-workspace']);
                            }
                            else {
                              // Handle the case where the user has no roles
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }, err => {
      console.log(err);
      //switch za razlicite poruke ili name
    })
  }

}
