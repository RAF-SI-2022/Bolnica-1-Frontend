import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralMedicalData} from "../../../models/patient/GeneralMedicalData";
import {PatientService} from "../../../services/patient-service/patient.service";
import {ActivatedRoute} from "@angular/router";
import {MedicalHistory} from "../../../models/patient/MedicalHistory";
import {Page} from "../../../models/models";
import {ExaminationHistory} from "../../../models/patient/ExaminationHistory";
import {Allergy} from "../../../models/patient/Allergy";
import {Vaccination} from "../../../models/patient/Vaccination";
import {Prescription} from "../../../models/laboratory/Prescription";
import {LabAnalysis} from "../../../models/laboratory/LabAnalysis";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";
import {LabWorkOrderWithAnalysis} from "../../../models/laboratory/LabWorkOrderWithAnalysis";
import {PrescriptionStatus} from "../../../models/laboratory-enums/PrescriptionStatus";
import {VaccinationType} from "../../../models/patient-enums/VaccinationType";

@Component({
  selector: 'app-doctor-medical-chart',
  templateUrl: './doctor-medical-chart.component.html',
  styleUrls: ['./doctor-medical-chart.component.css']
})
export class DoctorMedicalChartComponent implements OnInit {

    generalForm: FormGroup
    allergyForm: FormGroup
    vaccineForm: FormGroup
    examinationForm: FormGroup
    medicalForm: FormGroup
    prescriptionForm: FormGroup
    labaratoryForm: FormGroup
    delete: boolean = false
    doctor: boolean = false
    obradjeni: boolean = false
    lbp: string = ''
    lbz: string = ''
    id: number = 0
    defaultId: number = 0
    idStr: string = ''
    public idPrescription: number = 0
    public dateFrom: string = ''
    public dateTo: string = ''
    public correctDate: string = ''
    public diagnosis: string = ''
    public dateToPrescription: string = ''
    public dateFromPrescription: string = ''
    public dateToLabaratory: Date = new Date()
    public dateFromLabaratory: Date = new Date()
    medicalHistories: MedicalHistory [] = []
    examinationHistories: ExaminationHistory [] = []
    prescriptionHistories: Prescription [] = []
    labaratoryHistories: LabAnalysis [] = []
    labWorkOrders: LabWorkOrder [] = []

    //todo kojom rutom ovo popunjavam ??
    detailsLabWorkOrders: LabWorkOrderWithAnalysis [] = []
    medicalPage: Page<MedicalHistory> = new Page<MedicalHistory>()
    prescriptionPage: Page<Prescription> = new Page<Prescription>()
    labWorkOrderPage: Page<LabWorkOrder> = new Page<LabWorkOrder>()
    detailsLabWorkOrderPage: Page<LabWorkOrderWithAnalysis> = new Page<LabWorkOrderWithAnalysis>()

    examinationPage: Page<ExaminationHistory> = new Page<ExaminationHistory>()
    allergy: Allergy
    allergy2: Allergy
    vaccionation: Vaccination
    vaccinationsList: Vaccination [] = []
    allergiesList: Allergy [] = []
    vaccination_PRIORIX: Vaccination
    vaccination_HIBERIX: Vaccination
    vaccination_INFLUVAC: Vaccination
    vaccination_SYNFLORIX: Vaccination
    vaccination_BCGVAKCINA: Vaccination
    patientName: string = ''
    page = 0
    pageSize = 5
    total = 0


    generalMedical: GeneralMedicalData

    constructor(private formBuilder: FormBuilder, private patientService: PatientService,  private route: ActivatedRoute, private labaratoryService: LaboratoryService) {
      this.generalMedical = {
        id: 0,
        bloodType: '',
        rh: '',
        vaccinationDtos: [],
        allergyDtos: []
      };
        this.allergy = new Allergy("")
        this.allergy2 = new Allergy("")

        this.vaccionation = new Vaccination("", VaccinationType.BACTERIA , "" , "", new Date())
        this.vaccination_PRIORIX = new Vaccination("PRIORIX", VaccinationType.VIRUS, "Vakcina protiv morbila (malih boginja)", "GlaxoSmithKline Biologicals S.A., Belgija", new Date())
        this.vaccination_HIBERIX = new Vaccination("HIBERIX", VaccinationType.BACTERIA, "Kapsulirani antigen hemofilus influence tip B", "GlaxoSmithKline Biologicals S.A., Belgija", new Date())
        this.vaccination_INFLUVAC = new Vaccination("INFLUVAC", VaccinationType.VIRUS, "Virusne vakcine protiv influence (grip)", "Abbott Biologicals B.V., Holandija", new Date())
        this.vaccination_SYNFLORIX = new Vaccination("SYNFLORIX", VaccinationType.BACTERIA,  "Vakcine protiv pneumokoka", "GlaxoSmithKline Biologicals S.A., Belgija", new Date())
        this.vaccination_BCGVAKCINA = new Vaccination("BCGVAKCINA", VaccinationType.BACTERIA, "Vakcine protiv tuberkuloze", "Institut za virusologiju, vakcine i serume \"Torlak\", Republika Srbija", new Date())

        this.generalForm = this.formBuilder.group({
            bloodGroup: ['', [Validators.required]],
            rhFactor: ['', [Validators.required]]
        })
        this.allergyForm = this.formBuilder.group({
            allergen: ['', [Validators.required]]
        })
        this.vaccineForm = this.formBuilder.group({
            vaccine: ['', [Validators.required]],
            dateOfReceiving: ['', [Validators.required]]
        })
        this.examinationForm = this.formBuilder.group({
            dateFrom: '',
            dateTo: '',
            correctDate: ''
        })
        this.medicalForm = this.formBuilder.group({
            diagnosis: ''
        })
        this.prescriptionForm = this.formBuilder.group({
            dateFromPrescription: '',
            dateToPrescription: '',
            deleteButton: ''
        })
        this.labaratoryForm = this.formBuilder.group({
            dateFrom: '',
            dateTo: '',
        })
    }

    ngOnInit(): void {
        this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
        // @ts-ignore
        this.lbz  = localStorage.getItem('LBZ')
        // @ts-ignore
        this.idStr = localStorage.getItem('ID')
        this.id = this.idStr ? parseInt(this.idStr) : this.defaultId;
        this.generalForm.get('bloodGroup')?.disable()
        this.generalForm.get('rhFactor')?.disable()
        this.getGeneralMedical(this.lbp)
        this.getMedicalHistoryByDiagnosisCode()
        this.getExaminationHistory()
        //this.getPrescriptions()
        //this.getLabaratory()
    }

    updateGeneral(): void {
        this.generalForm.get('bloodGroup')?.enable()
        this.generalForm.get('rhFactor')?.enable()
    }

    getGeneralMedical(lbp: string): void {
      this.patientService.getGeneralMedicalDataByLbp(lbp).subscribe(result => {

        if(!result){
          this.generalMedical.vaccinationDtos = []
          this.generalMedical.bloodType = ''
          this.generalMedical.rh = ''
          this.generalMedical.allergyDtos = []

        }else {
          this.generalMedical = result
          this.vaccinationsList = result.vaccinationDtos
          this.allergiesList = result.allergyDtos
        }
        })
    }

    saveGeneralMedical(): void {
        this.patientService.createMedicalData(
            this.lbp,this.generalForm.get('bloodGroup')?.value,this.generalForm.get('rhFactor')?.value,
            this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(result => {});
    }

    saveAllergy(): void {
        this.allergy = new Allergy(this.allergyForm.get('allergen')?.value)
        this.generalMedical.allergyDtos.push(this.allergy)
        this.patientService.createMedicalData(this.lbp, this.generalMedical.bloodType,this.generalMedical.rh,
        this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(result => {
          this.getGeneralMedical(this.lbp)
        })
    }

    saveVaccine(): void {
        if(this.vaccineForm.get('vaccine')?.value == "PRIORIX"){
            this.vaccination_PRIORIX.vaccinationDate = this.vaccineForm.get('dateOfReceiving')?.value
            this.vaccionation = this.vaccination_PRIORIX
        }
        if(this.vaccineForm.get('vaccine')?.value == "HIBERIX"){
            this.vaccination_HIBERIX.vaccinationDate = this.vaccineForm.get('dateOfReceiving')?.value
            this.vaccionation = this.vaccination_HIBERIX
        }
        if(this.vaccineForm.get('vaccine')?.value == "INFLUVAC"){
            this.vaccination_INFLUVAC.vaccinationDate = this.vaccineForm.get('dateOfReceiving')?.value
            this.vaccionation = this.vaccination_INFLUVAC
        }
        if(this.vaccineForm.get('vaccine')?.value == "SYNFLORIX"){
            this.vaccination_SYNFLORIX.vaccinationDate = this.vaccineForm.get('dateOfReceiving')?.value
            this.vaccionation = this.vaccination_SYNFLORIX
        }
        if(this.vaccineForm.get('vaccine')?.value == "BCGVAKCINA"){
            this.vaccination_BCGVAKCINA.vaccinationDate = this.vaccineForm.get('dateOfReceiving')?.value
            this.vaccionation = this.vaccination_BCGVAKCINA
        }
        this.generalMedical.vaccinationDtos.push(this.vaccionation)
        this.patientService.createMedicalData(this.lbp, this.generalMedical.bloodType,this.generalMedical.rh,
        this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(result => {
          this.getGeneralMedical(this.lbp)

        });
    }

    getExaminationHistory(): void {
        this.patientService.getExaminationHistoryByLbp(this.lbp).subscribe(
        response => {
            console.log("Istorija pregleda")
            this.examinationPage = response
            this.examinationHistories = this.examinationPage.content
            this.total = this.examinationPage.totalElements
        })
    }

    getExaminationHistoryChoose(): void {
        if(this.correctDate != ''){
            this.getExaminationHistoryWithDate()
        }else{
            this.getExaminationHistoryWithRange()
        }
    }

    getExaminationHistoryWithDate(): void {
            console.log("Istorija pregleda jedan datum")

            this.patientService.getExaminationHistoryByDate(this.lbp, this.correctDate,this.page-1, this.pageSize).subscribe(
                response => {
                    this.examinationPage = response
                    this.examinationHistories = this.examinationPage.content
                    this.total = this.examinationPage.totalElements
                })
            this.correctDate = ''
    }

    getExaminationHistoryWithRange(): void {
        console.log("Istorija pregleda dva datuma")

        this.patientService.getExaminationHistoryByRange(this.lbp, this.dateFrom, this.dateTo, this.page-1, this.pageSize).subscribe(
        response => {
            this.examinationPage = response
            this.examinationHistories = this.examinationPage.content
            this.total = this.examinationPage.totalElements
        })
        this.dateFrom = ''
        this.dateTo = ''
    }

    getMedicalHistoryByDiagnosisCode(): void {
        this.patientService.getMedicalHistoriesByDiagnosisCodePaged(this.lbp, this.diagnosis, this.page-1, this.pageSize).subscribe(
        response => {
            this.medicalPage = response
            this.medicalHistories = this.medicalPage.content
            this.total = this.medicalPage.totalElements
        })
    }
    //todo gde je od - do na beku????
    getPrescriptions(): void {
        this.patientService.getPrescriptions(this.lbp, this.page, this.pageSize).subscribe(
        response => {
            this.prescriptionPage = response
            this.prescriptionHistories = this.prescriptionPage.content
            this.total = this.prescriptionPage.totalElements
        })
    }

    getLabaratory(): void {
        this.labaratoryService.workOrdersHistory(this.lbp, this.dateFromLabaratory, this.dateToLabaratory, this.page-1, this.pageSize).subscribe(
        response => {
            this.labWorkOrderPage = response
            this.labWorkOrders = this.labWorkOrderPage.content
            this.total = this.labWorkOrderPage.totalElements
        })
    }
  //todo sta ovdde, koja ruta sa bekenda??
    getLabaratoryObradjeni(): void {}

    deletePrescription(id: number): void {
        //todo dodaj da dugme nije klikalibno ako nije isti doktor koji je kreirao uput
        this.patientService.deletePerscription(id).subscribe(response => {})
    }

    getObradjeni(): void {
        this.obradjeni = true
    }

    getNeobradjeni(): void {
        this.obradjeni = false
        //todo i da se popuni lista
    }

    onTableDataChange(event: any): void {
        this.page = event;
        if(this.diagnosis != '') {
            this.getMedicalHistoryByDiagnosisCode();
        }
        if(this.correctDate != ''){
            this.getExaminationHistoryWithDate()
        }else if(this.dateFrom != '' && this.dateTo != ''){
            this.getExaminationHistoryWithRange()
        }else{
            this.getExaminationHistory()
        }
    }

    onRowClick(prescription: Prescription): void {
        this.idPrescription = prescription.id
        //todo ako nije realizovan?
        if(prescription.status == PrescriptionStatus.NEREALIZOVAN){
            this.delete = true
        }
        if(this.id == prescription.doctorId){
            this.doctor = true
        }
    }

  //todo SREDI PAGINACIJU

}
