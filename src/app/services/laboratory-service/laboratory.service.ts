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

        let httpParams = new HttpParams()
            .append("lbp",lbp)
            .append("date", scheduledDate.toISOString())
            .append("note",note);

        return this.http.post<HttpStatusCode>(
            `${environmentLaboratory.apiURL}/examinations/create`,
            { params: httpParams, headers: this.getHeaders()}
        );
    }

    /**
     * Ukupan broj pregleda za prosledjeni dan
     * */
    public listScheduledExaminationsByDay(date: Date): Observable<number> {
        let httpParams = new HttpParams().append("date", date.toISOString())

        return this.http.post<number>(
            `${environmentLaboratory.apiURL}/examinations/count-scheduled_examinations/by-day`,
            { params: httpParams, headers: this.getHeaders()}
        );
    }

    /**
     * Dohvata sve zakazane posete
     *
     * */
    listScheduledEexaminations(lbp: string, date: string,  page: number, size:number): Observable<Page<ScheduledLabExamination>> {
        let httpParams = new HttpParams()
            .append("lbp",lbp)
            .append("date", date)
            .append("page",page)
            .append("size",size);

        return this.http.get<Page<ScheduledLabExamination>>(
            `${environmentLaboratory.apiURL}/examinations/list-scheduled-examinations`,
            {params: httpParams, headers:this.getHeaders()}
        );
    }

    /**
     * Pristup istoriji laboratorijskih izveštaja
     * */
    public workOrdersHistory(
        lbp: string,
        fromDate: Date,
        toDate: Date,
        page: number,
        size: number
    ): Observable<Page<LabWorkOrder>> {

        let httpParams = new HttpParams().append("lbp",lbp)
            .append("fromDate", fromDate.toISOString())
            .append("toDate",toDate.toISOString())
            .append("page", page)
            .append("size",size)

        return this.http.post<Page<LabWorkOrder>>(
            `${environmentLaboratory.apiURL}/work-orders/work-orders-history`,
            { params: httpParams, headers: this.getHeaders()}
        );
    }

  public findWorkOrders(
    lbp: string,
    fromDate: Date,
    toDate: Date,
    page: number,
    size: number
  ): Observable<Page<LabWorkOrder>> {

    let httpParams = new HttpParams().append("lbp",lbp)
      .append("fromDate", fromDate.toISOString())
      .append("toDate",toDate.toISOString())
      .append("page", page)
      .append("size",size)

    return this.http.post<Page<LabWorkOrder>>(
      `${environmentLaboratory.apiURL}/work-orders/find-work-orders`,
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

  getAnalysisParams(id: number, page: number, size: number): Observable<Page<ParameterDto>>{
    console.log("dosao do servisa");
    let httpParams = new HttpParams().append("id", id)
      .append("page", page)
      .append("size",size)
    return this.http.get<Page<ParameterDto>>(`${environmentLaboratory.apiURL}/analysisParameter/getParametersByAnalysisId`,{params: httpParams, headers: this.getHeaders() });

  }

}
