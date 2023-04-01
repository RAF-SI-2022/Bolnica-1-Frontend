import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user-service/user.service";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Zaposleni} from "../../../models/models";

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
    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })
    this.employee = new Zaposleni()

  }

  ngOnInit(): void { }

  setUsername(){
    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ').toString()
    this.userService.getEmployee(this.lbz).subscribe(result => {
    }, err => {
      if (err.status == 302) { // found!
        this.employee = err.error; // citanje poruka je sa err.errors TO JE BODY-PORUKA
        localStorage.setItem('username', this.employee.username);

      }
    })

    return this.employee.username

  }
  logIn(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    if (this.username.length == 0 || this.password.length == 0) {
      form.classList.add('was-validated');
      return;
    }

  console.log("oksi");
    this.userService.login({
      username: this.username,
      password: this.password
    }).subscribe(response => {

      localStorage.setItem('token', response.message);
      console.log("res " + response.message)
      this.userService.token = response.message;
      const decodedToken = new JwtHelperService().decodeToken(response.message);

      localStorage.setItem('LBZ', decodedToken.sub);
      this.setUsername()
      localStorage.setItem('PBO', decodedToken.pbo);
      localStorage.setItem('ID', decodedToken.id)
      console.log("ADMIN SAMss " + decodedToken.sub);

      this.userService.checkRole('ROLE_ADMIN').subscribe(hasRole => {
        if (hasRole) {
          console.log("ima admin")
          this.router.navigate(['/admin-workspace']);
        }
        else {
          console.log("nema rolu admin")
          this.userService.checkRole('ROLE_DR_SPEC').subscribe(hasDrSpecRole => {
            if (hasDrSpecRole) {
              console.log("ima rolu dr spec")
              this.router.navigate(['/doctor-workspace']);
            }
            else {
              this.userService.checkRole('ROLE_DR_SPEC_POV').subscribe(hasDrSpecPovRole => {
                if (hasDrSpecPovRole) {
                  console.log("ima rolu dr spec pov")
                  this.router.navigate(['/doctor-workspace']);
                }
                else {
                  this.userService.checkRole('ROLE_DR_SPEC_ODELJENJA').subscribe(hasDrSpecOdeRole => {
                    if (hasDrSpecOdeRole) {
                      this.router.navigate(['/doctor-workspace']);
                    }
                    else {
                      this.userService.checkRole('ROLE_MED_SESTRA').subscribe(hasMedSesRole => {
                        if (hasMedSesRole) {
                          this.router.navigate(['/nurse-workspace']);
                        }
                        else {
                          this.userService.checkRole('ROLE_VISA_MED_SESTRA').subscribe(hasVisaMedSesRole => {
                            if (hasVisaMedSesRole) {
                              this.router.navigate(['/nurse-workspace']);
                            }
                            else {

                              this.userService.checkRole('ROLE_VISI_LAB_TEHNICAR').subscribe(hasVisaMedSesRole => {
                                if (hasVisaMedSesRole) {
                                  this.router.navigate(['/technician-workspace']);
                                }
                                else {
                                  this.userService.checkRole('ROLE_LAB_TEHNICAR').subscribe(hasVisaMedSesRole => {
                                    if (hasVisaMedSesRole) {
                                      this.router.navigate(['/technician-workspace']);
                                    }
                                    else {

                                      this.userService.checkRole('ROLE_MED_BIOHEMICAR').subscribe(hasVisaMedSesRole => {
                                        if (hasVisaMedSesRole) {
                                          this.router.navigate(['/biochemist-workspace']);
                                        }
                                        else {

                                          this.userService.checkRole('ROLE_SPEC_MED_BIOHEMIJE').subscribe(hasVisaMedSesRole => {
                                            if (hasVisaMedSesRole) {
                                              this.router.navigate(['/biochemist-workspace']);
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
                    }
                  });
                }
              });
            }
          });
        }
      },msg => {
        console.log("nema rolu admin")
        console.log(msg)
      });
    }, err => {
      console.log(err);
        this.showError = true;
    })
  }



}
