import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeMessageDTO, PasswordResetDTO } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  isLoggedIn(): boolean {
    let token = localStorage.getItem("token");
    return !(token == null || token == '');
  }

  getLBZ(): string {
    return localStorage.getItem("LBZ")!;
  }

  resetPassword(oldPassword: string, newPassword: string): Observable<EmployeeMessageDTO> {
    let passwordResetDto: PasswordResetDTO = new PasswordResetDTO();
    passwordResetDto.oldPassword = oldPassword;
    passwordResetDto.newPassword = newPassword;
    return this.http.put<EmployeeMessageDTO>(`${environment.apiURL}/employee/password_reset/${localStorage.getItem("LBZ")}`,
      passwordResetDto,
      { headers: this.getHeaders() });
  }

  resetPasswordConfirmed(url: string) {
    return this.http.get(url, { headers: this.getHeaders() });
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  }
}
