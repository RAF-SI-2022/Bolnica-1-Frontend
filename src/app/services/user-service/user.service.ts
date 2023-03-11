import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Zaposleni} from "../../models/models";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  private zaposleni: Zaposleni = new Zaposleni()
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

  }

  setZaposleni(zaposleni: Zaposleni) {
    this.zaposleni = zaposleni;
  }
  public getUser(id: number): Observable<Zaposleni>{
    return this.http.get<Zaposleni>(``, {});
  }

  public searchUsers(ime: string, prezime: string, selektovanaBolnica: string, selektovanaOrdinacija: string): Observable<Zaposleni[]>{
    let queryParams = new HttpParams();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    queryParams = queryParams.append('ime', ime).append('prezime', prezime).append('selektovanaBolnica', selektovanaBolnica).append('selektovanaOrdinacija', selektovanaOrdinacija);
   let options = {headers: headers, params: queryParams}


    return this.http.get<Zaposleni[]>(``,options);
  }

  deleteUser(LBZ: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete(`$/emp/path/${LBZ}`, { headers: headers })}

  checkAdmin(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'ADMIN') return true;
      }
    }
    return false;
  }

  public updateUser(zaposleni: Zaposleni, novaSifra: string, potvrdaNoveSife: string): Observable<Zaposleni>{
    return this.http.put<Zaposleni>(`$/emp/edit/path param (LBZ)`, zaposleni)};
  }
