import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AdminPromeniZaposlenog, DeparmentShort, Department, Profession, Title, Uloga, UlogaShort, Zaposleni, Page, EmployeeCreateDto, HospitalShort } from "../../models/models";
import * as uuid from 'uuid';


import { LoginResponse } from "../../models/LoginResponse";
import { ResetPasswordResponse } from "../../models/ResetPasswordResponse";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private zaposleni: Zaposleni = new Zaposleni()
  public token: string = '';
  // public lbz: number = 0;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    console.log(this.token);
  }

  login(formData: { username: string; password: string; }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiURL + '/auth/login', {
      username: formData.username, password: formData.password
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('LBZ');
    localStorage.removeItem('PBO');
    localStorage.removeItem('username');

    this.router.navigate(['']);
  }

  resetPassword(formData: { email: string; }): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>(environment.apiURL + `/emp/pr`, {
      email: formData.email
    });
  }

  setZaposleni(zaposleni: Zaposleni) {
    this.zaposleni = zaposleni;
  }

  getZaposleni(): Zaposleni {
    return this.zaposleni;
  }

  getUserPermissions(): Observable<UlogaShort[]>{
    let lbz = localStorage.getItem("LBZ");
    return this.http.get<UlogaShort[]>(`${environment.apiURL}/employee/permissions/${lbz}`, {headers: this.getHeaders()});
  }

  editZaposleniObjekat(ime: string, prezime: string, datumRodjenja: string, JMBG: string, mestoStanovanja: string, adresaStanovanja: string, brojTelefona: string,
    imejl: string, musko: boolean, zensko: boolean, titula: string, zanimanje: string, odeljenje: string,
    ADMIN: boolean, DR_SPEC_ODELJENJA: boolean, DR_SPEC: boolean, DR_SPEC_POV: boolean, VISA_MED_SESTRA: boolean, MED_SESTRA: boolean, RECEPCIONER: boolean,
    VISI_LABORATORIJSKI_TEHNICAR: boolean, LABORATORIJSKI_TEHNICAR: boolean, MEDICINSKI_BIOHEMICAR: boolean, SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean): AdminPromeniZaposlenog {
    let obj = new AdminPromeniZaposlenog();
    obj.name = ime; obj.surname = prezime; obj.dateOfBirth = new Date(datumRodjenja); obj.jmbg = JMBG; obj.placeOfLiving = mestoStanovanja; obj.address = adresaStanovanja; obj.phone = brojTelefona;
    obj.email = imejl; obj.gender = musko ? 'male' : 'female'; obj.title = <Title>titula; obj.profession = <Profession>zanimanje;

    return obj;
  }

  public addEmployee( name: string, surname: string, dateOfBirth: Date, gender: string,jmbg: string, adress:string,
                     placeOfLiving: string, phone: string, email: string, title: Title, profession: Profession, departmentPbo: string, permissions: string[]): Observable<HttpStatusCode> {

    const lbz = uuid.v4();

    let employeeCreateDto = new EmployeeCreateDto(lbz, name, surname, dateOfBirth, gender, jmbg, adress, placeOfLiving,
                                                phone, email, title, profession, "12345", permissions)
    return this.http.post<HttpStatusCode>(`${environment.apiURL}/employee`,  employeeCreateDto, { headers: this.getHeaders() } );
  }

  public editEmployee(lbz: string, name: string, surname: string, dateOfBirth: Date, gender: string,  jmbg: string, address: string, placeOfLiving: string, phone: string,
    email: string, username: string, password: string, deleted: boolean,
    title: Title, profession: Profession, departmentPbo: string,permissions: string[]): Observable<Zaposleni> {
    let obj = new AdminPromeniZaposlenog();
    obj.name = name; obj.surname = surname; obj.dateOfBirth = dateOfBirth; obj.jmbg = jmbg; obj.placeOfLiving = placeOfLiving;
    obj.address = address; obj.phone = phone; obj.email = email; obj.gender = gender ? 'female' : 'male';
    obj.title = <Title>title; obj.profession = <Profession>profession; obj.permissions = permissions; obj.username = username,
    obj.password = password; obj.departmentPbo = departmentPbo

    return this.http.put<Zaposleni>(`${environment.apiURL}/employee/edit/admin/${lbz}`, obj, { headers: this.getHeaders() });
  }

  getDepartments(): Observable<DeparmentShort[]>{
    return this.http.get<DeparmentShort[]>(`${environment.apiURL}/department`, { headers: this.getHeaders() });
  }
  getHospitals(): Observable<HospitalShort[]>{
    return this.http.get<HospitalShort[]>(`${environment.apiURL}/department/hospital`, { headers: this.getHeaders() });
  }

  public getUser(lbz: string): Observable<Zaposleni> {
    return this.http.get<Zaposleni>(`${environment.apiURL}/employee/admin/find/${lbz}`, { headers: this.getHeaders() });
  }

  public searchUsers(ime: string, prezime: string, selektovanaBolnica: string, selektovanaOrdinacija: string): Observable<Zaposleni[]> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('ime', ime).append('prezime', prezime).append('selektovanaBolnica', selektovanaBolnica).append('selektovanaOrdinacija', selektovanaOrdinacija);
    let options = { headers: this.getHeaders(), params: queryParams }


    return this.http.get<Zaposleni[]>(``, options);
  }

  deleteUser(LBZ: number) {
    return this.http.delete(`$/emp/path/${LBZ}`, { headers: this.getHeaders() })
  }

  getUserRoles(): Observable<Uloga[]> {
    let lbz = localStorage.getItem('LBZ');
    return this.http.get<Uloga[]>(`${environment.apiURL}/employee/permissions/${lbz}`, { headers: this.getHeaders() });
  }

  checkRole(roleToCheck: string): Observable<boolean> {
    return this.getUserRoles().pipe(
      map(response => response.some(role => role.shortName === roleToCheck))
    );
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  }

  public updateUser(zaposleni: Zaposleni, novaSifra: string, potvrdaNoveSife: string): Observable<Zaposleni> {
    return this.http.put<Zaposleni>(`$/emp/edit/path param (LBZ)`, zaposleni)
  };

  getAllUsers(ime: string, prezime:string, bolnica: string, odeljenje: string): Observable<Page<Zaposleni>> {
    let httpParams = new HttpParams().append("name",ime).append("surname", prezime).append("departmentName", odeljenje).append("hospitalShortName",bolnica).append("deleted",false);
    return this.http.get<Page<Zaposleni>>(`${environment.apiURL}/employee/list`, {params: httpParams, headers:this.getHeaders()});
  }
}
