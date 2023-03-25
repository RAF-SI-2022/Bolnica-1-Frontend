import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment, environmentPatient} from "../../../environments/environment";
import {PatientCreate} from "../../models/patient/PatientCreate";
import {Gender} from "../../models/patient-enums/Gender";
import {CountyCode} from "../../models/patient-enums/CountyCode";
import {MaritalStatus} from "../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../models/patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../../models/patient-enums/FamilyStatus";
import {PatientUpdateClass} from "../../models/patient/PatientUpdate";
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
import {Page, Zaposleni} from "../../models/models";
import {Patient} from "../../models/patient/Patient";
import * as uuid from 'uuid';
import {PatientGeneral} from "../../models/patient/PatientGeneral";
import {PatientGeneralDto} from "../../models/patient/PatientGeneralDto";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private router: Router) {
  }


  /**
   * Header za autentifikaciju i autorizaciju
   * */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }


  /**
   * Registrovanje pacijenata (dodavanje novog pacijenta)
   * Permisije ce imati MED_SESTRA, VISA_MED_SESTRA
   * Moze i da vraca Patient
   * */
  public registerPatient(
    jmbg: string,
    name: string,
    parentName: string,
    surname: string,
    // gender: Gender,
    gender: string,
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


    const lbp = uuid.v4();

    const obj: PatientCreate = {
      jmbg: jmbg,
      lbp: lbp,
      name: name,
      parentName: parentName,
      surname: surname,
      // gender: Gender.MUSKO,
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

    console.log("patient name: " + obj.name)
    console.log("patient surname:" + obj.surname)
    console.log("patient jmbg: " + obj.jmbg)
    console.log("patient lbp" + obj.lbp)
    console.log("patient parentName" + obj.parentName)
    console.log("patient gender" + obj.gender)
    console.log("patient birth place" + obj.birthPlace)
    console.log("patient place of living" + obj.placeOfLiving)
    console.log("patient citizenship" + obj.citizenship)
    console.log("patient phone "+obj.phone)
    console.log("patient email "+ obj.email)
    console.log("patient guardianJmbg " + obj.guardianJmbg)
    console.log("patient guardian name and surname " + obj.guardianNameAndSurname)
    console.log("patient marital status "+ obj.maritalStatus)
    console.log("patient num of children " + obj.numOfChildren)
    console.log("patient expertise degree " + obj.expertiseDegree)
    console.log("patient profession " + obj.profession)
    console.log("patient family status " + obj.familyStatus)

    console.log("patient date of birth" + obj.dateOfBirth)
    console.log("patient date and time of death" + obj.dateAndTimeOfDeath)


    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/patient/register`, obj, {headers: this.getHeaders()});
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
    lbp: string,
    jmbg: string,
    name: string,
    parentName: string,
    surname: string,
    gender: string,
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


    const obj: PatientUpdateClass = {
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

    return this.http.put<HttpStatusCode>(`${environmentPatient.apiURL}/patient/update/${lbp}`, obj, {headers: this.getHeaders()});
  }

  //dodat get patient by lbp
  public getPatientByLbp(lbp: string): Observable<PatientGeneralDto> {
    return this.http.get<PatientGeneralDto>(`${environmentPatient.apiURL}/patient/find_patient/${lbp}`, {headers: this.getHeaders()});
  }



  /**
   * Brisanje pacijenta
   * Permisije ce imati VISA_MED_SESTRA
   * Moze i da vraca Message
   * */
  public deletePatient(lbp: string) {
    return this.http.delete<HttpStatusCode>(`${environmentPatient.apiURL}/patient/delete/${lbp}`, {headers: this.getHeaders()})
  }


  /**
   * Pronalazenje General Medical Data pacijenta na osnovu lbp
   * */
  public getGeneralMedicalDataByLbp(lbp: string): Observable<GeneralMedicalData> {
    return this.http.get<GeneralMedicalData>(`${environmentPatient.apiURL}/info/myFindGMD/${lbp}`, {headers: this.getHeaders()});
  }

  /**
   * Pronalazenje operacija pacijenta na osnovu lbp
   * */
  public getOperationsByLbp(lbp: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environmentPatient.apiURL}/info/myFindOperations/${lbp}`, {headers: this.getHeaders()});
  }

  /**
   * Pronalazenje Medical History (istorije pacijenta) na osnovu lbp
   * */
  public getMedicalHistoryByLbp(lbp: string): Observable<MedicalHistory[]> {
    return this.http.get<MedicalHistory[]>(`${environmentPatient.apiURL}/info/myFindMedicalHistories/${lbp}`, {headers: this.getHeaders()});
  }

  /**
   * Pronalazenje Examination History pacijenta na osnovu lbp
   * */
  public getExaminationHistoryByLbp(lbp: string): Observable<ExaminationHistory[]> {
    return this.http.get<ExaminationHistory[]>(`${environmentPatient.apiURL}/info/myFindExaminationHistories/${lbp}`, {headers: this.getHeaders()});
  }

  /**
   * Pronalazenje Medicinskog kartona pacijenta (Medical Record) na osnovu lbp
   * */
  public getMedicalRecordByLbp(lbp: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${environmentPatient.apiURL}/info/myFindMedicalRecord/${lbp}`, {headers: this.getHeaders()});
  }


  /**
   * Kreiranje novog Medical Data
   * Moze i da vraca GeneralMedicalData
   * */
  public createMedicalData(
    lbp: string,
    bloodType: string,
    rH: string,
    vaccinationDtos: Vaccination[],
    allergyDtos: Allergy[]
  ): Observable<HttpStatusCode> {


    const obj: GeneralMedicalDataCreate = {
      bloodType: bloodType,
      rH: rH,
      vaccinationDtos: vaccinationDtos,
      allergyDtos: allergyDtos
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/record/general_medical_data/${lbp}`, obj, {headers: this.getHeaders()});
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
  ): Observable<HttpStatusCode> {


    const obj: OperationCreate = {
      operationDate: operationDate,
      hospitalId: hospitalId,
      departmentId: departmentId,
      description: description
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/record/operation/${lbp}`, obj, {headers: this.getHeaders()});
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
  ): Observable<HttpStatusCode> {


    const obj: ExaminationHistoryCreate = {
      examDate: examDate,
      lbz: lbz,
      confidential: confidential,
      objectiveFinding: objectiveFinding,
      advice: advice,
      therapy: therapy,
      DiagnosisCodeDto: DiagnosisCodeDto,
      AnamnesisDto: AnamnesisDto
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/examination/${lbp}`, obj, {headers: this.getHeaders()});
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
    validTo: Date,
    valid: boolean,
    diagnosisCodeDto: DiagnosisCode
  ): Observable<HttpStatusCode> {


    const obj: MedicalHistory = {
      startDate: startDate,
      endDate: endDate,
      treatmentResult: treatmentResult,
      currStateDesc: currStateDesc,
      validFrom: validFrom,
      validTo: validTo,
      valid: valid,
      diagnosisCodeDto: diagnosisCodeDto
    }

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/examination/diagnosis_history/${lbp}`, obj, {headers: this.getHeaders()});
  }


  getAllPatients(name: string, surname: string, jmbg: string, lbp: string, page: number, size: number): Observable<Page<Patient>> {
    let httpParams = new HttpParams().append("name", name).append("surname", surname).append("jmbg", jmbg).append("lbp", lbp).append("page", page).append("size", size);
    //todo proveri ovu rutu kad dodaju
    return this.http.get<Page<Patient>>(`${environment.apiURL}/patient/list`, {
      params: httpParams,
      headers: this.getHeaders()
    });
  }

  public saveReport(
    mainProblems: string,
    currDisease: string,
    personalAnamnesis: string,
    familyAnamnesis: string,
    patientOpinion: string,
    objectiveFinding: string,
    selectedCode: string,
    uToku: boolean,
    existingDiagnosis: string,
    suggestedTherapies: string,
    advice: string,

  ): Observable<HttpStatusCode> {

    let httpParams = new HttpParams().append("mainProblems", mainProblems).append("currDisease", currDisease).append("personalAnamnesis", personalAnamnesis).append("familyAnamnesis", familyAnamnesis).append("patientOpinion", patientOpinion).append("objectiveFinding", objectiveFinding)
      .append("selectedCode",selectedCode).append("uToku",uToku).append("existingDiagnosis",existingDiagnosis).append("suggestedTherapies",suggestedTherapies).append("advice",advice);


    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}""`, httpParams, {headers: this.getHeaders()});


  }
}




