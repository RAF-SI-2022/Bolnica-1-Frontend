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

    /**
     * Check if user is currently logged in
     * @returns true if user is logged in
     */
    isLoggedIn(): boolean {
        let token = localStorage.getItem("token");
        return !(token == null || token == '');
    }

    isCovid(): boolean{
      let covid = localStorage.getItem("covid");
      if (covid ==='true') return true;
      return false;
    }

    /**
     * Get LBZ from local storage
     * @returns LBZ - licni broj zaposlenog
     */
    getLBZ(): string {
        return localStorage.getItem("LBZ")!;
    }

    /**
     * Get PBO from local storage
     * @returns PBO
     */
    getPBO(): string {
      return localStorage.getItem("lbzDepartment")!;
    }

    /**
     * Get departmentId from local storage
     * @returns departmentId
     */
    getDepartmentId(): string {
      return localStorage.getItem("departmentId")!;
    }

    /**
     *
     * @param oldPassword
     * @param newPassword
     * @returns EmployeeMessageDTO that holds string message about operation
     */
    resetPassword(oldPassword: string, newPassword: string): Observable<EmployeeMessageDTO> {
        let passwordResetDto: PasswordResetDTO = new PasswordResetDTO();
        passwordResetDto.oldPassword = oldPassword;
        passwordResetDto.newPassword = newPassword;
        return this.http.put<EmployeeMessageDTO>(
            `${environment.apiURL}/employee/password_reset/${localStorage.getItem("LBZ")}`,
            passwordResetDto,
            { headers: this.getHeaders() }
        );
    }

    resetPasswordConfirmed(url: string) {
        return this.http.get(url, { headers: this.getHeaders() });
    }

    getHeaders(): HttpHeaders {
        return new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }
}
