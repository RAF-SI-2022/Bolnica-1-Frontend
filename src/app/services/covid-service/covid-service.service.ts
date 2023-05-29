import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CovidServiceService {

  constructor(private http: HttpClient,
              private router: Router){
  }

  /**
   * Header za autentifikaciju i autorizaciju
   * */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }

  /*
  1. Prikazivanje x unetih lbp-a sa dodeljenim lekarom koji će ih pregledati sa statusom ČEKA.
  2. Promena statusa nekom čekajućem pacijentu u U_TOKU.
  3. Slanje podataka o kovid pregledu na pacijent mikroservis.
  4. Slanje uputa za pacijenta na lab za kovid test.
  5. Slanje uputa za pacijenta za krvnu sliku.
  6. *Slanje uputa za rendgen.
  7. Zakazivanje kontrolnog pregleda od strane lekara ili medicinske sestre.
  8. Slanje uputa za pacijenta na stacionar.
  9. Evidentiranje broja testiranih, broja pozitivnih, broja hospitalizovanih,
     broja na respiratoru, broja izlečenih i broja umrlih za svaki dan.
  */


}
