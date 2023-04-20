import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

import {OrderStatus} from "../../../models/laboratory-enums/OrderStatus";

import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {PrescriptionServiceService} from "../../../services/prescription-service/prescription-service.service";
import {PrescriptionDoneDto} from "../../../models/prescription/PrescriptionDoneDto";


@Component({
  selector: 'app-doctor-medical-chart',
  templateUrl: './doctor-medical-chart.component.html',
  styleUrls: ['./doctor-medical-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    prescriptionHistories: PrescriptionDoneDto [] = []
    labaratoryHistories: LabAnalysis [] = []
    labWorkOrders: LabWorkOrderNew [] = []
    allergies: Allergy [] = []
    vaccines: Vaccination [] = []
    public checkStatus: OrderStatus = OrderStatus.OBRADJEN;
    public showDetailsBoolean: boolean = false;

    detailsLabWorkOrders: LabWorkOrderWithAnalysis = new LabWorkOrderWithAnalysis();
    medicalPage: Page<MedicalHistory> = new Page<MedicalHistory>()
    prescriptionPage: Page<PrescriptionDoneDto> = new Page<PrescriptionDoneDto>()
    labWorkOrderPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>()
    detailsLabWorkOrderPage: Page<LabWorkOrderWithAnalysis> = new Page<LabWorkOrderWithAnalysis>()

    examinationPage: Page<ExaminationHistory> = new Page<ExaminationHistory>()
    vaccinationsList: Vaccination [] = []
    allergiesList: Allergy [] = []
    patientName: string = ''
    pageExamination = 0;
    pageMedical = 0;
    pagePrescription = 0;
    pageLaboratory = 0;
    pageSize = 5
    totalExamination:number = 0
    totalMedicalHistory: number = 0;
    totalPrescription: number = 0
    totalLaboratory: number = 0
    generalMedical: GeneralMedicalData

    constructor(private changeDetectorRef: ChangeDetectorRef, private formBuilder: FormBuilder, private patientService: PatientService, private prescriptionService: PrescriptionServiceService, private route: ActivatedRoute, private labaratoryService: LaboratoryService) {
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
      this.patientService.getExaminationHistoryByRange(this.lbp, new Date(0), new Date(), this.pageExamination, this.pageSize).subscribe(
        response => {
          this.examinationPage = response
          this.examinationHistories = this.examinationPage.content
           this.totalExamination = this.examinationPage.totalElements
          this.changeDetectorRef.detectChanges();
        })


      this.patientService.getMedicalHistoryByLbpPaged(this.lbp, this.pageMedical, this.pageSize).subscribe(
        response => {
          this.medicalPage = response
          this.medicalHistories = this.medicalPage.content
          this.totalMedicalHistory = this.medicalPage.totalElements
          this.changeDetectorRef.detectChanges();

        })
      //za istoriju uputa
      this.prescriptionService.getPrescriptions(this.lbz, new Date(0), new Date(), this.lbp, this.pagePrescription, this.pageSize).subscribe(
        response => {
          this.prescriptionPage = response
          this.prescriptionHistories = this.prescriptionPage.content
          this.totalPrescription = this.prescriptionPage.totalElements
          this.changeDetectorRef.detectChanges();

        })
     // ovo je za labaratorijske izvestaje
      this.labaratoryService.workOrdersHistory(this.lbp, new Date(0), new Date(), this.pageLaboratory, this.pageSize).subscribe(
        response => {
          this.labWorkOrderPage = response
          this.labWorkOrders = this.labWorkOrderPage.content
          this.totalLaboratory = this.labWorkOrderPage.totalElements
          this.changeDetectorRef.detectChanges();

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
        this.changeDetectorRef.detectChanges();

      })
    }

    saveGeneralMedical(): void {
        this.patientService.createMedicalData(
          this.lbp,this.generalForm.get('bloodGroup')?.value,this.generalForm.get('rhFactor')?.value,
          this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(result => {
          this.generalForm.get('bloodGroup')?.disable()
          this.generalForm.get('rhFactor')?.disable()
        });
    }

    saveAllergy(): void {
        this.patientService.addAllergy(this.lbp, this.allergyForm.get('allergen')?.value).subscribe(result => {
          this.getGeneralMedical(this.lbp)
        })
    }

  getAllergy(): void {
    this.patientService.getAllergy().subscribe(result => {
      this.allergies = result;
      this.changeDetectorRef.detectChanges();
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
        this.changeDetectorRef.detectChanges();
      }, err => {});
    }

    getExaminationHistoryChoose(): void {
        if(this.correctDate != ''){
            this.getExaminationHistoryWithDate()
        }else if(this.dateFrom != '' && this.dateTo != ''){
            this.getExaminationHistoryWithRange()
        }else{

          if(this.pageExamination == 0)
            this.pageExamination = 1;

          this.patientService.getExaminationHistoryByRange(this.lbp, new Date(0), new Date(), this.pageExamination-1, this.pageSize).subscribe(
            response => {
              this.examinationPage = response
              this.examinationHistories = this.examinationPage.content
              this.totalExamination = this.examinationPage.totalElements
              this.changeDetectorRef.detectChanges();

            })
        }
    }
  //ISTORIJA PREGLEDA ZA JEDAN DATUM

    getExaminationHistoryWithDate(): void {
      this.dateFrom = ''
      this.dateTo = ''

      console.log("Istorija pregleda jedan datum")
      if(this.pageExamination == 0)
        this.pageExamination = 1;

            this.patientService.getExaminationHistoryByDate(this.lbp,this.examinationForm.get('correctDate')?.value,this.pageExamination-1, this.pageSize).subscribe(
                response => {
                    this.examinationPage = response
                    this.examinationHistories = this.examinationPage.content
                    this.totalExamination = this.examinationPage.totalElements
                    this.changeDetectorRef.detectChanges();

                })
        }

    //ISTORIJA PREGLEDA SA OD DO
    getExaminationHistoryWithRange(): void {
      this.correctDate = ''

      console.log("Istorija pregleda dva datuma")
      if(this.pageExamination == 0)
        this.pageExamination = 1;

        this.patientService.getExaminationHistoryByRange(this.lbp, this.examinationForm.get('dateFrom')?.value, this.examinationForm.get('dateTo')?.value, this.pageExamination-1, this.pageSize).subscribe(
        response => {
            this.examinationPage = response
            this.examinationHistories = this.examinationPage.content
            this.totalExamination = this.examinationPage.totalElements
            this.changeDetectorRef.detectChanges();


        })

    }
  //TAB ISTORIJA BOLESTI
    getMedicalHistoryByDiagnosisCode(): void {
      if (this.pageMedical == 0)
        this.pageMedical = 1;

      if (this.diagnosis != '') {
        this.patientService.getMedicalHistoriesByDiagnosisCodePaged(this.lbp, this.diagnosis, this.pageMedical-1, this.pageSize).subscribe(
          response => {
            this.medicalPage = response
            this.medicalHistories = this.medicalPage.content
           this.totalMedicalHistory = this.medicalPage.totalElements
            this.changeDetectorRef.detectChanges();

          })
      }else{
        this.patientService.getMedicalHistoryByLbpPaged(this.lbp, this.pageMedical-1, this.pageSize).subscribe(
          response => {
            this.medicalPage = response
            this.medicalHistories = this.medicalPage.content
            this.totalMedicalHistory = this.medicalPage.totalElements
            this.changeDetectorRef.detectChanges();


          })
      }
    }
    //TAB ISTORIJA UPUTA, PRESCRIPTION JE UPUT!
    getPrescriptions(): void {
      if(this.pagePrescription == 0)
        this.pagePrescription = 1;

        this.prescriptionService.getPrescriptions(this.lbz, this.dateFromPrescription, this.dateToPrescription, this.lbp, this.pagePrescription-1, this.pageSize).subscribe(
        response => {
            this.prescriptionPage = response
            this.prescriptionHistories = this.prescriptionPage.content
            this.totalPrescription = this.prescriptionPage.totalElements
            this.changeDetectorRef.detectChanges();

        })
    }

    getLabaratory(): void {
      if(this.pageLaboratory == 0)
        this.pageLaboratory = 1;

        this.labaratoryService.workOrdersHistory(this.lbp, this.dateFromLabaratory, this.dateToLabaratory, this.pageLaboratory-1, this.pageSize).subscribe(
        response => {
            this.labWorkOrderPage = response
            this.labWorkOrders = this.labWorkOrderPage.content
            this.totalLaboratory = this.labWorkOrderPage.totalElements
            this.changeDetectorRef.detectChanges();

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



    //
    onTableDataChangeMedicalHistory(event: any): void {
      this.pageMedical = event;
      this.getMedicalHistoryByDiagnosisCode();
     }
    //
     onTableDataChangeExamination(event: any): void {
       this.pageExamination = event;
       this.getExaminationHistoryChoose();

    }

    onTableDataChangePrescription(event: any): void {
      this.pagePrescription = event;
      this.getPrescriptions();
       }

    onTableDataChangeLab(event: any): void {
      this.pageLaboratory = event;
      this.getLabaratory();
    }

    onRowClick(prescription: PrescriptionDoneDto): void {
        this.idPrescription = prescription.id

        // if(prescription.status == PrescriptionStatus.NEREALIZOVAN){
        //     this.delete = true
        // }
        // if(this.id == prescription.doctorId){
        //     this.doctor = true
        //   // @ts-ignore
        //   this.prescriptionForm.get('deleteButton').enable()
        // }
    }

    showDetails(lab: LabWorkOrderNew){
    this.showDetailsBoolean = true;

      this.labaratoryService.findAnalysisParametersResults(lab).subscribe(
        response => {
          this.detailsLabWorkOrders = response;
        })
    }

  onRowClickExamination(examinationHistory: ExaminationHistory): void {
      this.idExaminationHistory = 0
      this.idExaminationHistory = examinationHistory.id
  }


}
