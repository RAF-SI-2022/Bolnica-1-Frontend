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
  lbp: string = ''
  public dateFrom: string = ''
  public dateTo: string = ''
  public correctDate: string = ''
  public diagnosis: string = ''
  medicalHistories: MedicalHistory [] = []
  examinationHistories: ExaminationHistory [] = []
  pomocni: string = ''
  medicalPage: Page<MedicalHistory> = new Page<MedicalHistory>()
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

  constructor(private formBuilder: FormBuilder, private patientService: PatientService,  private route: ActivatedRoute) {
    this.generalMedical = new GeneralMedicalData()
    this.allergy = new Allergy("")
    this.allergy2 = new Allergy("")

    this.vaccionation = new Vaccination("", "" , "" , "", new Date())
    this.vaccination_PRIORIX = new Vaccination("PRIORIX", "Virusne vakcine", "Vakcina protiv morbila (malih boginja)", "GlaxoSmithKline Biologicals S.A., Belgija", new Date())
    this.vaccination_HIBERIX = new Vaccination("HIBERIX", "Bakterijske vakcine", "Kapsulirani antigen hemofilus influence tip B", "GlaxoSmithKline Biologicals S.A., Belgija", new Date())
    this.vaccination_INFLUVAC = new Vaccination("INFLUVAC", "Virusne vakcine", "Virusne vakcine protiv influence (grip)", "Abbott Biologicals B.V., Holandija", new Date())
    this.vaccination_SYNFLORIX = new Vaccination("SYNFLORIX", "Bakterijske vakcine", "Vakcine protiv pneumokoka", "GlaxoSmithKline Biologicals S.A., Belgija", new Date())
    this.vaccination_BCGVAKCINA = new Vaccination("BCGVAKCINA", "Bakterijske vakcine", "Vakcine protiv tuberkuloze", "Institut za virusologiju, vakcine i serume \"Torlak\", Republika Srbija", new Date())


    this.generalForm = this.formBuilder.group(
      {
        bloodGroup: ['', [Validators.required]],
        rhFactor: ['', [Validators.required]]

      })

    this.allergyForm = this.formBuilder.group(
      {
        allergen: ['', [Validators.required]]
      }
      )

    this.vaccineForm = this.formBuilder.group(
      {
        vaccine: ['', [Validators.required]],
        dateOfReceiving: ['', [Validators.required]]
      }
    )

    this.examinationForm = this.formBuilder.group(
        {
          dateFrom: '',
          dateTo: '',
          correctDate: ''
        }
    )
    this.medicalForm = this.formBuilder.group(
        {
          diagnosis: ''
        }
    )
    }

  ngOnInit(): void {
    this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.generalForm.get('bloodGroup')?.disable()
    this.generalForm.get('rhFactor')?.disable()
    this.getGeneralMedical(this.lbp)
    this.getMedicalHistoryByDiagnosisCode()
    this.getExaminationHistory()


  }

  updateGeneral(): void {
    this.generalForm.get('bloodGroup')?.enable()
    this.generalForm.get('rhFactor')?.enable()
  }

  getGeneralMedical(lbp: string): void {
    this.patientService.getGeneralMedicalDataByLbp(lbp).subscribe(result => {
      this.generalMedical = result
      this.vaccinationsList = result.vaccinationDtos

      this.allergiesList  = result.allergyDtos
      }
    )
  }

  saveGeneralMedical(): void{
    this.patientService.createMedicalData(this.lbp,this.generalForm.get('bloodGroup')?.value,this.generalForm.get('rhFactor')?.value,
                                      this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(
                                        result => {})
  }
  saveAllergy(): void{
      this.allergy = new Allergy(this.allergyForm.get('allergen')?.value)
    this.generalMedical.allergyDtos.push(this.allergy)
    this.patientService.createMedicalData(this.lbp, this.generalMedical.bloodType,this.generalMedical.rh,
      this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(
      result => {})
  }
  saveVaccine(): void{
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
      this.generalMedical.vaccinationDtos, this.generalMedical.allergyDtos).subscribe(
      result => {})
  }

  getExaminationHistory(){
    this.patientService.getExaminationHistoryByLbp(this.lbp).subscribe(
      response => {
          console.log("Istorija pregleda")
        this.examinationPage = response
        this.examinationHistories = this.examinationPage.content
        this.total = this.examinationPage.totalElements
      })
  }

  getExaminationHistoryChoose(){
    if(this.correctDate != ''){
      this.getExaminationHistoryWithDate()
    }else{
      this.getExaminationHistoryWithRange()
    }
  }

  getExaminationHistoryWithDate(){
      console.log("Istorija pregleda jedan datum")

      this.patientService.getExaminationHistoryByDate(this.lbp, this.correctDate, this.page, this.pageSize).subscribe(
        response => {
          this.examinationPage = response
          this.examinationHistories = this.examinationPage.content
          this.total = this.examinationPage.totalElements
        })
      this.correctDate = ''
  }

  getExaminationHistoryWithRange(){
      console.log("Istorija pregleda dva datuma")

      this.patientService.getExaminationHistoryByRange(this.lbp, this.dateFrom, this.dateTo, this.page, this.pageSize).subscribe(
        response => {
          this.examinationPage = response
          this.examinationHistories = this.examinationPage.content
          this.total = this.examinationPage.totalElements
        })
      this.dateFrom = ''
      this.dateTo = ''
  }

  getMedicalHistoryByDiagnosisCode(){
    this.patientService.getMedicalHistoriesByDiagnosisCodePaged(this.lbp, this.diagnosis, this.page, this.pageSize).subscribe(
        response => {
          this.medicalPage = response
          this.medicalHistories = this.medicalPage.content
          this.total = this.medicalPage.totalElements
        })
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

  // getMedicalHistory(){
  //   this.patientService.getMedicalHistoryByLbp(this.lbp).subscribe(
  //     response => {
  //       this.historyPage = response
  //       this.medicalHistories = this.historyPage.content
  //       this.total = this.historyPage.totalElements
  //     })
  //
  // }

}
