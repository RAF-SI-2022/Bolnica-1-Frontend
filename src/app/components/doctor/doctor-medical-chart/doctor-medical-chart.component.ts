import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GeneralMedicalData } from "../../../models/patient/GeneralMedicalData";
import { PatientService } from "../../../services/patient-service/patient.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MedicalHistory } from "../../../models/patient/MedicalHistory";
import { Page } from "../../../models/models";
import { ExaminationHistory } from "../../../models/patient/ExaminationHistory";
import { Allergy } from "../../../models/patient/Allergy";
import { Vaccination } from "../../../models/patient/Vaccination";
import { LabAnalysis } from "../../../models/laboratory/LabAnalysis";
import { LaboratoryService } from "../../../services/laboratory-service/laboratory.service";
import { LabWorkOrderWithAnalysis } from "../../../models/laboratory/LabWorkOrderWithAnalysis";
import { PrescriptionStatus } from "../../../models/laboratory-enums/PrescriptionStatus";

import { OrderStatus } from "../../../models/laboratory-enums/OrderStatus";

import { LabWorkOrderNew } from "../../../models/laboratory/LabWorkOrderNew";
import { PrescriptionServiceService } from "../../../services/prescription-service/prescription-service.service";
import { PrescriptionDoneDto } from "../../../models/prescription/PrescriptionDoneDto";

import { ParameterAnalysisResultWithDetails } from "../../../models/laboratory/ParameterAnalysisResultWithDetails";

import { DiagnosisCodeDto } from 'src/app/models/patient/DiagnosisCode';
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { interval } from 'rxjs';
import {PrescriptionNewDto} from "../../../models/prescription/PrescriptionNewDto";



@Component({
  selector: 'app-doctor-medical-chart',
  templateUrl: './doctor-medical-chart.component.html',
  styleUrls: ['./doctor-medical-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorMedicalChartComponent implements OnInit {

  labWorkOrderWithAnalysis: LabWorkOrderWithAnalysis = new LabWorkOrderWithAnalysis();
  parameterAnalysisResults: ParameterAnalysisResultWithDetails[] = [];

  deleted: boolean = false
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
  public dateFromPrescription: Date = new Date()
  public dateToLabaratory: Date = new Date()
  public dateFromLabaratory: Date = new Date(this.dateToLabaratory.getFullYear(), 0, 1);
  medicalHistories: MedicalHistory[] = []
  examinationHistories: ExaminationHistory[] = []
  prescriptionHistories: PrescriptionDoneDto[] = []
  labaratoryHistories: LabAnalysis[] = []
  labWorkOrders: LabWorkOrderNew[] = []
  allergies: Allergy[] = []
  vaccines: Vaccination[] = []
  allDiagnosis: DiagnosisCodeDto[] = []
  public checkStatus: OrderStatus = OrderStatus.OBRADJEN;
  public checkStatusPrescription: PrescriptionStatus = PrescriptionStatus.NEREALIZOVAN;

  public showDetailsBoolean: boolean = false;

  // detailsLabWorkOrders: LabWorkOrderWithAnalysis = new LabWorkOrderWithAnalysis();

  medicalPage: Page<MedicalHistory> = new Page<MedicalHistory>()
  prescriptionPage: Page<PrescriptionDoneDto> = new Page<PrescriptionDoneDto>()
  labWorkOrderPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>()
  detailsLabWorkOrderPage: Page<LabWorkOrderWithAnalysis> = new Page<LabWorkOrderWithAnalysis>()

  examinationPage: Page<ExaminationHistory> = new Page<ExaminationHistory>()
  vaccinationsList: Vaccination[] = []
  allergiesList: Allergy[] = []
  patientName: string = ''
  pageExamination = 0;
  pageMedical = 0;
  pagePrescription = 0;
  pageLaboratory = 0;
  pageSize = 5
  totalExamination: number = 0
  totalMedicalHistory: number = 0;
  totalPrescription: number = 0
  totalLaboratory: number = 0
  generalMedical: GeneralMedicalData

  constructor(private router: Router,private changeDetectorRef: ChangeDetectorRef, private snackBar: SnackbarServiceService, private formBuilder: FormBuilder, private patientService: PatientService, private prescriptionService: PrescriptionServiceService, private route: ActivatedRoute, private labaratoryService: LaboratoryService) {
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
      dateFrom: [this.dateFromLabaratory.toISOString().slice(0,10), [Validators.required]],
      dateTo: [this.dateToLabaratory.toISOString().slice(0,10), [Validators.required]],
    })
  }

  ngOnInit(): void {
    //nterval(5000).subscribe(() => {
      this.updateData();
//    });

  }

  updateData(){
    this.prescriptionForm.get('deleteButton')?.disable()
    this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ')
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
    /*this.patientService.getPrescriptionsForDoctor(this.lbz, this.lbp, this.pagePrescription, this.pageSize).subscribe(
      res=>{
        this.prescriptionPage = res
        this.prescriptionHistories = this.prescriptionPage.content
        this.totalPrescription = this.prescriptionPage.totalElements
        this.changeDetectorRef.detectChanges();
      }
    )*/

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
    this.getDiagnosis()
  }

  updateGeneral(): void {
    this.generalForm.get('bloodGroup')?.enable()
    this.generalForm.get('rhFactor')?.enable()
  }

  getGeneralMedical(lbp: string): void {
    this.patientService.getGeneralMedicalDataByLbp(lbp).subscribe(result => {

      if (!result) {
        this.generalMedical.vaccinationDtos = []
        this.generalMedical.bloodType = ''
        this.generalMedical.rh = ''
        this.generalMedical.allergyDtos = []

      } else {
        this.generalMedical = result
        this.vaccinationsList = result.vaccinationDtos
        this.allergiesList = result.allergyDtos
      }
      this.changeDetectorRef.detectChanges();

    })
  }

  gotoone(): void {
    const url = `/doctor-workspace-one/${this.lbp}`;
    this.router.navigateByUrl(url);
  }

  saveGeneralMedical(): void {
    this.patientService.createMedicalData(
      this.lbp, this.generalForm.get('bloodGroup')?.value, this.generalForm.get('rhFactor')?.value,
      this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(result => {
        this.generalForm.get('bloodGroup')?.disable()
        this.generalForm.get('rhFactor')?.disable()
        this.snackBar.openSuccessSnackBar("Sacuvano!")
      }, err => {
        this.snackBar.openErrorSnackBar("Nije sacuvano")
      });
  }

  saveAllergy(): void {
    this.patientService.addAllergy(this.lbp, this.allergyForm.get('allergen')?.value).subscribe(result => {
      this.getGeneralMedical(this.lbp)
      this.snackBar.openSuccessSnackBar("Sacuvano!");
    }, err => {
      this.snackBar.openErrorSnackBar("Nije sacuvano")
    });
  }

  getAllergy(): void {
    this.patientService.getAllergy().subscribe(result => {
      this.allergies = result;
      this.changeDetectorRef.detectChanges();
    }, err => { });
  }

  saveVaccine(): void {
    this.patientService.addVacine(this.lbp, this.vaccineForm.get('vaccine')?.value, this.vaccineForm.get('dateOfReceiving')?.value).subscribe(result => {
      this.getGeneralMedical(this.lbp)
      this.snackBar.openSuccessSnackBar("Sacuvano!")
    },  err => {
      this.snackBar.openErrorSnackBar("Nije sacuvano")
    });
  }

  getVaccine(): void {
    this.patientService.getVaccine().subscribe(result => {
      this.vaccines = result;
      this.changeDetectorRef.detectChanges();
    }, err => { });
  }

  getDiagnosis(): void {
    this.patientService.getDiagnosis().subscribe(result => {
      this.allDiagnosis = result;
      console.log(this.allDiagnosis)
    })
  }

  getExaminationHistoryChoose(): void {
    if (this.correctDate != '') {
      this.getExaminationHistoryWithDate()
    } else if (this.dateFrom != '' && this.dateTo != '') {
      this.getExaminationHistoryWithRange()
    } else {

      if (this.pageExamination == 0)
        this.pageExamination = 1;

      this.patientService.getExaminationHistoryByRange(this.lbp, new Date(0), new Date(), this.pageExamination - 1, this.pageSize).subscribe(
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
    if (this.pageExamination == 0)
      this.pageExamination = 1;

    this.patientService.getExaminationHistoryByDate(this.lbp, this.examinationForm.get('correctDate')?.value, this.pageExamination - 1, this.pageSize).subscribe(
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
    if (this.pageExamination == 0)
      this.pageExamination = 1;

    this.patientService.getExaminationHistoryByRange(this.lbp, this.examinationForm.get('dateFrom')?.value, this.examinationForm.get('dateTo')?.value, this.pageExamination - 1, this.pageSize).subscribe(
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
      let tmpdiagnosis = this.diagnosis.split("-")[0].trim();
      this.patientService.getMedicalHistoriesByDiagnosisCodePaged(this.lbp, tmpdiagnosis, this.pageMedical - 1, this.pageSize).subscribe(
        response => {
          this.medicalPage = response
          this.medicalHistories = this.medicalPage.content
          this.totalMedicalHistory = this.medicalPage.totalElements
          this.changeDetectorRef.detectChanges();

        })
    } else {
      this.patientService.getMedicalHistoryByLbpPaged(this.lbp, this.pageMedical - 1, this.pageSize).subscribe(
        response => {
          this.medicalPage = response
          this.medicalHistories = this.medicalPage.content
          this.totalMedicalHistory = this.medicalPage.totalElements
          this.changeDetectorRef.detectChanges();


        })
    }
  }
  //TAB ISTORIJA UPUTA, PRESCRIPTION JE UPUT!
  /*getPrescriptions(): void {
    if (this.pagePrescription == 0)
      this.pagePrescription = 1;

    this.patientService.getPrescriptionsForDoctor(this.lbz, this.lbp, this.pagePrescription -1 , this.pageSize).subscribe(
      res=>{
        this.prescriptionPage = res
        this.prescriptionHistories = this.prescriptionPage.content
        this.totalPrescription = this.prescriptionPage.totalElements
        this.changeDetectorRef.detectChanges();
      }
    )
  }*/

  //TAB ISTORIJA UPUTA, PRESCRIPTION JE UPUT!
  getPrescriptions(): void {
    if(this.pagePrescription == 0)
      this.pagePrescription = 1;

    console.log("emica bebica")

    this.prescriptionService.getPrescriptions(this.lbz, this.dateFromPrescription, this.dateToPrescription, this.lbp, this.pagePrescription-1, this.pageSize).subscribe(
      response => {
        console.log("emica uput")
        this.prescriptionPage = response
        this.prescriptionHistories = this.prescriptionPage.content
        this.totalPrescription = this.prescriptionPage.totalElements
        this.changeDetectorRef.detectChanges();

      })
  }


  getLabaratory(): void {
    if (this.pageLaboratory == 0)
      this.pageLaboratory = 1;

    this.labaratoryService.workOrdersHistory(this.lbp, this.dateFromLabaratory, this.dateToLabaratory, this.pageLaboratory - 1, this.pageSize).subscribe(
      response => {
        this.labWorkOrderPage = response
        this.labWorkOrders = this.labWorkOrderPage.content
        this.totalLaboratory = this.labWorkOrderPage.totalElements
        this.changeDetectorRef.detectChanges();

      })
  }

  getLabWorkOrderWithAnalysis(workOrderId: number): void {

    this.labaratoryService.getLabWorkOrderWithAnalysis(workOrderId).subscribe(
      res => {

      }, err => {
        if (err.status == 302) { // found!
          this.labWorkOrderWithAnalysis = err.error; // Message recieved on error -> err.error to get message
          this.parameterAnalysisResults = this.labWorkOrderWithAnalysis.parameterAnalysisResults
          console.log("popunio sam")
          console.log(this.labWorkOrderWithAnalysis)
          this.showDetailsBoolean = true;

        }
      })

  }

  getLabaratoryObradjeni(): void {

  }

  deletePrescription(id: number): void {

    this.patientService.deletePerscription(id).subscribe(response => {
      console.log("USPESNO OBRISAN")
      this.snackBar.openSuccessSnackBar("Uspesno obrisano")
      this.getPrescriptions()
      this.deleted = true
    }, err => {
      this.snackBar.openErrorSnackBar("Nije obrisano")
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

  showDetails(lab: LabWorkOrderNew) {
    this.getLabWorkOrderWithAnalysis(lab.id);
  }

  closeDetails(): void {
    this.showDetailsBoolean = false
  }

  onRowClickExamination(examinationHistory: ExaminationHistory): void {
    this.idExaminationHistory = 0
    this.idExaminationHistory = examinationHistory.id
  }

  check(status: PrescriptionStatus): boolean {
    console.log("LALALALALALLALA " + status)
    if (status == PrescriptionStatus.NEREALIZOVAN) {
      console.log("USOOO")
      return true
    }
    return false
  }

  filteredDiagnosisCodes: DiagnosisCodeDto[] = [];

  filterDiagnosisCodes(searchText: string): void {
    if (this.allDiagnosis && this.allDiagnosis.length > 0 && searchText.length > 0) {
      this.filteredDiagnosisCodes = this.allDiagnosis.filter(
        (diagnosiss) =>
          (diagnosiss.code?.toString().toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (diagnosiss.description?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (diagnosiss.latinDescription?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    } else {
      this.filteredDiagnosisCodes = [];
    }
    console.log("Imam nas " + this.filterDiagnosisCodes.length)
  }

  selectSuggestion(suggestion: DiagnosisCodeDto): void {
    this.diagnosis = `${suggestion.code} - ${suggestion.description} (${suggestion.latinDescription})`;
    this.filteredDiagnosisCodes = [];
  }

  isInputFocused: boolean = false;

  onFocus(): void {
    this.isInputFocused = true;
  }

  onBlur(): void {
    setTimeout(() => {
      this.isInputFocused = false;
    }, 200); // Add a small delay to allow for click events to be registered
  }

}
