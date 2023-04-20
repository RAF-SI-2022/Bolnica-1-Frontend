import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {PrescriptionType} from "../../models/laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../../models/laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysis} from "../../models/laboratory/PrescriptionAnalysis";
import {Observable} from "rxjs";
import {PrescriptionCreate} from "../../models/laboratory/PrescriptionCreate";
import {environmentPatient} from "../../../environments/environment";
import {Page} from "../../models/models";
import {Prescription} from "../../models/laboratory/Prescription";
import {PrescriptionLabSendDto} from "../../models/prescription/PrescriptionLabSendDto";
import {PrescriptionAnalysisDto} from "../../models/prescription/PrescriptionAnalysisDto";
import {PrescriptionInfirmarySendDto} from "../../models/prescription/PrescriptionInfirmarySendDto";
import {PrescriptionDoneDto} from "../../models/prescription/PrescriptionDoneDto";
import {PrescriptionLabUpdateDto} from "../../models/prescription/PrescriptionLabUpdateDto";
import {PrescriptionNewDto} from "../../models/prescription/PrescriptionNewDto";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionServiceService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Header za autentifikaciju i autorizaciju
   * */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }


  /**
   * Kreiranje uputa za LABORATORIJU
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

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/prescription/lab_prescription`,
      obj, {headers: this.getHeaders()});
  }


  /**
   * Kreiranje uputa za STACIONAR
   * */
  public writeInfirmaryPerscription(

    doctorLbz: string,
    departmentFromId: number,
    departmentToId: number = 0,
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

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/prescription/infirmary_prescription`,
      obj, {headers: this.getHeaders()});
  }

  /**
   * Azuriranje LABORATORIJSKOG uputa
   * */
  public putLabPerscription(
    id: number,
    departmentFromId: number,
    departmentToId: number,
    // creationDateTime: Date = new Date(); // ovde je timestamp
    comment: string,
    prescriptionAnalysisDtos: PrescriptionAnalysisDto[]

  ): Observable<HttpStatusCode> {

    const obj: PrescriptionLabUpdateDto = {
      id: id,
      departmentFromId: departmentFromId,
      departmentToId: departmentToId,
      creationDateTime: new Date(), // ovde je timestamp
      comment: comment,
      prescriptionAnalysisDtos: prescriptionAnalysisDtos
    }

    return this.http.put<HttpStatusCode>(`${environmentPatient.apiURL}/prescription/lab_prescription`,
      obj, {headers: this.getHeaders()});

  }


  /**
   * Brisanje uputa
   * */
  public deletePerscription(
    id: number
  ): Observable<HttpStatusCode>{
    return this.http.delete<HttpStatusCode>(`${environmentPatient.apiURL}/prescription/lab_prescription/${id}`,
      {headers: this.getHeaders()})
  }

  /**
   *  Svi novi uputi pacijenta kod doktora
   * */
  public getPerscriptionsForPatientByDoctor(
    lbp: string,
    lbz: string,
    page: number,
    size:number
  ): Observable<Page<PrescriptionNewDto>> {


    let httpParams = new HttpParams()
      .append("lbz", lbz)
      .append("page",page)
      .append("size",size);

    return this.http.get<Page<PrescriptionNewDto>>(
      `${environmentPatient.apiURL}/prescription/prescriptions/${lbp}`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }


  /**
   *  Svi uputi pacijenta
   * */
  public getPrescriptions(
    dateFromm: Date,
    dateToo: Date,
    lbp: string,
    page: number,
    size:number
  ): Observable<Page<PrescriptionDoneDto>> {

    const dateFrom = new Date(dateFromm)
    const dateTo = new Date(dateToo)
    console.log("Date from " + dateFrom.getTime())
    console.log("Date to " + dateTo.getTime())
    console.log("LALALALALALA " + new Date(1681946882325))

    let httpParams = new HttpParams()
      .append("dateFrom", dateFrom.getTime())
      .append("dateTo", dateTo.getTime())
      .append("page",page)
      .append("size",size);

    return this.http.get<Page<PrescriptionDoneDto>>(
      `${environmentPatient.apiURL}/prescription/done_prescriptions/${lbp}`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  /**
   * Jedan uput po id-u
   * */
  public getPrescription(
    prescriptionId: number
  ): Observable<Page<PrescriptionDoneDto>> {

    return this.http.get<Page<PrescriptionDoneDto>>(
      `${environmentPatient.apiURL}/prescription/${prescriptionId}`,
      { headers:this.getHeaders()}
    );
  }

}
