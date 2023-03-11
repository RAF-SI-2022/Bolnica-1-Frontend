import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Zaposleni} from "../../models/models";
import * as http from "http";
import {LoginResponse} from "../../models/LoginResponse";
import {ResetPasswordResponse} from "../../models/ResetPasswordResponse";


@Injectable({
  providedIn: 'root'
})
export class UserService {



  private zaposleni: Zaposleni = new Zaposleni()
  public token: string = '';
 // public lbz: number = 0;



  // @ts-ignore
  private zaposleni: Zaposleni = new Zaposleni()



  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    console.log(this.token);
  }

  login(formData: { username: string; password: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:8080/auth/login`, {
      username: formData.username, password:formData.password
    });
  }

  resetPassword(formData: { email: string;
  }): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>(`http://localhost:8080/emp/pr `, {
      email: formData.email
    });
  }



  checkDrSpecOdeljenja(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'DR_SPEC_ODELJENJA') return true;
      }
    }
    return false;
  }

  checkDrSpec(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'DR_SPEC') return true;
      }
    }
    return false;
  }

  checkDrSpecPov(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'DR_SPEC_POV') return true;
      }
    }
    return false;
  }

  checkMedSestra(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'MED_SESTRA') return true;
      }
    }
    return false;
  }




  setZaposleni(zaposleni: Zaposleni) {
    this.zaposleni = zaposleni;
  }

  getZaposleni(): Zaposleni{
    return this.zaposleni;
  }

  popuniPoljaZaposleni(ime: string, prezime: string, datumRodjenja: string, JMBG: string, mestoStanovanja: string,
                       adresaStanovanja: string, brojTelefona: string, imejl: string, musko: boolean, zensko: boolean,
                       titula: string, zanimanje: string, odeljenje: string, ADMIN: boolean, DR_SPEC_ODELJENJA: boolean,
                       DR_SPEC: boolean, DR_SPEC_POV: boolean, VISA_MED_SESTRA: boolean, MED_SESTRA: boolean, RECEPCIONER: boolean,
                       VISI_LABORATORIJSKI_TEHNICAR: boolean, LABORATORIJSKI_TEHNICAR: boolean, MEDICINSKI_BIOHEMICAR: boolean, SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean) {
    this.zaposleni.ime = ime;
    this.zaposleni.prezime = prezime;
    this.zaposleni.datumRodjenja = datumRodjenja;
    this.zaposleni.JMBG = JMBG;
    this.zaposleni.mestoStanovanja = mestoStanovanja;
    this.zaposleni.adresaStanovanja = adresaStanovanja;
    this.zaposleni.brojTelefona = brojTelefona;
    this.zaposleni.imejl = imejl;
    this.zaposleni.musko = musko;
    this.zaposleni.zensko = zensko;
    this.zaposleni.titula = titula;
    this.zaposleni.zanimanje = zanimanje;
    this.zaposleni.odeljenje = odeljenje;
    this.zaposleni.ADMIN = ADMIN;
    this.zaposleni.DR_SPEC_ODELJENJA = DR_SPEC_ODELJENJA;
    this.zaposleni.DR_SPEC = DR_SPEC;
    this.zaposleni.DR_SPEC_POV = DR_SPEC_POV;
    this.zaposleni.VISA_MED_SESTRA = VISA_MED_SESTRA;
    this.zaposleni.MED_SESTRA = MED_SESTRA;
    this.zaposleni.RECEPCIONER = RECEPCIONER;
    this.zaposleni.VISI_LABORATORIJSKI_TEHNICAR = VISI_LABORATORIJSKI_TEHNICAR;
    this.zaposleni.LABORATORIJSKI_TEHNICAR = LABORATORIJSKI_TEHNICAR;
    this.zaposleni.MEDICINSKI_BIOHEMICAR = MEDICINSKI_BIOHEMICAR;
    this.zaposleni.SPECIJALISTA_MEDICINSKE_BIOHEMIJE = SPECIJALISTA_MEDICINSKE_BIOHEMIJE;

  }

  public addEmployee(ime: string, prezime: string, datumRodjenja:string, JMBG: string, mestoStanovanja: string, adresaStanovanja: string, brojTelefona: string,
                     imejl: string, musko: boolean, zensko: boolean, titula: string, zanimanje: string, odeljenje: string,
                     ADMIN: boolean, DR_SPEC_ODELJENJA: boolean, DR_SPEC: boolean, DR_SPEC_POV: boolean, VISA_MED_SESTRA: boolean, MED_SESTRA: boolean, RECEPCIONER: boolean,
                     VISI_LABORATORIJSKI_TEHNICAR: boolean, LABORATORIJSKI_TEHNICAR: boolean, MEDICINSKI_BIOHEMICAR: boolean, SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean): Observable<Zaposleni>{

  this.popuniPoljaZaposleni(ime, prezime, datumRodjenja, JMBG, mestoStanovanja, adresaStanovanja, brojTelefona, imejl, musko, zensko, titula, zanimanje, odeljenje,ADMIN,
    DR_SPEC_ODELJENJA, DR_SPEC, DR_SPEC_POV, VISA_MED_SESTRA, MED_SESTRA, RECEPCIONER, VISI_LABORATORIJSKI_TEHNICAR, LABORATORIJSKI_TEHNICAR, MEDICINSKI_BIOHEMICAR, SPECIJALISTA_MEDICINSKE_BIOHEMIJE);

    // return this.http.post<Zaposleni>(`${proveri rutu}/emp`,this.zaposleni
    return this.http.post<Zaposleni>(`${""}/emp`,this.zaposleni
      , {headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`)});
  }



  public editEmployee(ime: string, prezime: string, datumRodjenja:string, JMBG: string, mestoStanovanja: string, adresaStanovanja: string, brojTelefona: string,
                     imejl: string, musko: boolean, zensko: boolean, titula: string, zanimanje: string, odeljenje: string,
                     ADMIN: boolean, DR_SPEC_ODELJENJA: boolean, DR_SPEC: boolean, DR_SPEC_POV: boolean, VISA_MED_SESTRA: boolean, MED_SESTRA: boolean, RECEPCIONER: boolean,
                     VISI_LABORATORIJSKI_TEHNICAR: boolean, LABORATORIJSKI_TEHNICAR: boolean, MEDICINSKI_BIOHEMICAR: boolean, SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean): Observable<Zaposleni>{

    this.popuniPoljaZaposleni(ime, prezime, datumRodjenja, JMBG, mestoStanovanja, adresaStanovanja, brojTelefona, imejl, musko, zensko, titula, zanimanje, odeljenje,ADMIN,
      DR_SPEC_ODELJENJA, DR_SPEC, DR_SPEC_POV, VISA_MED_SESTRA, MED_SESTRA, RECEPCIONER, VISI_LABORATORIJSKI_TEHNICAR, LABORATORIJSKI_TEHNICAR, MEDICINSKI_BIOHEMICAR, SPECIJALISTA_MEDICINSKE_BIOHEMIJE);

    // return this.http.post<Zaposleni>(`${proveri rutu}/emp`,zaposleni
    return this.http.put<Zaposleni>(`${""}/emp/edit/${this.zaposleni.LBZ}`,this.zaposleni
      , {headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`)});
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
  checkVisaMedSestra(): boolean{
    if (localStorage.getItem('privilege') == null) return false;
    else { // @ts-ignore
      for (let item of localStorage.getItem('privilege')){
        if (item.toUpperCase() == 'VISA_MED_SESTRA') return true;
      }
    }
    return false;
  }
  public updateUser(zaposleni: Zaposleni, novaSifra: string, potvrdaNoveSife: string): Observable<Zaposleni>{
    return this.http.put<Zaposleni>(`$/emp/edit/path param (LBZ)`, zaposleni)};
  }





