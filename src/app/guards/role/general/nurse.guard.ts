import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../../../services/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class NurseGuard implements CanActivate {
  constructor(private userService: UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.checkRole("ROLE_VISA_MED_SESTRA") ||
      this.userService.checkRole("ROLE_MED_SESTRA");

  }
}
