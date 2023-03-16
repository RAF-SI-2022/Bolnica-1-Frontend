import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environmentPatient} from "../../../environments/environment";
import {PatientCreate} from "../../models/patient/PatientCreate";
import {Gender} from "../../models/patient-enums/Gender";
import {CountyCode} from "../../models/patient-enums/CountyCode";
import {MaritalStatus} from "../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../models/patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../../models/patient-enums/FamilyStatus";
import {PatientUpdate} from "../../models/patient/PatientUpdate";
import {Vaccination} from "../../models/patient/Vaccination";
import {Allergy} from "../../models/patient/Allergy";
import {GeneralMedicalDataCreate} from "../../models/patient/GeneralMedicalDataCreate";
import {Operation} from "../../models/patient/Operation";
import {OperationCreate} from "../../models/patient/OperationCreate";
import {DiagnosisCode} from "../../models/patient/DiagnosisCode";
import {Anamnesis} from "../../models/patient/Anamnesis";
import {ExaminationHistoryCreate} from "../../models/patient/ExaminationHistoryCreate";
import {TreatmentResult} from "../../models/patient-enums/TreatmentResult";
import {MedicalHistory} from "../../models/patient/MedicalHistory";
import {GeneralMedicalData} from "../../models/patient/GeneralMedicalData";
import {ExaminationHistory} from "../../models/patient/ExaminationHistory";
import {MedicalRecord} from "../../models/patient/MedicalRecord";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private router: Router) { }


  /**
   * Header za autentifikaciju i autorizaciju
   * */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  }


  /**
   * Registrovanje pacijenata (dodavanje novog pacijenta)
   * Permisije ce imati MED_SESTRA, VISA_MED_SESTRA
   * Moze i da vraca Patient
   * */
  public registerPatient(
    jmbg: string,
    lbp: string,
    name: string,
    parentName: string,
    surname: string,
    gender: Gender,
    dateOfBirth: Date,
    dateAndTimeOfDeath: Date, // kako se prikazuje timestamp?
    birthPlace: string,
    placeOfLiving: string,
    citizenship: CountyCode,
    phone: string,
    email: string,
    guardianJmbg: string,
    guardianNameAndSurname: string,
    maritalStatus: MaritalStatus,
    numOfChildren: number,
    expertiseDegree: ExpertiseDegree,
    profession: string,
    familyStatus: FamilyStatus,
    registerDate: Date
  ): Observable<HttpStatusCode> {


    const obj: PatientCreate ={
      jmbg: jmbg,
      lbp: lbp,
      name: name,
      parentName: parentName,
      surname: surname,
      gender: gender,
      dateOfBirth: dateOfBirth,
      dateAndTimeOfDeath: dateAndTimeOfDeath, // kako se prikazuje timestamp?
      birthPlace: birthPlace,
      placeOfLiving: placeOfLiving,
      citizenship: citizenship,
      phone: phone,
      email: email,
      guardianJmbg: guardianJmbg,
      guardianNameAndSurname: guardianNameAndSurname,
      maritalStatus: maritalStatus,
      numOfChildren: numOfChildren,
      expertiseDegree: expertiseDegree,
      profession: profession,
      familyStatus: familyStatus,
      registerDate: registerDate
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/patient/register`,  obj, { headers: this.getHeaders() } );
  }


  /**
   * Azuriranje pacijenta
   * Permisije ce imati MED_SESTRA, VISA_MED_SESTRA
   * Moze i da vraca Patient
   *
   *
   * proveriti sa bekom da li je ruta dobra? trebalo bi da je izmene
   * */

  public updatePatient(
    jmbg: string,
    lbp: string,
    name: string,
    parentName: string,
    surname: string,
    gender: Gender,
    dateOfBirth: Date,
    dateAndTimeOfDeath: Date, // kako se prikazuje timestamp?
    birthPlace: string,
    placeOfLiving: string,
    citizenship: CountyCode,
    phone: string,
    email: string,
    guardianJmbg: string,
    guardianNameAndSurname: string,
    maritalStatus: MaritalStatus,
    numOfChildren: number,
    expertiseDegree: ExpertiseDegree,
    profession: string,
    familyStatus: FamilyStatus,
    deleted: boolean
  ): Observable<HttpStatusCode> {


    const obj: PatientUpdate ={
      jmbg: jmbg,
      lbp: lbp,
      name: name,
      parentName: parentName,
      surname: surname,
      gender: gender,
      dateOfBirth: dateOfBirth,
      dateAndTimeOfDeath: dateAndTimeOfDeath, // kako se prikazuje timestamp?
      birthPlace: birthPlace,
      placeOfLiving: placeOfLiving,
      citizenship: citizenship,
      phone: phone,
      email: email,
      guardianJmbg: guardianJmbg,
      guardianNameAndSurname: guardianNameAndSurname,
      maritalStatus: maritalStatus,
      numOfChildren: numOfChildren,
      expertiseDegree: expertiseDegree,
      profession: profession,
      familyStatus: familyStatus,
      deleted: deleted
    }

  return this.http.put<HttpStatusCode>(`${environmentPatient.apiURL}/patient/${lbp}`,  obj, { headers: this.getHeaders() } );
  }


  /**
   * Brisanje pacijenta
   * Permisije ce imati VISA_MED_SESTRA
   * Moze i da vraca Message
   * */
  public deletePatient(lbp: string) {
    return this.http.delete<HttpStatusCode>(`${environmentPatient.apiURL}/patient/delete/${lbp}`, { headers: this.getHeaders() })
  }


  /**
   * Pronalazenje General Medical Data pacijenta na osnovu lbp
   * */
  public getGeneralMedicalDataByLbp(lbp: string): Observable<GeneralMedicalData> {
    return this.http.get<GeneralMedicalData>(`${environmentPatient.apiURL}/info/myFindGMD/${lbp}`, { headers: this.getHeaders() });
  }

  /**
   * Pronalazenje operacija pacijenta na osnovu lbp
   * */
  public getOperationsByLbp(lbp: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environmentPatient.apiURL}/info/myFindOperations/${lbp}`, { headers: this.getHeaders() });
  }

  /**
   * Pronalazenje Medical History (istorije pacijenta) na osnovu lbp
   * */
  public getMedicalHistoryByLbp(lbp: string): Observable<MedicalHistory[]> {
    return this.http.get<MedicalHistory[]>(`${environmentPatient.apiURL}/info/myFindMedicalHistories/${lbp}`, { headers: this.getHeaders() });
  }

  /**
   * Pronalazenje Examination History pacijenta na osnovu lbp
   * */
  public getExaminationHistoryByLbp(lbp: string): Observable<ExaminationHistory[]> {
    return this.http.get<ExaminationHistory[]>(`${environmentPatient.apiURL}/info/myFindExaminationHistories/${lbp}`, { headers: this.getHeaders() });
  }

  /**
   * Pronalazenje Medicinskog kartona pacijenta (Medical Record) na osnovu lbp
   * */
  public getMedicalRecordByLbp(lbp: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${environmentPatient.apiURL}/info/myFindMedicalRecord/${lbp}`, { headers: this.getHeaders() });
  }


  /**
   * Kreiranje novog Medical Data
   * Moze i da vraca GeneralMedicalData
   * */
  public createMedicalData(
    lbp:string,
    bloodType: string,
    rH: string,
    vaccinationDtos: Vaccination[],
    allergyDtos: Allergy[]
  ): Observable<HttpStatusCode>{


    const obj: GeneralMedicalDataCreate ={
      bloodType: bloodType,
      rH: rH,
      vaccinationDtos: vaccinationDtos,
      allergyDtos: allergyDtos
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/record/general_medical_data/${lbp}`,  obj, { headers: this.getHeaders() } );
  }


  /**
   * Kreiranje nove operacije
   * Moze i da vraca Operation
   * */
  public createOperation(
    lbp: string,
    operationDate: Date,
    hospitalId: number,
    departmentId: number,
    description: string
  ): Observable<HttpStatusCode>{


    const obj: OperationCreate ={
      operationDate: operationDate,
      hospitalId: hospitalId,
      departmentId: departmentId,
      description: description
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/record/operation/${lbp}`,  obj, { headers: this.getHeaders() } );
  }


  /**
   * Kreiranje ExaminationHistory
   * dodavanje pregleda
   * Moze i da vraca ExaminationHistory
   * */
  public createExaminationHistory(
    lbp: string,
    examDate: Date,
    lbz: string,
    confidential: boolean,
    objectiveFinding: string,
    advice: string,
    therapy: string,
    DiagnosisCodeDto: DiagnosisCode,
    AnamnesisDto: Anamnesis
  ): Observable<HttpStatusCode>{


    const obj: ExaminationHistoryCreate ={
      examDate: examDate,
      lbz: lbz,
      confidential: confidential,
      objectiveFinding: objectiveFinding,
      advice: advice,
      therapy: therapy,
      DiagnosisCodeDto: DiagnosisCodeDto,
      AnamnesisDto: AnamnesisDto
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/examination/${lbp}`,  obj, { headers: this.getHeaders() } );
  }


  /**
   * Kreiranje Dijagnoze
   * Moze i da vraca MedicalHistory
   * */
  public createDiagnosisHistory(
    lbp: string,
    startDate: Date,
    endDate: Date,
    treatmentResult: TreatmentResult,
    currStateDesc: string,
    validFrom: Date,
    validTo : Date,
    valid: boolean,
    diagnosisCodeDto: DiagnosisCode
  ): Observable<HttpStatusCode>{


    const obj: MedicalHistory ={
      startDate: startDate,
      endDate: endDate,
      treatmentResult: treatmentResult,
      currStateDesc: currStateDesc,
      validFrom: validFrom,
      validTo : validTo,
      valid: valid,
      diagnosisCodeDto: diagnosisCodeDto
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/examination/diagnosis_history/${lbp}`,  obj, { headers: this.getHeaders() } );
  }




}
