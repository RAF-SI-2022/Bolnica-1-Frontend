import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {UserService} from "../../../services/user-service/user.service";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianGuard implements CanActivate {
  constructor(private userService: UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return this.userService.checkRole("ROLE_LAB_TEHNICAR") ||
    //   this.userService.checkRole("ROLE_VISI_LAB_TEHNICAR");

    return this.userService.checkRoles(['ROLE_LAB_TEHNICAR', 'ROLE_VISI_LAB_TEHNICAR']).pipe(
      switchMap(hasRoles => {
        if (!hasRoles) {
          return of(false);
        } else {
          return of(true);
        }
      })
    );

  }
}
