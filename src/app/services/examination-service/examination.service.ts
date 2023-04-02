import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {CountryCode} from "../../models/patient-enums/CountryCode";
import {MaritalStatus} from "../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../models/patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../../models/patient-enums/FamilyStatus";
import {Observable} from "rxjs";
import {PatientCreate} from "../../models/patient/PatientCreate";
import * as uuid from "uuid";
import {environmentLaboratory, environmentPatient} from "../../../environments/environment";
import {ScheduleExamCreate} from "../../models/patient/ScheduleExamCreate";
import {Page, Zaposleni} from "../../models/models";
import {LabWorkOrder} from "../../models/laboratory/LabWorkOrder";
import {ScheduleExam} from "../../models/patient/ScheduleExam";
import {Patient} from "../../models/patient/Patient";
import {PatientArrival} from "../../models/laboratory-enums/PatientArrival";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Header za autentifikaciju i autorizaciju
   * */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }

  /**
   * Dodavanje novog pregleda
   * */
  public createExamination(
    dateAndTime: Date, // ovde je timestamp
    doctorId: number,
    lbz: string,
    lbp: string,
    note: string

  ): Observable<HttpStatusCode> {

    const obj: ScheduleExamCreate = {
      dateAndTime: dateAndTime,// ovde je timestamp
      doctorId: doctorId,
      lbz: lbz,
      lbp: lbp,
      note: note
    }
    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/examination/create`,
      obj, {headers: this.getHeaders()});
  }

  /**
   * Pretraga zakazanih pregleda po datumu i lbz-u BEZ paginacije
   * */
  public getScheduledExaminations(
    lbz: string,
    date: Date
  ): Observable<ScheduleExam[]> {

    let httpParams = new HttpParams().append("lbz",lbz)
      .append("date", date.toISOString())

    return this.http.get<ScheduleExam[]>(
      `${environmentPatient.apiURL}/examination/find`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }

  /**
   * Pretraga zakazanih pregleda po datumu i lbz-u SA paginacijom
   * */
  public getScheduledExaminationsPaged(
    lbz: string,
    date: Date,
    page: number,
    size: number
  ): Observable<Page<ScheduleExam>> {

    let httpParams = new HttpParams().append("lbz",lbz)
      .append("date", date.toISOString())
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<ScheduleExam>>(
      `${environmentPatient.apiURL}/examination/find_paged`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }

  /**
   * Brisanje zakazanog pregleda
   * */
  public deleteExamination(id: number) {
    return this.http.delete<HttpStatusCode>(`${environmentPatient.apiURL}/examination${id}`,
      {headers: this.getHeaders()})
  }

  /**
   * Pretraga lekara po odeljenju
   */
  public getDoctorsByDepartment(
    pbo: string
  ): Observable<Zaposleni[]> {

    return this.http.get<Zaposleni[]>(
      `${environmentPatient.apiURL}/examination//find_doctor_by_department/${pbo}`,
      { headers: this.getHeaders()}
    );
  }

  /**
   * Azuriranje statusa pacijenta
   * */
  public updatePatientStatus(
    id: number,
    pa: PatientArrival
  ): Observable<HttpStatusCode>{

    let httpParams = new HttpParams()
      .append("pa",pa)

    return this.http.put<HttpStatusCode>(`${environmentPatient.apiURL}/examination/patient/${id}`,
      {params: httpParams,headers: this.getHeaders()});
  }


}
