import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {UserService} from "../../../services/user-service/user.service";
import {Uloga} from "../../../models/models";
import {map} from "rxjs/operators";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
  constructor(private userService: UserService,  private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let rola1 = false;
    // let rola2 = false;
    // let rola3 = false;

    //
    // return this.userService.checkRole('ROLE_DR_SPEC_ODELJENJA').pipe(
    //   switchMap(drSpecOdeljenja => {
    //     if (!drSpecOdeljenja) {
    //       return of(false);
    //     } else {
    //       // If the user has the DOCTOR role, check if they also have the NURSE role
    //       return this.userService.checkRole('ROLE_DR_SPEC').pipe(
    //         map(drSpec => {
    //           // If the user has both roles, return true, otherwise return false
    //           return drSpec || drSpecOdeljenja;
    //         })
    //       );
    //     }
    //   })
    // );

    return this.userService.checkRoles(['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV']).pipe(
      switchMap(hasRoles => {
        if (!hasRoles) {
          return of(false);
        } else {
          return of(true);
        }
      })
    );

    // const rola1 = this.userService.checkRole("ROLE_DR_SPEC_ODELJENJA");
    // const rola2 = this.userService.checkRole("ROLE_DR_SPEC");
    // const rola3 = this.userService.checkRole("ROLE_DR_SPEC_POV");

    // let role: Uloga[] = [];
    //
    // this.userService.getUserRoles().subscribe(res=>{
    //   role = res;
    //   console.log(role)
    //
    //   if (role.some(rola => rola.shortName === 'ROLE_DR_SPEC_ODELJENJA' || "ROLE_DR_SPEC" || "ROLE_DR_SPEC_POV")) {
    //     console.log("if")
    //     return true;
    //   } else {
    //     console.log("else")
    //     return false;
    //   }
    //
    // })
    // console.log("pre returna")
    // return false;

    //
    // this.userService.checkRole("ROLE_DR_SPEC_ODELJENJA").subscribe(res =>{
    //   rola1 = res;
    //   // console.log("rola1 " + rola1);
    //
    //   this.userService.checkRole("ROLE_DR_SPEC").subscribe(res =>{
    //     rola2 = res;
    //     // console.log("rola2 " + rola2);
    //
    //     this.userService.checkRole("ROLE_DR_SPEC_POV").subscribe(res =>{
    //       rola3 = res;
    //       // console.log("rola3 " + rola3);
    //
    //       return rola1 || rola2 || rola3;
    //     })
    //
    //   })
    //
    // })
    //
    // console.warn('User does not have required roles');
    // return this.router.createUrlTree(['/login']);

      // console.log("DOKTOR_GUARD " + rola1 || rola2 || rola3);

    // return rola1 || rola2 || rola3;

  }
}
