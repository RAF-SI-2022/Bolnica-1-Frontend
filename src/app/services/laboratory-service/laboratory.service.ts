import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {CountryCode} from "../../models/patient-enums/CountryCode";
import {MaritalStatus} from "../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../models/patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../../models/patient-enums/FamilyStatus";
import {Observable} from "rxjs";
import {PatientUpdateClass} from "../../models/patient/PatientUpdate";
import {environmentLaboratory, environmentPatient} from "../../../environments/environment";
import {Page} from "../../models/models";
import {ExaminationHistory} from "../../models/patient/ExaminationHistory";

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Header za autentifikaciju i autorizaciju
   * */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }

  /**
   * Kreiranje zakazanog pregleda
   * Permisije ce imati ROLE_LAB_TEHNICAR','ROLE_VISI_LAB_TEHNICAR
   * */
  public createScheduledExamination(
    lbp: string,
    scheduledDate: Date,
    note: string
  ): Observable<HttpStatusCode> {

    let httpParams = new HttpParams().append("lbp",lbp).
    append("date", scheduledDate.toISOString()).
    append("note",note);

    return this.http.post<HttpStatusCode>(`${environmentLaboratory.apiURL}/examinations/create`,{ params: httpParams, headers: this.getHeaders()});
  }
//todo dodaj za od-do

}
