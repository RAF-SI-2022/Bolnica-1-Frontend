import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment, environmentInfirmary, environmentPatient} from "../../../environments/environment";
import {PatientCreate} from "../../models/patient/PatientCreate";
import {Gender} from "../../models/patient-enums/Gender";
import {CountryCode} from "../../models/patient-enums/CountryCode";
import {MaritalStatus} from "../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../models/patient-enums/ExpertiseDegree";
import {FamilyStatus} from "../../models/patient-enums/FamilyStatus";
import {PatientUpdateClass} from "../../models/patient/PatientUpdate";
import {Vaccination} from "../../models/patient/Vaccination";
import {Allergy} from "../../models/patient/Allergy";
import {GeneralMedicalDataCreate} from "../../models/patient/GeneralMedicalDataCreate";
import {Operation} from "../../models/patient/Operation";
import {OperationCreate} from "../../models/patient/OperationCreate";
import {DiagnosisCode, DiagnosisCodeDto} from "../../models/patient/DiagnosisCode";
import {Anamnesis, AnamnesisDto} from "../../models/patient/Anamnesis";
import {ExaminationHistoryCreate, ExaminationHistoryCreateDto} from "../../models/patient/ExaminationHistoryCreate";
import {TreatmentResult} from "../../models/patient-enums/TreatmentResult";
import {MedicalHistory} from "../../models/patient/MedicalHistory";
import {GeneralMedicalData} from "../../models/patient/GeneralMedicalData";
import {ExaminationHistory} from "../../models/patient/ExaminationHistory";
import {MedicalRecord} from "../../models/patient/MedicalRecord";
import {DeparmentShort, Page, Zaposleni} from "../../models/models";
import {Patient} from "../../models/patient/Patient";
import * as uuid from 'uuid';
import {PatientGeneral} from "../../models/patient/PatientGeneral";
import {PatientGeneralDto} from "../../models/patient/PatientGeneralDto";
import {PrescriptionType} from "../../models/laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../../models/laboratory-enums/PrescriptionStatus";
import {PrescriptionAnalysis} from "../../models/laboratory/PrescriptionAnalysis";
import {PrescriptionCreate} from "../../models/laboratory/PrescriptionCreate";
import {Prescription} from "../../models/laboratory/Prescription";
import {MedicalHistoryCreateDto} from "../../models/patient/MedicalHistoryCreateDto";
import {VaccinationDataDto} from "../../models/patient/VaccinationDataDto";
import {PrescriptionNewDto} from "../../models/prescription/PrescriptionNewDto";
import {CovidExaminationHistoryDto} from "../../models/covid/CovidExaminationHistoryDto";
import {CovidExaminationHistoryCreateDto} from "../../models/covid/CovidExaminationHistoryCreateDto";
import {ScheduledVaccinationCreateDto} from "../../models/vaccination/ScheduledVaccinationCreateDto";
import {ScheduledVaccinationDto} from "../../models/vaccination/ScheduledVaccinationDto";
import {PatientArrival} from "../../models/laboratory-enums/PatientArrival";
import {ScheduledAppointmentDto} from "../../models/infirmary/ScheduledAppointmentDto";
import {CovidStatsResultDto} from "../../models/covid/CovidStatsResultDto";

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
        citizenship: CountryCode,
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

        const obj: PatientCreate = {
            jmbg: jmbg,
            lbp: uuid.v4(),
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
        citizenship: CountryCode,
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

        return this.http.put<HttpStatusCode>(`${environmentPatient.apiURL}/patient/update`, obj, {headers: this.getHeaders()});
    }

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

    public getMedicalHistoryByLbp(lbp: string): Observable<Page <MedicalHistory>> {
        return this.http.get< Page <MedicalHistory>>(`${environmentPatient.apiURL}/info/myFindMedicalHistories/${lbp}`, { headers: this.getHeaders() });
    }

    /**
     * Pronalazenje Examination History pacijenta na osnovu lbp
     * */

    public getExaminationHistoryByLbp(lbp: string): Observable<Page <ExaminationHistory>> {
        return this.http.get<Page<ExaminationHistory>>(`${environmentPatient.apiURL}/info/myFindExaminationHistories/${lbp}`, { headers: this.getHeaders() });
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
        rh: string,
        vaccinationDtos: Vaccination[],
        allergyDtos: Allergy[]
        ): Observable<HttpStatusCode> {

        const obj: GeneralMedicalDataCreate ={
            bloodType: bloodType,
            rh: rh,
            vaccinationDtos: vaccinationDtos,
            allergyDtos: allergyDtos
        }

        return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/record/general_medical_data/${lbp}`, obj, {headers: this.getHeaders()});
    }
  public addVacine(
    lbp: string,
    vaccinationName: string,
    vaccinationDate: Date,
  ): Observable<HttpStatusCode> {

    const obj: VaccinationDataDto ={
      vaccinationName: vaccinationName,
      vaccinationDate: vaccinationDate,
    }
    let httpParams = new HttpParams()
      .append("lbp",lbp)

    return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/record/vaccine/${lbp}`, obj, {params: httpParams, headers:this.getHeaders()});
  }

  getAllergy(): Observable<Allergy[]>{
    return this.http.get<Allergy[]>(`${environmentPatient.apiURL}/record/gather_allergies`, { headers: this.getHeaders() });
  }

  getVaccine(
    covid: boolean
  ): Observable<Vaccination[]>{
    let httpParams = new HttpParams()
      .append("covid", covid)

    return this.http.get<Vaccination[]>(
      `${environmentPatient.apiURL}/record/gather_vaccines`,
      {  params: httpParams, headers: this.getHeaders() });
  }

  getDiagnosis(): Observable<DiagnosisCodeDto[]>{
    return this.http.get<DiagnosisCodeDto[]>(`${environmentPatient.apiURL}/record/gather_diagnosis`, { headers: this.getHeaders() });
  }

  public addAllergy(
    lbp: string,
    allergy: string,
  ): Observable<HttpStatusCode> {
    let httpParams = new HttpParams()
      .append("lbp",lbp)
      .append("allergy", allergy)

    return this.http.post<HttpStatusCode>(
      `${environmentPatient.apiURL}/record/allergy/${lbp}`, {},
      {params: httpParams, headers:this.getHeaders()}
    );
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
        diagnosisCodeDto: DiagnosisCodeDto,
        anamnesisDto: AnamnesisDto
    ): Observable<HttpStatusCode> {

        const obj: ExaminationHistoryCreateDto = {
            examDate: examDate,
            lbz: lbz,
            confidential: confidential,
            objectiveFinding: objectiveFinding,
            advice: advice,
            therapy: therapy,
            diagnosisCodeDto: diagnosisCodeDto,
            anamnesisDto: anamnesisDto
        }

        console.log("dosao do servisa");

        return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/examination/${lbp}`, obj, {headers: this.getHeaders()});
        console.log("prosao servis");
    }

    //predlaganje terapije - examination history
    // public createTherapy(
    //   lbp: string,
    //   examDate: Date,
    //   lbz: string,
    //   confidential: boolean,
    //   objectiveFinding: string,
    //   advice: string,
    //   therapy: string,
    //   DiagnosisCodeDto: DiagnosisCode,
    //   AnamnesisDto: Anamnesis
    // ): Observable<HttpStatusCode> {
    //
    //
    //   const obj: ExaminationHistoryCreate = {
    //     examDate: examDate,
    //     lbz: lbz,
    //     confidential: confidential,
    //     objectiveFinding: objectiveFinding,
    //     advice: advice,
    //     therapy: therapy,
    //     DiagnosisCodeDto: DiagnosisCodeDto,
    //     AnamnesisDto: AnamnesisDto
    //   }
    //
    //   return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/examination/${lbp}`, obj, {headers: this.getHeaders()});
    // }

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

        return this.http.post<HttpStatusCode>(

            `${environmentPatient.apiURL}/examination/diagnosis_history/${lbp}`,obj, {headers: this.getHeaders()}

// conflict
//             `${environmentPatient.apiURL}/examination/diagnosis_history/${lbp}`,obj, {headers: this.getHeaders()}

         //   `${environmentPatient.apiURL}/examination/diagnosis_history/${lbp}`,
          //  obj,
           // {headers: this.getHeaders()}

        );
    }

    public createDiagnosis(
        lbp: string,
        confidential: boolean,
        treatmentResult: TreatmentResult,
        currStateDesc: string,
        diagnosisCodeDto: DiagnosisCodeDto,
        exists: boolean
    ): Observable<HttpStatusCode> {

        const obj: MedicalHistoryCreateDto = {
            confidential : confidential,
            treatmentResult : treatmentResult,
            currStateDesc : currStateDesc,
            diagnosisCodeDto : diagnosisCodeDto,
            exists : exists
        }

      console.log("usao u servis");
        return this.http.post<HttpStatusCode>(

            `${environmentPatient.apiURL}/examination/diagnosis_history/${lbp}`,obj, {headers: this.getHeaders()});
        console.log("prosao servis");
    }


    getExaminationHistoryByDate(lbp: string, datee: Date, page: number, size:number): Observable<Page<ExaminationHistory>> {

        // @ts-ignore
      const date = new Date(datee)

        let httpParams = new HttpParams()
            .append("lbp",lbp)
            .append("date", date.getTime())
            .append("page",page)
            .append("size",size);

        return this.http.get<Page<ExaminationHistory>>(
            `${environmentPatient.apiURL}/info/myFindExaminationHistoriesByLbpAndDatePaged/${lbp}`,
            {params: httpParams, headers:this.getHeaders()}
        );


    }

    getExaminationHistoryByRange(lbp: string, start_datee: Date, end_datee: Date,  page: number, size:number): Observable<Page<ExaminationHistory>> {
      const start_date = new Date(start_datee)
      const end_date = new Date(end_datee)


      let httpParams = new HttpParams()
            .append("lbp",lbp)
            .append("start_date", start_date.getTime())
            .append("end_date", end_date.getTime())
            .append("page",page)
            .append("size",size);

        return this.http.get<Page<ExaminationHistory>>(
            `${environmentPatient.apiURL}/info/myFindExaminationHistoriesByLbpAndDateRangePaged/${lbp}`,
            {params: httpParams, headers:this.getHeaders()}
        );
    }

    getMedicalHistoriesByDiagnosisCodePaged(lbp: string, diagnosisCode: string, page: number, size:number): Observable<Page<MedicalHistory>> {

        let httpParams = new HttpParams()
            .append("lbp",lbp)
            .append("diagnosisCode", diagnosisCode)
            .append("page",page)
            .append("size",size);

        return this.http.get<Page<MedicalHistory>>(
            `${environmentPatient.apiURL}/info/myFindMedicalHistoriesByDiagnosisCodePaged/${lbp}`,
            {params: httpParams, headers:this.getHeaders()}
        );
    }

    getMedicalHistoryByLbpPaged(lbp: string, page: number, size:number): Observable<Page<MedicalHistory>> {

        let httpParams = new HttpParams()
            .append("lbp",lbp)
            .append("page",page)
            .append("size",size);

        return this.http.get<Page<MedicalHistory>>(
            `${environmentPatient.apiURL}/info/myFindMedicalHistoriesPaged/${lbp}`,
            {params: httpParams, headers:this.getHeaders()}
        );
    }

    /**
     * Dohvata sve pacijente
     * trebalo bi da se doda za delete
     * */
    getAllPatients(lbp: string, jmbg:string, name: string, surname: string, page: number, size:number): Observable<Page<Patient>> {
        let httpParams = new HttpParams()
            .append("lbp",lbp)
            .append("jmbg", jmbg)
            .append("name", name)
            .append("surname",surname)
            .append("page",page)
            .append("size",size);

        return this.http.get<Page<Patient>>(
            `${environmentPatient.apiURL}/patient/filter_patients`,
            {params: httpParams, headers:this.getHeaders()}
        );
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

        let httpParams = new HttpParams()
            .append("mainProblems", mainProblems)
            .append("currDisease", currDisease)
            .append("personalAnamnesis", personalAnamnesis)
            .append("familyAnamnesis", familyAnamnesis)
            .append("patientOpinion", patientOpinion)
            .append("objectiveFinding", objectiveFinding)
            .append("selectedCode",selectedCode)
            .append("uToku",uToku)
            .append("existingDiagnosis",existingDiagnosis)
            .append("suggestedTherapies",suggestedTherapies)
            .append("advice",advice);

        return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}""`, httpParams, {headers: this.getHeaders()});
    }


    /**
     * Kreiranje prescription (videti da li je to uput ili recept) TREBA DA IH RAZLIKUJEMO
     * */
    public writePerscription(
        type: PrescriptionType,
        doctorId: number,
        departmentFromId: number,
        departmentToId: number,
        lbp: string,
        creationDateTime: Date, //ovde je timestamp
        status: PrescriptionStatus,
        comment: string,
        referralDiagnosis: string,
        referralReason: string,
        prescriptionAnalysisDtos: PrescriptionAnalysis[]
    ): Observable<HttpStatusCode> {

        const obj: PrescriptionCreate = {
            type: type,
            doctorId: doctorId,
            departmentFromId: departmentFromId,
            departmentToId: departmentToId,
            lbp: lbp,
            creationDateTime: creationDateTime, //ovde je timestamp
            status: status,
            comment: comment,
            referralDiagnosis: referralDiagnosis,
            referralReason: referralReason,
            prescriptionAnalysisDtos: prescriptionAnalysisDtos
        }

        console.log(obj.type)
        console.log(obj.lbp)
        console.log(obj.comment)
        console.log(obj.status)
        console.log(obj.creationDateTime)


        return this.http.post<HttpStatusCode>(`${environmentPatient.apiURL}/prescription/lab_prescription`, obj, {headers: this.getHeaders()});
    }

    /**
     * Azuriranje prescription
     * */
    public putPerscription(
        type: PrescriptionType,
        doctorId: number,
        departmentFromId: number,
        departmentToId: number,
        lbp: string,
        creationDateTime: Date, //ovde je timestamp
        status: PrescriptionStatus,
        comment: string,
        referralDiagnosis: string,
        referralReason: string,
        prescriptionAnalysisDtos: PrescriptionAnalysis[]

    ): Observable<HttpStatusCode> {

        const obj: PrescriptionCreate = {
            type: type,
            doctorId: doctorId,
            departmentFromId: departmentFromId,
            departmentToId: departmentToId,
            lbp: lbp,
            creationDateTime: creationDateTime, //ovde je timestamp
            status: status,
            comment: comment,
            referralDiagnosis: referralDiagnosis,
            referralReason: referralReason,
            prescriptionAnalysisDtos: prescriptionAnalysisDtos
        }

        return this.http.put<HttpStatusCode>(`${environmentPatient.apiURL}/patient/prescription`, obj, {headers: this.getHeaders()});
    }


    /**
     * Brisanje pacijenta
     * Permisije ce imati VISA_MED_SESTRA
     * Moze i da vraca Message
     * */
    public deletePerscription(id: number) {
        return this.http.delete<HttpStatusCode>(`${environmentPatient.apiURL}/prescription/lab_prescription/${id}`, {headers: this.getHeaders()})
    }

    /**
     * Svi prescriptions vezani za pacijenta
     * */
    public getPrescriptions(
        dateFromm: Date,
        dateToo: Date,
        lbp: string,
        page: number,
        size:number): Observable<Page<Prescription>> {

      const dateFrom = new Date(dateFromm)
      const dateTo = new Date(dateToo)


      let httpParams = new HttpParams()
            .append("dateFrom", dateFrom.getTime())
            .append("dateTo", dateTo.getTime())
            .append("page",page)
            .append("size",size);

        return this.http.get<Page<Prescription>>(
            `${environmentPatient.apiURL}/prescription/done_prescriptions/${lbp}`,
            {params: httpParams, headers:this.getHeaders()}
        );
    }

  public getPrescriptionsForDoctor(
    lbz:string,
    lbp: string,
    page: number,
    size:number): Observable<Page<PrescriptionNewDto>> {


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
   * KOVID DEO NOVE RUTE
   * */

  public createCovidExaminationHistory(
    examDate: Date,
    lbz: string,
    medicalRecordId: number,

    lbp: string,
    symptoms: string,
    duration: string,
    bodyTemperature: number,
    bloodPressure: number,
    saturation: number,
    lungCondition: string,
    therapy: string

  ): Observable<CovidExaminationHistoryDto> {

    const obj: CovidExaminationHistoryCreateDto = {
      examDate: examDate,
      lbz: lbz,
      medicalRecordId: medicalRecordId,
      lbp: lbp,
      symptoms: symptoms,
      duration: duration,
      bodyTemperature: bodyTemperature,
      bloodPressure: bloodPressure,
      saturation: saturation,
      lungCondition: lungCondition,
      therapy: therapy
    }


    return this.http.post<CovidExaminationHistoryDto>(
      `${environmentPatient.apiURL}/examination/covid/${lbp}`, obj,
      {headers: this.getHeaders()});

  }

  public getCovidExaminationHistoryByLbp(
    lbp: string,
    page: number,
    size:number
  ): Observable<Page<CovidExaminationHistoryDto>> {


    let httpParams = new HttpParams()
      .append("page",page)
      .append("size",size);

    return this.http.get<Page<CovidExaminationHistoryDto>>(
      `${environmentPatient.apiURL}/examination/covid/${lbp}`,
      {params: httpParams, headers:this.getHeaders()}
    );


  }


  /**
   * KOVID VAKCINE
   * */


  public scheduleVaccination(
    dateAndTime: Date,
    note: string,
    lbz: string,
    vaccinationId: number,
    lbp: string
  ): Observable<ScheduledVaccinationDto> {

    const obj: ScheduledVaccinationCreateDto = {
      dateAndTime: dateAndTime,
      note: note,
      lbz: lbz,
      vaccinationId: vaccinationId,
      lbp: lbp
    }

    return this.http.post<ScheduledVaccinationDto>(
      `${environmentPatient.apiURL}/patient/scheduleVaccination/${lbp}`, obj,
      {headers: this.getHeaders()});

  }

  public updateScheduledVaccination(
    scheduledVaccinationId: number,
    arrivalStatus: PatientArrival
  ): Observable<ScheduledVaccinationDto>{

    let httpParams = new HttpParams()
      .append("scheduledVaccinationId", scheduledVaccinationId)
      .append("arrivalStatus",arrivalStatus)

    return this.http.put<ScheduledVaccinationDto>(
      `${environmentPatient.apiURL}/patient/updateScheduledVaccination`, '',
      {params: httpParams,headers: this.getHeaders()});

  }

  public findScheduledVaccinationsWithFilter(
    page: number,
    size: number,
    startDate: Date,
    endDate: Date,
    lbp:string,
    lbz: string,
    covid: boolean,
    arrivalStatus: PatientArrival

  ): Observable<Page<ScheduledVaccinationDto>> {

    let httpParams = new HttpParams()
      .append("page", page)
      .append("size",size)
      .append("startDate", startDate.toString())
      .append("endDate",endDate.toString())
      .append("lbp",lbp)
      .append("lbz",lbz)
      .append("covid",covid)
      .append("arrivalStatus",arrivalStatus)

    return this.http.get<Page<ScheduledVaccinationDto>>(
      `${environmentPatient.apiURL}/patient/findScheduledVaccinationsWithFilter`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }


  /**
   * Kovid sertifikat
   * */

  public sendVaccinationCertificateToMail(
    lbp: string
  ): Observable<HttpStatusCode> {

    let httpParams = new HttpParams()
      .append("lbp",lbp)

    return this.http.post<HttpStatusCode>(
      `${environmentPatient.apiURL}/patient/sendVaccinationCertificateToMail`,'',
      {params: httpParams, headers:this.getHeaders()}
    );

  }


  public getCovidStats(
    page: number,
    size: number,
    startDate: Date,
    endDate: Date,
    gender:string,
    ageCategory: number,

  ): Observable<CovidStatsResultDto> {


    let httpParams = new HttpParams()

    if (gender== 'SVI'){
      httpParams = httpParams
        .append("page", page)
        .append("size",size)
        .append("startDate", startDate.toString())
        .append("endDate",endDate.toString())
        .append("ageCategory",ageCategory)
    } else if (gender == 'MUSKI'){
      httpParams = httpParams
        .append("page", page)
        .append("size",size)
        .append("startDate", startDate.toString())
        .append("endDate",endDate.toString())
        .append("gender", "MUSKO")
        .append("ageCategory",ageCategory)
    } else if (gender == 'ZENSKI') {
      httpParams = httpParams
        .append("page", page)
        .append("size", size)
        .append("startDate", startDate.toString())
        .append("endDate", endDate.toString())
        .append("gender", "ZENSKO")
        .append("ageCategory", ageCategory)
    }



    return this.http.get<CovidStatsResultDto>(
      `${environmentPatient.apiURL}/covid_stats`,
      {params: httpParams, headers:this.getHeaders()}
    );
  }

}




