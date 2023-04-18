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
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";

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
    public idExaminationHistory: number = 0
    public dateFrom: string = ''
    public dateTo: string = ''
    public correctDate: string = ''
    public correctDateLabaratory: string = ''

    public diagnosis: string = ''
    public dateToPrescription: Date = new Date()
    public dateFromPrescription:Date = new Date()
    public dateToLabaratory: Date = new Date()
    public dateFromLabaratory: Date = new Date()
    medicalHistories: MedicalHistory [] = []
    examinationHistories: ExaminationHistory [] = []
    prescriptionHistories: Prescription [] = []
    labaratoryHistories: LabAnalysis [] = []
    labWorkOrders: LabWorkOrderNew [] = []
    allergies: Allergy [] = []
    vaccines: Vaccination [] = []

  //todo kojom rutom ovo popunjavam ??
    detailsLabWorkOrders: LabWorkOrderWithAnalysis [] = []
    medicalPage: Page<MedicalHistory> = new Page<MedicalHistory>()
    prescriptionPage: Page<Prescription> = new Page<Prescription>()
    labWorkOrderPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>()
    detailsLabWorkOrderPage: Page<LabWorkOrderWithAnalysis> = new Page<LabWorkOrderWithAnalysis>()

    examinationPage: Page<ExaminationHistory> = new Page<ExaminationHistory>()
    vaccinationsList: Vaccination [] = []
    allergiesList: Allergy [] = []
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
            deleteButton: '',
        })
        this.labaratoryForm = this.formBuilder.group({
            dateFrom: '',
            dateTo: '',
        })
    }

    ngOnInit(): void {
      this.prescriptionForm.get('deleteButton')?.disable()
      this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
        // @ts-ignore
        this.lbz  = localStorage.getItem('LBZ')
        // @ts-ignore
        this.idStr = localStorage.getItem('ID')
        this.id = this.idStr ? parseInt(this.idStr) : this.defaultId;
        this.generalForm.get('bloodGroup')?.disable()
        this.generalForm.get('rhFactor')?.disable()
        this.getGeneralMedical(this.lbp)

      //OVO JE ZA ISTORIJU PREGLEDA cim se ucita
      this.patientService.getExaminationHistoryByRange(this.lbp, new Date(0), new Date(), this.page, this.pageSize).subscribe(
        response => {
          this.examinationPage = response
          this.examinationHistories = this.examinationPage.content
          this.total = this.examinationPage.totalElements
        })
        //za istoriju bolesti cim se ucita
      console.log("LALALALALALALA" + this.diagnosis)
      this.patientService.getMedicalHistoryByLbpPaged(this.lbp, this.page, this.pageSize).subscribe(
        response => {
          this.medicalPage = response
          this.medicalHistories = this.medicalPage.content
          this.total = this.medicalPage.totalElements

        })
      //za istoriju uputa
      this.patientService.getPrescriptions(this.dateFromPrescription, this.dateToPrescription, this.lbp, this.page, this.pageSize).subscribe(
        response => {
          this.prescriptionPage = response
          this.prescriptionHistories = this.prescriptionPage.content
          this.total = this.prescriptionPage.totalElements
        })
     // ovo je za labaratorijske izvestaje
      this.labaratoryService.workOrdersHistory(this.lbp, this.dateFromLabaratory, this.dateToLabaratory, this.page, this.pageSize).subscribe(
        response => {
          this.labWorkOrderPage = response
          this.labWorkOrders = this.labWorkOrderPage.content
          this.total = this.labWorkOrderPage.totalElements
        })
        this.getAllergy()
        this.getVaccine()

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
            this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe();
    }

    saveAllergy(): void {

        this.patientService.addAllergy(this.lbp, this.allergyForm.get('allergen')?.value).subscribe(result => {
          this.getGeneralMedical(this.lbp)
        })
    }

  getAllergy(): void {
    this.patientService.getAllergy().subscribe(result => {
      this.allergies = result;
    }, err => {});
  }

    saveVaccine(): void {
        this.patientService.addVacine(this.lbp, this.vaccineForm.get('vaccine')?.value, this.vaccineForm.get('dateOfReceiving')?.value).subscribe(result => {
          this.getGeneralMedical(this.lbp)

        });
    }

    getVaccine(): void {
      this.patientService.getVaccine().subscribe(result => {
        this.vaccines = result;
      }, err => {});
    }


    getExaminationHistoryChoose(): void {
        if(this.correctDate != ''){
            this.getExaminationHistoryWithDate()
        }else{
            this.getExaminationHistoryWithRange()
        }
    }
  //ISTORIJA PREGLEDA ZA JEDAN DATUM

    getExaminationHistoryWithDate(): void {
            console.log("Istorija pregleda jedan datum")
      if(this.page == 0)
        this.page = 1;
            this.patientService.getExaminationHistoryByDate(this.lbp,this.examinationForm.get('correctDate')?.value,this.page-1, this.pageSize).subscribe(
                response => {
                    this.examinationPage = response
                    this.examinationHistories = this.examinationPage.content
                    this.total = this.examinationPage.totalElements
                })
            this.correctDate = ''
    }
    //ISTORIJA PREGLEDA SA OD DO
    getExaminationHistoryWithRange(): void {
        console.log("Istorija pregleda dva datuma")
      if(this.page == 0)
        this.page = 1;

        this.patientService.getExaminationHistoryByRange(this.lbp, this.examinationForm.get('dateFrom')?.value, this.examinationForm.get('dateTo')?.value, this.page-1, this.pageSize).subscribe(
        response => {
            this.examinationPage = response
            this.examinationHistories = this.examinationPage.content
            this.total = this.examinationPage.totalElements
        })
        this.dateFrom = ''
        this.dateTo = ''
    }
  //TAB ISTORIJA BOLESTI
    getMedicalHistoryByDiagnosisCode(): void {
      if(this.page == 0)
        this.page = 1;

        this.patientService.getMedicalHistoriesByDiagnosisCodePaged(this.lbp, this.diagnosis, this.page-1, this.pageSize).subscribe(
        response => {
            this.medicalPage = response
            this.medicalHistories = this.medicalPage.content
            this.total = this.medicalPage.totalElements
        })
    }
    //TAB ISTORIJA UPUTA, PRESCRIPTION JE UPUT!
    getPrescriptions(): void {
      if(this.page == 0)
        this.page = 1;

        this.patientService.getPrescriptions(this.dateFromPrescription, this.dateToPrescription, this.lbp, this.page-1, this.pageSize).subscribe(
        response => {
            this.prescriptionPage = response
            this.prescriptionHistories = this.prescriptionPage.content
            this.total = this.prescriptionPage.totalElements
        })
    }

    getLabaratory(): void {
      if(this.page == 0)
        this.page = 1;

        this.labaratoryService.workOrdersHistory(this.lbp, this.dateFromLabaratory, this.dateToLabaratory, this.page-1, this.pageSize).subscribe(
        response => {
            this.labWorkOrderPage = response
            this.labWorkOrders = this.labWorkOrderPage.content
            this.total = this.labWorkOrderPage.totalElements
        })
    }
  //todo sta ovdde, koja ruta sa bekenda??
    getLabaratoryObradjeni(): void {

    }

    deletePrescription(id: number): void {

        this.patientService.deletePerscription(id).subscribe(response => {
          console.log("USPESNO OBRISAN")
        })
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
      if (this.diagnosis != '') {
        this.getMedicalHistoryByDiagnosisCode();
      }
      if (this.correctDate != '') {
        this.getExaminationHistoryWithDate()
      } else if (this.dateFrom != '' && this.dateTo != '') {
        this.getExaminationHistoryWithRange()
      }

    }

    onRowClick(prescription: Prescription): void {
        this.idPrescription = prescription.id

        if(prescription.status == PrescriptionStatus.NEREALIZOVAN){
            this.delete = true
        }
        if(this.id == prescription.doctorId){
            this.doctor = true
          // @ts-ignore
          this.prescriptionForm.get('deleteButton').enable()
        }
    }

  onRowClickExamination(examinationHistory: ExaminationHistory): void {
      this.idExaminationHistory = examinationHistory.id
  }


}
