import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {CountryCode} from "../../models/patient-enums/CountryCode";
import {MaritalStatus} from "../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../models/patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../../models/patient-enums/FamilyStatus";
import {Observable} from "rxjs";
import {PatientUpdateClass} from "../../models/patient/PatientUpdate";
import {environment, environmentLaboratory, environmentPatient} from "../../../environments/environment";
import {DeparmentShort, Page} from "../../models/models";
import {ExaminationHistory} from "../../models/patient/ExaminationHistory";
import {Patient} from "../../models/patient/Patient";
import {ScheduledLabExamination} from "../../models/laboratory/ScheduledLabExamination";
import {LabWorkOrder} from "../../models/laboratory/LabWorkOrder";

import {PatientGeneralDto} from "../../models/patient/PatientGeneralDto";
import {LabAnalysisDto} from "../../models/laboratory/LabAnalysisDto";
import {AnalysisParameter} from "../../models/laboratory/AnalysisParameter";
import {ParameterDto} from "../../models/laboratory/ParameterDto";
import {Prescription} from "../../models/laboratory/Prescription";
import {PrescriptionType} from "../../models/laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../../models/laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysis} from "../../models/laboratory/PrescriptionAnalysis";
import {PrescriptionCreate} from "../../models/laboratory/PrescriptionCreate";
import {ExaminationStatus} from "../../models/laboratory-enums/ExaminationStatus";

import {LabWorkOrderWithAnalysis} from "../../models/laboratory/LabWorkOrderWithAnalysis";

import {LabWorkOrderNew} from "../../models/laboratory/LabWorkOrderNew";
import {OrderStatus} from "../../models/laboratory-enums/OrderStatus";
import {LabWorkOrderMessageDto} from "../../models/LabWorkOrderMessageDto";
import {LabWorkOrderDto} from "../../models/laboratory/LabWorkOrderDto";


//import {Prescription} from "../../models/laboratory/Prescription";


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
    const dateFrom = new Date(scheduledDate)

    let httpParams = new HttpParams()
      .append("lbp",lbp)
      .append("date", dateFrom.getTime())
      .append("note",note);


    return this.http.post<HttpStatusCode>(
      `${environmentLaboratory.apiURL}/examinations/create`,
      lbp,{ params: httpParams, headers: this.getHeaders()}
    );
  }

  /**
   * Ukupan broj pregleda za prosledjeni dan
   * */
  public listScheduledExaminationsByDay(datee: Date): Observable<number> {
    const datum = new Date(datee);
    const date= new Date(datee)


    let httpParams = new HttpParams().append("date", date.getTime())

    return this.http.get<number>(
      `${environmentLaboratory.apiURL}/examinations/count-scheduled_examinations/by-day`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }

  /**
   * Dohvata sve zakazane posete
   *
   * */
  listScheduledExaminationsByLbp(lbp: string, datee: Date,  page: number, size:number): Observable<Page<ScheduledLabExamination>> {
    let httpParams = new HttpParams()
    const date = new Date(datee)
    if(lbp == '') {
      httpParams
        .append("startDate", date.getTime())
        .append("endDate", date.getTime())
        .append("page", page)
        .append("size", size);
      console.log("dateeee " + date.getTime())
    }else{

        httpParams
          .append("lbp", lbp)
          .append("startDate", date.getTime())
          .append("endDate", date.getTime())
          .append("page", page)
          .append("size", size);

    }

    return this.http.get<Page<ScheduledLabExamination>>(
      `${environmentLaboratory.apiURL}/examinations/list-scheduled-examinations/by-lbp-date`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }
    //todo da dodaju na Beku paginaciju!
  listScheduledEexaminations(page: number, pageSize: number): Observable<Page<ScheduledLabExamination>> {
    const date = new Date()

    let httpParams = new HttpParams()
      .append("lbp", " ")
      .append("startDate", date.getTime())
      .append("endDate", date.getTime())
      .append("page", page)
      .append("size", pageSize)

    return this.http.get<Page<ScheduledLabExamination>>(
      `${environmentLaboratory.apiURL}/examinations/list-scheduled-examinations/by-lbp-date`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  public getPrescriptionsForPatientByLbzRest(
    lbp: string,
    page: number,
    size: number
  ): Observable<Page<Prescription>> {


    let httpParams = new HttpParams()
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<Prescription>>(
      `${environmentLaboratory.apiURL}/prescription/get_rest/${lbp}`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }

  public getdPrescriptionsForPatientNotRealized(
    lbp: string,
    page: number,
    size: number
  ): Observable<Page<Prescription>> {

    let httpParams = new HttpParams()
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<Prescription>>(
      `${environmentLaboratory.apiURL}/prescription/get_patient/${lbp}`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }



  // public getAnalysis(): Observable<LabAnalysisDto[]>{
  //     console.log("dosao do servisa")
  //   return this.http.get<LabAnalysisDto[]>(`${environmentLaboratory.apiURL}/analysis/getAllLabAnalysis`, {headers: this.getHeaders()});
  // }

  getAnalysis(): Observable<LabAnalysisDto[]>{
    console.log("dosao do servisa");
    return this.http.get<LabAnalysisDto[]>(`${environmentLaboratory.apiURL}/analysis/getAllLabAnalysis`, { headers: this.getHeaders() });
  }

  findAnalysisParametersResults(lab: LabWorkOrderNew): Observable<LabWorkOrderWithAnalysis>{
    console.log("dosao do servisa");
    return this.http.get<LabWorkOrderWithAnalysis>(`${environmentLaboratory.apiURL}/${lab}/results`, { headers: this.getHeaders() });
  }

  findAnalysisParametersResults1(lab: number): Observable<Page<AnalysisParameter>>{
    console.log("dosao do servisa");
    return this.http.get<Page<AnalysisParameter>>(`${environmentLaboratory.apiURL}/${lab}/results`, { headers: this.getHeaders() });
  }

  getAnalysisParams(id: number, page: number, size: number): Observable<Page<ParameterDto>>{
    console.log("dosao do servisa");
    let httpParams = new HttpParams().append("id", id)
      .append("page", page)
      .append("size",size)
    return this.http.get<Page<ParameterDto>>(`${environmentLaboratory.apiURL}/analysisParameter/getParametersByAnalysisId`,{params: httpParams, headers: this.getHeaders() });

  }


  public getLabWorkOrderWithAnalysis(
    workOrderId: number
  ): Observable<LabWorkOrderWithAnalysis>{

    return this.http.get<LabWorkOrderWithAnalysis>(`${environmentLaboratory.apiURL}/work-orders/${workOrderId}/results`,
      { headers: this.getHeaders() });
  }



  public changeExaminationStatus(
    id: number,
    examinationStatus: ExaminationStatus,
  ): Observable<HttpStatusCode> {
    let httpParams = new HttpParams()
      .append("id", id)
      .append("newStatus", examinationStatus)


    return this.http.put<HttpStatusCode>(`${environmentLaboratory.apiURL}/examinations/update-status`,id,
      {params: httpParams, headers: this.getHeaders()});
  }



  /**
   * Pristup istoriji laboratorijskih izveštaja
   * */
  public workOrdersHistory(
    lbp: string,
    fromDatee: Date,
    toDatee: Date,
    page: number,
    size: number
  ): Observable<Page<LabWorkOrderNew>> {
    const fromDate = new Date(fromDatee)
    const toDate = new Date(toDatee)

    let httpParams = new HttpParams()
      .append("lbp",lbp)
      .append("fromDate", fromDate.getTime())
      .append("toDate",toDate.getTime())
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<LabWorkOrderNew>>(
      `${environmentLaboratory.apiURL}/work-orders/work_orders_history`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }

  public findWorkOrders(
    lbp: string,
    fromDatee: Date,
    toDatee: Date,
    status: string,
    page: number,
    size: number
  ): Observable<Page<LabWorkOrderNew>> {
    const dateFrom = new Date(fromDatee)
    const dateTo = new Date(toDatee)

    console.log(lbp)
    console.log(dateFrom.getTime())
    console.log(dateTo.getTime())
    console.log(status)

    let httpParams = new HttpParams().append("lbp",lbp)
      .append("fromDate", dateFrom.getTime().toString())
      .append("toDate", dateTo.getTime().toString())
      .append("status", status) // TODO: SREDJENO ? Status is undefined, baca gresku zbog toga
      .append("page", page)
      .append("size",size)

    console.log("usao u servis!!!!!!!!!!!!!!!!!!")

    return this.http.get<Page<LabWorkOrderNew>>(
      `${environmentLaboratory.apiURL}/work-orders/find_work_orders`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }


  // public findWorkOrders1(
  //   lbp: string,
  //   fromDate: Date,
  //   toDate: Date,
  //   status: OrderStatus,
  //   page: number,
  //   size: number
  // ): Observable<Page<LabWorkOrderNew>> {
  //
  //   let httpParams = new HttpParams().append("lbp",lbp)
  //     .append("fromDate", fromDate.toISOString())
  //     .append("toDate",toDate.toISOString())
  //     .append("status", status)
  //     .append("page", page)
  //     .append("size",size)
  //
  //   return this.http.get<Page<LabWorkOrderNew>>(
  //     `${environmentLaboratory.apiURL}/work-orders/find-work-orders`,
  //     { params: httpParams, headers: this.getHeaders()}
  //   );
  // }

  public registerPatient(
    lbp: string
  ): Observable<HttpStatusCode> {

    let httpParams = new HttpParams()
      .append("lbp", lbp)

    return this.http.put<HttpStatusCode>(
      `${environmentLaboratory.apiURL}/work-orders/register_patient_arrival`
      ,lbp,{ params: httpParams, headers: this.getHeaders()}
    );
  }


  public updateAnalysisParameters(
    workOrderId: number,
    parameterAnalysisId: number,
    result: string
  ): Observable<HttpStatusCode> {

    let httpParams = new HttpParams()
      .append("result", result)

    return this.http.put<HttpStatusCode>(
      `${environmentLaboratory.apiURL}/work-orders/${workOrderId}/${parameterAnalysisId}/update`,
      { params: httpParams, headers: this.getHeaders()}
    );
  }

  public verifyWorkOrder(
    id: number
  ): Observable<LabWorkOrderMessageDto> {

    return this.http.get<LabWorkOrderMessageDto>(
      `${environmentLaboratory.apiURL}/work-orders/verify/${id}`,
      { headers: this.getHeaders()}
    );
  }

  public findWorkOrder(
    id:number
  ): Observable<LabWorkOrderDto>{
    return this.http.get<LabWorkOrderDto>(
      `${environmentLaboratory.apiURL}/work-orders/${id}`,
      { headers: this.getHeaders()}
    );
  }


  public getPatients(page: number, size: number): Observable<Page<Patient>> {

    let httpParams = new HttpParams()
      .append("page", page)
      .append("size", size)
    return this.http.get<Page<Patient>>(`${environmentLaboratory.apiURL}/prescription/patients_lab`, { params: httpParams, headers: this.getHeaders() });
  }








}
