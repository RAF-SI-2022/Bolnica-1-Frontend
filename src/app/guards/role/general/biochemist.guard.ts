import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {UserService} from "../../../services/user-service/user.service";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiochemistGuard implements CanActivate {
  constructor(private userService: UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return this.userService.checkRole("ROLE_MED_BIOHEMICAR") ||
    //   this.userService.checkRole("ROLE_SPEC_MED_BIOHEMIJE");

    return this.userService.checkRoles(['ROLE_MED_BIOHEMICAR', 'ROLE_SPEC_MED_BIOHEMIJE']).pipe(
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
