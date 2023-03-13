import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AdminPromeniZaposlenog, Department, Profession, Title, Uloga, UlogaShort, Zaposleni } from "../../models/models";
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

  public addEmployee(ime: string, prezime: string, datumRodjenja: string, JMBG: string, mestoStanovanja: string, adresaStanovanja: string, brojTelefona: string,
    imejl: string, musko: boolean, zensko: boolean, titula: string, zanimanje: string, odeljenje: string,
    ADMIN: boolean, DR_SPEC_ODELJENJA: boolean, DR_SPEC: boolean, DR_SPEC_POV: boolean, VISA_MED_SESTRA: boolean, MED_SESTRA: boolean, RECEPCIONER: boolean,
    VISI_LABORATORIJSKI_TEHNICAR: boolean, LABORATORIJSKI_TEHNICAR: boolean, MEDICINSKI_BIOHEMICAR: boolean, SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean): Observable<Zaposleni> {

    /*this.popuniPoljaZaposleni(ime, prezime, datumRodjenja, JMBG, mestoStanovanja, adresaStanovanja, brojTelefona, imejl, musko, zensko, titula, zanimanje, odeljenje, ADMIN,
      DR_SPEC_ODELJENJA, DR_SPEC, DR_SPEC_POV, VISA_MED_SESTRA, MED_SESTRA, RECEPCIONER, VISI_LABORATORIJSKI_TEHNICAR, LABORATORIJSKI_TEHNICAR, MEDICINSKI_BIOHEMICAR, SPECIJALISTA_MEDICINSKE_BIOHEMIJE);
*/
    // return this.http.post<Zaposleni>(`${proveri rutu}/emp`,this.zaposleni
    return this.http.post<Zaposleni>(`${""}/emp`, this.zaposleni
      , { headers: this.getHeaders() });
  }

  public editEmployee(ime: string, prezime: string, datumRodjenja: string, JMBG: string, mestoStanovanja: string, adresaStanovanja: string, brojTelefona: string,
    imejl: string, musko: boolean, zensko: boolean, titula: string, zanimanje: string, odeljenje: string,
    ADMIN: boolean, DR_SPEC_ODELJENJA: boolean, DR_SPEC: boolean, DR_SPEC_POV: boolean, VISA_MED_SESTRA: boolean, MED_SESTRA: boolean, RECEPCIONER: boolean,
    VISI_LABORATORIJSKI_TEHNICAR: boolean, LABORATORIJSKI_TEHNICAR: boolean, MEDICINSKI_BIOHEMICAR: boolean, SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean): Observable<Zaposleni> {

    /*this.popuniPoljaZaposleni(ime, prezime, datumRodjenja, JMBG, mestoStanovanja, adresaStanovanja, brojTelefona, imejl, musko, zensko, titula, zanimanje, odeljenje, ADMIN,
      DR_SPEC_ODELJENJA, DR_SPEC, DR_SPEC_POV, VISA_MED_SESTRA, MED_SESTRA, RECEPCIONER, VISI_LABORATORIJSKI_TEHNICAR, LABORATORIJSKI_TEHNICAR, MEDICINSKI_BIOHEMICAR, SPECIJALISTA_MEDICINSKE_BIOHEMIJE);
    */
   let adminEditZaposleni = this.editZaposleniObjekat(ime, prezime, datumRodjenja, JMBG, mestoStanovanja, adresaStanovanja, brojTelefona, imejl, musko, zensko, titula, zanimanje, odeljenje, ADMIN,
    DR_SPEC_ODELJENJA, DR_SPEC, DR_SPEC_POV, VISA_MED_SESTRA, MED_SESTRA, RECEPCIONER, VISI_LABORATORIJSKI_TEHNICAR, LABORATORIJSKI_TEHNICAR, MEDICINSKI_BIOHEMICAR, SPECIJALISTA_MEDICINSKE_BIOHEMIJE);
    // return this.http.post<Zaposleni>(`${proveri rutu}/emp`,zaposleni
    return this.http.put<Zaposleni>(`${""}/emp/edit/${this.zaposleni.lbz}`, this.zaposleni
      , { headers: this.getHeaders() });
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
}
