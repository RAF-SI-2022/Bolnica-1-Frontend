import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  
  isLoggedIn(): boolean{
      let token = localStorage.getItem("token");
      return !(token == null || token == '');
  }

  getLBZ(): string{
    return localStorage.getItem("LBZ")!;
  }
  
  resetPassword(){
      let lbz = 'test';
      return this.http.put(`${environment.apiURL}/employee/reset/${lbz}`, {headers: this.getHeaders()});
  }
  
  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  }
}
