import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {
  environmentInfirmary
} from "../../../environments/environment";
import {Page} from "../../models/models";
import {HospitalizationDto} from "../../models/infirmary/HospitalizationDto";
import {HospitalizationCreateDto} from "../../models/infirmary/HospitalizationCreateDto";
import {ScheduledAppointmentCreateDto} from "../../models/infirmary/ScheduledAppointmentCreateDto";
import {ScheduledAppointmentDto} from "../../models/infirmary/ScheduledAppointmentDto";
import {AdmissionStatus} from "../../models/infirmary-enums/AdmissionStatus";
import {PrescriptionDto} from "../../models/infirmary/PrescriptionDto";
import {PrescriptionStatus} from "../../models/laboratory-enums/PrescriptionStatus";
import {DischargeListDto} from "../../models/infirmary/DischargeListDto";
import {HospitalRoomCreateDto} from "../../models/infirmary/HospitalRoomCreateDto";
import {HospitalRoomDto} from "../../models/infirmary/HospitalRoomDto";
import {PrescriptionCreateDto} from "../../models/laboratory/PrescriptionCreate";
import {PrescriptionType} from "../../models/laboratory-enums/PrescriptionType";
import {PrescriptionAnalysis} from "../../models/laboratory/PrescriptionAnalysis";
import {VisitCreateDto} from "../../models/infirmary/VisitCreateDto";
import {VisitDto} from "../../models/infirmary/VisitDto";
import {PatientStateCreateDto} from "../../models/infirmary/PatientStateCreateDto";
import {PatientStateDto} from "../../models/infirmary/PatientStateDto";
import {MedicalRecord} from "../../models/patient/MedicalRecord";
import {ExaminationHistoryCreateDto} from "../../models/patient/ExaminationHistoryCreate";
import {DiagnosisCodeDto} from "../../models/patient/DiagnosisCode";
import {AnamnesisDto} from "../../models/patient/Anamnesis";
import {
  ExaminationHistoryCreateDtoInfirmary
} from "../../models/infirmary/externalPatient/ExaminationHistoryCreateDtoInfirmary";
import {Message} from "../../models/Message";
import {PrescriptionCreateDtoInfirmary} from "../../models/infirmary/externalPatient/PrescriptionCreateDtoInfirmary";
import {Time} from "@angular/common";
import {CreateDischargeListDto} from "../../models/infirmary/CreateDischargeListDto";

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
    prescriptionId: number,
    note: string
  ): Observable<HospitalizationDto> {

    const hospitalizationCreateDto : HospitalizationCreateDto = {
      lbzDoctor: lbzDoctor,
      patientAdmission: patientAdmission, // ovo je timestamp
      hospitalRoomId: hospitalRoomId,
      dischargeDateAndTime: dischargeDateAndTime, // ovo je timestamp
      prescriptionId: prescriptionId,
      note: note
    }

    return this.http.post<HospitalizationDto>(`${environmentInfirmary.apiURL}/admission/createHospitalizaion`,
      hospitalizationCreateDto, { headers: this.getHeaders() } );
  }

  /**
   * Zakazivanje prijema na stacionar
   * */
  public createScheduledAppointment(
    patientAdmission: Date, // ovo je Timestamp
    note: string,
    prescriptionId: number
  ): Observable<ScheduledAppointmentDto> {

    const scheduledAppointmentCreateDto : ScheduledAppointmentCreateDto = {
      patientAdmission: patientAdmission,
      note: note,
      prescriptionId: prescriptionId
    }

    return this.http.post<ScheduledAppointmentDto>(`${environmentInfirmary.apiURL}/admission/createSCheduledAppointment`,
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
    // admissionStatus: AdmissionStatus,
    page: number,
    size: number
  ): Observable<Page<ScheduledAppointmentDto>> {

    //2023-05-04

    // na beku je date u infirmaty, nije Long
    // const startDate = new Date(startDatee)
    // const endDate = new Date(endDatee)

    let httpParams = new HttpParams()
      .append("lbp",lbp)
      .append("departmentId", departmentId)
      .append("startDate", startDatee.toString())
      .append("endDate",endDatee.toString())
      // .append("admissionStatus", admissionStatus)
      .append("page", page)
      .append("size",size)

    console.log('saljem emica')
    console.log(startDatee.toString())
    console.log(endDatee.toString())

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
  ): Observable<Message>  {

    let httpParams = new HttpParams()
      .append("scheduledAppointmentId",scheduledAppointmentId)
      .append("admissionStatus", admissionStatus)

    return this.http.put<Message>(
      `${environmentInfirmary.apiURL}/admission/setScheduledAppointmentStatus`,
      {}, {params: httpParams, headers:this.getHeaders()}
    );
  }

  // DISCHARGE LIST CONTROLLER

  /**
   * Kreiranje otpusne liste
   * */
  public createDischargeList(
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
  ): Observable<DischargeListDto> {

    // sta ce ovde id?

    const dischargeListDto : CreateDischargeListDto = {
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

    console.log("usao u servis ema")
    console.log(dischargeListDto)

    return this.http.post<DischargeListDto>(`${environmentInfirmary.apiURL}/dischargeList/createDischargeList`,
      dischargeListDto, { headers: this.getHeaders() } );
  }

  /**
   * Pretraga otpusne liste po Id-u hospitalizacije, datumu i lbp-u
   * */
  public getDischargeListByHospitalizationId(
    hospitalizationId: number,
    startDate: Date,
    endDate: Date,
    lbp: string,
    page: number,
    size: number
  ): Observable<Page<DischargeListDto>>{

    let httpParams = new HttpParams()
      .append("hospitalizationId", hospitalizationId)
      .append("startDate", startDate.toString())
      .append("endDate",endDate.toString())
      .append("lbp", lbp)
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<DischargeListDto>>(
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
    // hospitalRoomId: number,
    lbp: string,
    // startDate: Date,
    // endDate: Date,
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
      // .append("hospitalRoomId", hospitalRoomId)
      .append("lbp", lbp)
      // .append("startDate", startDate.getDate())
      // .append("endDate", endDate.getDate())
      .append("page", page)
      .append("size",size)


    return this.http.get<Page<HospitalizationDto>>(
      `${environmentInfirmary.apiURL}/hospitalization/getHospitalizationsWithFilter`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  // HOSPITAL ROOM CONTROLLER

  /**
   * Kreiranje bolnicke sobe
   * */
  public createHospitalRoom(
    idDepartment: number,
    roomNumber: number,
    name: string,
    capacity: number,
    description:string
  ): Observable<HospitalRoomDto> {

    const hospitalRoomCreateDto : HospitalRoomCreateDto = {
      idDepartment: idDepartment,
      roomNumber: roomNumber,
      name: name,
      capacity: capacity,
      description: description
    }

    return this.http.post<HospitalRoomDto>(`${environmentInfirmary.apiURL}/hospitalRoom/createHospitalRoom`,
      hospitalRoomCreateDto, { headers: this.getHeaders() } );
  }

  /**
   * Brisanje bolnicke sobe po id-u
   * */
  public deleteHospitalRoom(
    hospitalRoomId: number
  ): Observable<Message>{

    let httpParams = new HttpParams()
      .append("hospitalRoomId", hospitalRoomId)

    return this.http.put<Message>(
      `${environmentInfirmary.apiURL}/hospitalRoom/deleteHospitalRoom`,{},
      {params: httpParams, headers: this.getHeaders() });

  }

  /**
   * Pretraga soba po odeljenju
   * */
  public getHospitalRoomsByDepartmentId(
    departmentId: number,
    page: number,
    size: number
  ): Observable<Page<HospitalRoomDto>> {

    let httpParams = new HttpParams()
      .append("departmentId", departmentId)
      .append("page", page)
      .append("size",size)

    return this.http.get<Page<HospitalRoomDto>>(
      `${environmentInfirmary.apiURL}/hospitalRoom/getHospitalRoomsByDepartmentId`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

  /**
   * Pretraga sobe po id-u
   * */
  public getHospitalRoomsById(
    id: number
  ): Observable<HospitalRoomDto>{

    let httpParams = new HttpParams()
      .append("id", id)

    return this.http.get<HospitalRoomDto>(
      `${environmentInfirmary.apiURL}/hospitalRoom/getHospitalRoomsById`,
      {params: httpParams, headers: this.getHeaders() });

  }


  // MEDICAL RECORD CONTROLLER

  /**
   * Pretraga kartona po lbp-u pacijenta
   * */
  public getMedicalRecordByLbp(
    lbp: string
  ): Observable<MedicalRecord>{

    let httpParams = new HttpParams()
      .append("lbp", lbp)

    return this.http.get<MedicalRecord>(
      `${environmentInfirmary.apiURL}/medicalRecord/getMedicalRecordByLbp`,
      {params: httpParams, headers: this.getHeaders() });

  }


  /**
   * Kreiranje izvestaja pregleda
   * */
  public createExaminationHistory(
    lbp: string,
    examDate: Date,
    lbz: string,
    confidential: boolean,
    objectiveFinding: string,
    advice: string,
    therapy: string,
    diagnosisCodeDto: DiagnosisCodeDto,
    anamnesisDto: AnamnesisDto
  ): Observable<Message> {

    const ExaminationHistoryCreateDtoInfirmary : ExaminationHistoryCreateDtoInfirmary = {
      lbp:lbp,
      examDate: examDate,
      lbz: lbz,
      confidential: confidential,
      objectiveFinding: objectiveFinding,
      advice: advice,
      therapy: therapy,
      diagnosisCodeDto: diagnosisCodeDto,
      anamnesisDto: anamnesisDto
    }

    return this.http.post<Message>(`${environmentInfirmary.apiURL}/medicalRecord/createExaminationHistory`,
      ExaminationHistoryCreateDtoInfirmary, { headers: this.getHeaders() } );
  }




  // PATIENT STATE CONTROLLER

  /**
   * Kreiranje stanja pacijenta
   * */
  public createPatientState(
    dateExamState: Date, //ovo je Date
    timeExamState: string, //ovo je Time
    temperature: number,
    systolicPressure: number,
    diastolicPressure: number,
    pulse: number,
    therapy: string,
    description: string,
    hospitalizationId: number

  ): Observable<PatientStateDto> {

    console.log(dateExamState)
    console.log(timeExamState)

    const timeExamStateWithSeconds = `${timeExamState}:00`;

    const patientStateCreateDto : PatientStateCreateDto = {
      dateExamState: dateExamState, //ovo je Date
      timeExamState: timeExamStateWithSeconds, //ovo je Time
      temperature: temperature,
      systolicPressure: systolicPressure,
      diastolicPressure: diastolicPressure,
      pulse: pulse,
      therapy: therapy,
      description: description,
      hospitalizationId: hospitalizationId
    }

    return this.http.post<PatientStateDto>(`${environmentInfirmary.apiURL}/patientState/createPatientState`,
      patientStateCreateDto, { headers: this.getHeaders() } );
  }

  /**
   * Pretraga stanja pacijenta po datumu
   * */
  public getPatientStateByDate(
    hospitalizationId: number,
    startDatee: Date,
    endDatee: Date,
    page: number,
    size: number
  ): Observable<Page<PatientStateDto>> {

    // na beku je date u infirmaty, nije Long
    // const startDate = new Date(startDatee)
    // const endDate = new Date(endDatee)

    let httpParams = new HttpParams()
      .append("hospitalizationId", hospitalizationId)
      .append("startDate", startDatee.toString())
      .append("endDate", endDatee.toString())
      .append("page", page)
      .append("size",size)

    console.log(startDatee)
    console.log(endDatee)

    return this.http.get<Page<PatientStateDto>>(
      `${environmentInfirmary.apiURL}/patientState/getPatientStateByDate`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }


  // PRESCRIPTION SEND CONTROLLER

  /**
   * Slanje uputa na lab
   * */
  public sendPrescriptionToLab(
    type: PrescriptionType,
    doctorLbz: string,
    departmentFromId: number,
    departmentToId: number,
    lbp: string,
    creationDateTime: Date, //ovde je timestamp
    status: PrescriptionStatus,
    comment: string,
    referralDiagnosis: string,
    referralReason: string,
    prescriptionAnalysisDtos: PrescriptionAnalysis[]

): Observable<Message> {

    const prescriptionCreateDto : PrescriptionCreateDtoInfirmary = {
      type: type,
      doctorLbz: doctorLbz,
      departmentFromId: departmentFromId,
      departmentToId: departmentToId,
      lbp: lbp,
      creationDateTime: creationDateTime,
      status: status,
      comment: comment,
      prescriptionAnalysisDtos: prescriptionAnalysisDtos
    }

    return this.http.put<Message>(`${environmentInfirmary.apiURL}/prescriptionSend/sendPrescriptionToLab`,
      prescriptionCreateDto, { headers: this.getHeaders() } );
  }


  // VISIT CONTROLLER

  /**
   * Kreiranje posete
   * */
  public createVisit(
    visitorName: string,
    visitorSurname: string,
    visitorJmbg: string,
    visitTime: Date, //ovo je timestamp
    note: string,
    hospitalizationId: number

  ): Observable<VisitDto> {

    const visitCreateDto : VisitCreateDto = {
      visitorName: visitorName,
      visitorSurname: visitorSurname,
      visitorJmbg: visitorJmbg,
      visitTime: visitTime, //ovo je timestamp
      note: note,
      hospitalizationId: hospitalizationId
    }

    return this.http.post<VisitDto>(`${environmentInfirmary.apiURL}/visit/createVisit`,
      visitCreateDto, { headers: this.getHeaders() } );
  }

  /**
   * Pretraga poseta po filteru
   * */
  public getVisitsWithFilter(
    departmentId: number,
    hospitalRoomId: number,
    hospitalizationId: number,
    startDate: Date,
    endDate: Date,
    page: number,
    size: number
  ): Observable<Page<VisitDto>> {

    // na beku je date u infirmaty, nije Long
    // const startDate = new Date(startDatee)
    // const endDate = new Date(endDatee)

    // DA LI CE OVO SA DATUMOM RADITI?

    let httpParams = new HttpParams()
      .append("departmentId", departmentId)
      .append("hospitalRoomId", hospitalRoomId)
      .append("hospitalizationId", hospitalizationId)
      .append("startDate", startDate.toISOString().slice(0,10))
      .append("endDate", endDate.toISOString().slice(0,10))
      .append("page", page)
      .append("size",size)

    console.log(startDate)
    console.log(startDate.toISOString().slice(0,10))


    return this.http.get<Page<VisitDto>>(
      `${environmentInfirmary.apiURL}/visit/getVisitsWithFilter`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }


}
