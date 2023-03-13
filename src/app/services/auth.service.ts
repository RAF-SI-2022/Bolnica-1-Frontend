import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  
  isLoggedIn(): boolean{
      let token = localStorage.getItem("token");
      console.log("WOOOW " + token);
      return !(token == null || token == '');
  }

  getLBZ(): string{
    return localStorage.getItem("LBZ")!;
  }
  
}
