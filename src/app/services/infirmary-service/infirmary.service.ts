import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment, environmentInfirmary, environmentLaboratory} from "../../../environments/environment";
import {EmployeeCreateDto, Page, Profession, Title} from "../../models/models";
import * as uuid from "uuid";
import {HospitalizationDto} from "../../models/infirmary/HospitalizationDto";
import {HospitalizationCreateDto} from "../../models/infirmary/HospitalizationCreateDto";
import {ScheduledAppointmentCreateDto} from "../../models/infirmary/ScheduledAppointmentCreateDto";
import {ScheduledLabExamination} from "../../models/laboratory/ScheduledLabExamination";
import {ScheduledAppointmentDto} from "../../models/infirmary/ScheduledAppointmentDto";
import {LabWorkOrder} from "../../models/laboratory/LabWorkOrder";
import {AdmissionStatus} from "../../models/infirmary-enums/AdmissionStatus";
import {ParameterDto} from "../../models/laboratory/ParameterDto";
import {PrescriptionDto} from "../../models/infirmary/PrescriptionDto";
import {PrescriptionStatus} from "../../models/laboratory-enums/PrescriptionStatus";
import {DischargeListDto} from "../../models/infirmary/DischargeListDto";

@Injectable({
  providedIn: 'root'
})
export class InfirmaryService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Header za autentifikaciju i autorizaciju
   * */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }


  // ADMISSION CONTROLLER


  /**
   * Kreiranje hospitalizacije
   * */
  public createHospitalization(
    lbzDoctor: string,
    patientAdmission: Date, // ovo je timestamp
    hospitalRoomId: number,
    dischargeDateAndTime: Date, // ovo je timestamp
    prescriptionId: string,
    note: string
  ): Observable<HttpStatusCode> {

    const hospitalizationCreateDto : HospitalizationCreateDto = {
      lbzDoctor: lbzDoctor,
      patientAdmission: patientAdmission, // ovo je timestamp
      hospitalRoomId: hospitalRoomId,
      dischargeDateAndTime: dischargeDateAndTime, // ovo je timestamp
      prescriptionId: prescriptionId,
      note: note
    }

    return this.http.post<HttpStatusCode>(`${environmentInfirmary.apiURL}/admission/createHospitalizaion`,
      hospitalizationCreateDto, { headers: this.getHeaders() } );
  }

  /**
   * Zakazivanje prijema na stacionar
   * */
  public createScheduledAppointment(
    patientAdmission: Date, // ovo je Timestamp
    note: string,
    prescriptionId: number
  ): Observable<HttpStatusCode> {

    const scheduledAppointmentCreateDto : ScheduledAppointmentCreateDto = {
      patientAdmission: patientAdmission,
      note: note,
      prescriptionId: prescriptionId
    }

    return this.http.post<HttpStatusCode>(`${environmentInfirmary.apiURL}/admission/createSCheduledAppointment`,
      scheduledAppointmentCreateDto, { headers: this.getHeaders() } );
  }

  /**
   * Pretraga zakazanih pregleda po lbp, departmentId, startDate, endDate, AdmissionStatus
   * */

  public findScheduledAppointmentWithFilter(
    lbp: string,
    departmentId: number,
    startDatee: Date,
    endDatee: Date,
    admissionStatus: AdmissionStatus,
    page: number,
    size: number
  ): Observable<Page<ScheduledAppointmentDto>> {

    // na beku je date u infirmaty, nije Long
    // const startDate = new Date(startDatee)
    // const endDate = new Date(endDatee)

    let httpParams = new HttpParams()
      .append("lbp",lbp)
      .append("departmentId", departmentId)
      .append("startDate", startDatee.getDate())
      .append("endDate",endDatee.getDate())
      .append("admissionStatus", admissionStatus)
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<ScheduledAppointmentDto>>(
      `${environmentInfirmary.apiURL}/admission/findScheduledAppointmentWithFilter`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }


  /**
   * Pretraga zakazanog pregleda po Id-u uputa
   * */
  public findScheduledAppointmentByPrescriptionId(
    prescriptionId: number
  ): Observable<ScheduledAppointmentDto>{

    let httpParams = new HttpParams()
      .append("prescriptionId", prescriptionId)

    return this.http.get<ScheduledAppointmentDto>(
      `${environmentInfirmary.apiURL}/admission/findScheduledAppointmentByPrescriptionId`,
      {params: httpParams, headers: this.getHeaders() });

  }


  /**
   * Pretraga uputa po lbp, departmentId, startDate, endDate, AdmissionStatus
   * */

  public findPrescriptionsWithFilter(
    lbp: string,
    departmentId: number,
    prescriptionStatus: PrescriptionStatus,
    page: number,
    size: number
  ): Observable<Page<PrescriptionDto>> {

    let httpParams = new HttpParams()
      .append("lbp",lbp)
      .append("departmentId", departmentId)
      .append("prescriptionStatus", prescriptionStatus)
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<PrescriptionDto>>(
      `${environmentInfirmary.apiURL}/admission/findPrescriptionsWithFilter`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  /**
   * Promena statusa zakazanog prijema
   * */

  public setScheduledAppointmentStatus(
    scheduledAppointmentId: number,
    admissionStatus: AdmissionStatus
  ): Observable<HttpStatusCode>  {

    let httpParams = new HttpParams()
      .append("scheduledAppointmentId",scheduledAppointmentId)
      .append("admissionStatus", admissionStatus)

    return this.http.put<HttpStatusCode>(
      `${environmentInfirmary.apiURL}/admission/setScheduledAppointmentStatus`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  // DISCHARGE LIST CONTROLLER

  /**
   * Kreiranje otpusne liste
   * */
  public createDischargeList(
    id: number,
    followingDiagnosis: string,
    anamnesis: string,
    analysis: string,
    courseOfDisease: string,
    summary: string,
    therapy: string,
    lbzPrescribing:string,
    lbzDepartment:string,
    creation: Date, // ovo je timestamp
    hospitalizationId:number
  ): Observable<HttpStatusCode> {

    // sta ce ovde id?

    const dischargeListDto : DischargeListDto = {
      id: id,
      followingDiagnosis: followingDiagnosis,
      anamnesis: anamnesis,
      analysis: analysis,
      courseOfDisease: courseOfDisease,
      summary: summary,
      therapy: therapy,
      lbzPrescribing:lbzPrescribing,
      lbzDepartment:lbzDepartment,
      creation: creation, // ovo je timestamp
      hospitalizationId:hospitalizationId
    }

    return this.http.post<HttpStatusCode>(`${environmentInfirmary.apiURL}/dischargeList/createDischargeList`,
      dischargeListDto, { headers: this.getHeaders() } );
  }

  /**
   * Pretraga otpusne liste po Id-u hospitalizacije
   * */
  public getDischargeListByHospitalizationId(
    hospitalizationId: number
  ): Observable<DischargeListDto>{

    let httpParams = new HttpParams()
      .append("hospitalizationId", hospitalizationId)

    return this.http.get<DischargeListDto>(
      `${environmentInfirmary.apiURL}/dischargeList/getDischargeListByHospitalizationId`,
      {params: httpParams, headers: this.getHeaders() });

  }


  // HOSPITALIZATION CONTROLLER


  /**
   * Pretraga hospitalizacija po id-u odeljenja (department)
   * */
  public getHospitalizationsByDepartmentId(
    departmentId: number,
    page: number,
    size: number
  ): Observable<Page<HospitalizationDto>> {

    // na beku je date u infirmaty, nije Long
    // const startDate = new Date(startDatee)
    // const endDate = new Date(endDatee)

    let httpParams = new HttpParams()
      .append("departmentId", departmentId)
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<HospitalizationDto>>(
      `${environmentInfirmary.apiURL}/hospitalization/getHospitalizationsByDepartmentId`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  /**
   * Pretraga hospitalizacija po id-u sobe
   * */
  public getHospitalizationsByHospitalRoomId(
    hospitalRoomId: number,
    page: number,
    size: number
  ): Observable<Page<HospitalizationDto>> {

    // na beku je date u infirmaty, nije Long
    // const startDate = new Date(startDatee)
    // const endDate = new Date(endDatee)

    let httpParams = new HttpParams()
      .append("hospitalRoomId", hospitalRoomId)
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<HospitalizationDto>>(
      `${environmentInfirmary.apiURL}/hospitalization/getHospitalizationsByHospitalRoomId`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  /**
   * Pretraga hospitalizacija po filteru
   * */
  public getHospitalizationsWithFilter(
    name: string,
    surname: string,
    jmbg: string,
    departmentId: number,
    hospitalRoomId: number,
    lbp: string,
    startDate: Date,
    endDate: Date,
    page: number,
    size: number
  ): Observable<Page<HospitalizationDto>> {

    // na beku je date u infirmaty, nije Long
    // const startDate = new Date(startDatee)
    // const endDate = new Date(endDatee)

    // DA LI CE OVO SA DATUMOM RADITI?

    let httpParams = new HttpParams()
      .append("name",name)
      .append("surname", surname)
      .append("jmbg", jmbg)
      .append("departmentId", departmentId)
      .append("hospitalRoomId", hospitalRoomId)
      .append("lbp", lbp)
      .append("startDate", startDate.getDate())
      .append("endDate", endDate.getDate())
      .append("page", page)
      .append("size",size)


    return this.http.get<Page<HospitalizationDto>>(
      `${environmentInfirmary.apiURL}/hospitalization/getHospitalizationsWithFilter`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  // HOSPITAL ROOM CONTROLLER





}
