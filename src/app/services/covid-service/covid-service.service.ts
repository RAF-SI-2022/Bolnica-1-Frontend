import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {PrescriptionAnalysis} from "../../models/laboratory/PrescriptionAnalysis";
import {Observable} from "rxjs";
import {PrescriptionLabSendDto} from "../../models/prescription/PrescriptionLabSendDto";
import {PrescriptionType} from "../../models/laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../../models/laboratory-enums/PrescriptionStatus";
import {environmentCovid, environmentInfirmary, environmentPatient} from "../../../environments/environment";
import {PrescriptionInfirmarySendDto} from "../../models/prescription/PrescriptionInfirmarySendDto";
import {Page} from "../../models/models";
import {ScheduledAppointmentDto} from "../../models/infirmary/ScheduledAppointmentDto";
import {StatsDto} from "../../models/covid/StatsDto";
import {DischargeListDto} from "../../models/infirmary/DischargeListDto";
import {CreateDischargeListDto} from "../../models/infirmary/CreateDischargeListDto";
import {Validators} from "@angular/forms";
import {CreateCovidExaminationSummaryDto} from "../../models/covid/CreateCovidExaminationSummaryDto";
import {PatientArrival} from "../../models/laboratory-enums/PatientArrival";
import {ScheduleExam} from "../../models/patient/ScheduleExam";
import {CovidExamDto} from "../../models/covid/CovidExamDto";
import {ScheduleExamCreate} from "../../models/patient/ScheduleExamCreate";
import {CreateCovidExamDto} from "../../models/covid/CreateCovidExamDto";
import {CovidExaminationType} from "../../models/covid-enums/CovidExaminationType";

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

  // todo Slanje uputa za rendgen




  /**
   * Kreiranje kovid pregleda
   * */
  public createCovidExam(
    dateAndTime: Date, // ovo je timestamp
    patientArrival: PatientArrival,
    type: CovidExaminationType,
    lbz: string,
    lbp: string
  ): Observable<HttpStatusCode> {

    const obj: CreateCovidExamDto = {
      dateAndTime: dateAndTime,// ovde je timestamp
      patientArrival: patientArrival,
      type: type,
      lbz: lbz,
      lbp: lbp
    }

    return this.http.post<HttpStatusCode>(
      `${environmentCovid.apiURL}/exam/create`,
      obj, {headers: this.getHeaders()});
  }


  /**
   * Vraca kovid preglede za danasnji dan sa satusom CEKA ili TRENUTNO za svakog lekara
   * po njegovom lbz-u
   * */
  public getCovidExaminationByDoctor(
    lbz: string
  ): Observable<CovidExamDto[]> {

    return this.http.get<CovidExamDto[]>(
      `${environmentCovid.apiURL}/exam/find_all_for_doctor/${lbz}`,
      { headers: this.getHeaders()}
    );
  }

  /**
   * Vraca kovid preglede za danasnji dan ciji je status CEKA sa paginacijom
   *
   * Prikazivanje x unetih lbp-a sa dodeljenim lekarom koji će ih pregledati sa statusom ČEKA.
   * */
  public getCovidExaminationForNurse(
    page: number,
    size: number
  ): Observable<Page<CovidExamDto>> {

    let httpParams = new HttpParams()
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<CovidExamDto>>(
      `${environmentCovid.apiURL}/exam/find_all_today`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }

  /**
   * Kreiranje izvestaja pregleda i pisanje terapije.
   *
   * Slanje podataka o kovid pregledu na pacijent mikroservis.
   * */
  public createCovidExaminationSummary(
    examId: number,
    lbp: string,
    examDate: Date,
    lbz: string, // doktor koji je pregleda
    symptoms: string,
    duration: string,
    bodyTemperature: string,
    bloodPressure: string,
    saturation: string,
    lungCondition: string,
    therapy: string

  ): Observable<HttpStatusCode> {

    const covidExaminationSummaryDto : CreateCovidExaminationSummaryDto = {
      examId: examId,
      lbp: lbp,
      examDate: examDate,
      lbz: lbz,
      symptoms: symptoms,
      duration: duration,
      bodyTemperature: bodyTemperature,
      bloodPressure: bloodPressure,
      saturation: saturation,
      lungCondition: lungCondition,
      therapy: therapy
    }

    return this.http.post<HttpStatusCode>(`${environmentCovid.apiURL}/exam/createExamSummary`,
      covidExaminationSummaryDto, { headers: this.getHeaders() } );
  }


  /**
   * Azuriranje statusa pregleda nekog pacijenta
   *
   * Promena statusa nekom čekajućem pacijentu u U_TOKU.
   * */
  public updatePatientStatus(
    examId: number,
    pa: PatientArrival
  ): Observable<HttpStatusCode>{

    let httpParams = new HttpParams()
      .append("pa",pa)

    return this.http.put<HttpStatusCode>(`${environmentCovid.apiURL}/exam/${examId}`, '',
      {params: httpParams, headers: this.getHeaders()});

  }

  /**
   * Kreiranje uputa za LABORATORIJU, ovde cemo birati da li je za kovid ili za krvnu sliku
   *
   * Slanje uputa za pacijenta na lab za kovid test.
   * Slanje uputa za pacijenta za krvnu sliku.
   * */
  public writeLabPerscription(
    doctorLbz: string,
    departmentFromId: number,
    departmentToId: number,
    lbp: string,
    comment: string,
    prescriptionAnalysisDtos: PrescriptionAnalysis[]
  ): Observable<HttpStatusCode> {

    const obj: PrescriptionLabSendDto = {

      type: PrescriptionType.LABORATORIJA,
      doctorLbz: doctorLbz,
      departmentFromId: departmentFromId,
      departmentToId: departmentToId,
      lbp: lbp,
      creationDateTime: new Date(), //ovde je timestamp
      status: PrescriptionStatus.NEREALIZOVAN,
      comment: comment,
      prescriptionAnalysisDtos: prescriptionAnalysisDtos
    }

    console.log(obj)

    return this.http.post<HttpStatusCode>(`${environmentCovid.apiURL}/prescription/lab_prescription`,
      obj, {headers: this.getHeaders()});
  }


  /**
   * Kreiranje uputa za STACIONAR
   *
   * Slanje uputa za pacijenta na stacionar.
   * */
  public writeInfirmaryPerscription(

    doctorLbz: string,
    departmentFromId: number,
    departmentToId: number = 0, // staviti da bude kovid id
    lbp: string,
    referralDiagnosis: string,
    referralReason: string

  ): Observable<HttpStatusCode> {

    const obj: PrescriptionInfirmarySendDto = {
      type:PrescriptionType.STACIONAR,
      doctorLbz: doctorLbz,
      departmentFromId: departmentFromId,
      departmentToId: departmentToId,
      lbp: lbp,
      creationDateTime: new Date(), // ovde je timestamp
      status: PrescriptionStatus.NEREALIZOVAN,
      referralDiagnosis: referralDiagnosis,
      referralReason: referralReason
    }

    console.log(obj)

    return this.http.post<HttpStatusCode>(`${environmentCovid.apiURL}/prescription/infirmary_prescription`,
      obj, {headers: this.getHeaders()});
  }


  /**
   * Evidentiranje broja testiranih, broja pozitivnih, broja hospitalizovanih,
   *      broja na respiratoru, broja izlečenih i broja umrlih za svaki dan.
  * */
  public getStats(
    today: Date,
  ): Observable<StatsDto>{

    let httpParams = new HttpParams()
      .append("today", today.toString())

    return this.http.get<StatsDto>(
      `${environmentCovid.apiURL}/stats/getAllStats`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }


}
