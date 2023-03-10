import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginResponse} from "../../models/LoginResponse";
import {ResetPasswordResponse} from "../../models/ResetPasswordResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: string = '';
 // public lbz: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    console.log(this.token);
  }

  login(formData: { username: string; password: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:8080/auth/login`, {
      username: formData.username, password:formData.password
    });
  }

  resetPassword(formData: { email: string;
  }): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>(`http://localhost:8080/emp/pr `, {
      email: formData.email
    });
  }


  checkAdmin(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
            if (item.toUpperCase() == 'ADMIN') return true;
          }
    }
    return false;
  }

  checkDrSpecOdeljenja(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'DR_SPEC_ODELJENJA') return true;
      }
    }
    return false;
  }

  checkDrSpec(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'DR_SPEC') return true;
      }
    }
    return false;
  }

  checkDrSpecPov(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'DR_SPEC_POV') return true;
      }
    }
    return false;
  }

  checkMedSestra(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'MED_SESTRA') return true;
      }
    }
    return false;
  }

  checkVisaMedSestra(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'VISA_MED_SESTRA') return true;
      }
    }
    return false;
  }


}
