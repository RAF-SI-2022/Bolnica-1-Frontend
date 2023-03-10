import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Zaposleni} from "../../models/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

  }

  // public addEmployee(ime: string, prezime: string, datumRodjenja:string, JMBG: string, mestoStanovanja: string, adresaStanovanja: string, brojTelefona: string,
  //                    imejl: string, musko: boolean, zensko: boolean, titula: string, zanimanje: string, odeljenje: string,
  //                    admin: boolean, dr_spec_odeljenja: boolean, dr_spec: boolean, dr_spec_pov: boolean, visa_med_sestra: boolean, med_sestra: boolean): Observable<Zaposleni>{
  //   return this.http.post<Zaposleni>(`${environment.url}/emp`,usr
  //     , {headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`)});
  // }


}
