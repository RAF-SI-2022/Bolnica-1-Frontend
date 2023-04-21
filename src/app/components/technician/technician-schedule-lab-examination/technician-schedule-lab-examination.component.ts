import {Component, OnInit} from '@angular/core';
import {ScheduledLabExamination} from "../../../models/laboratory/ScheduledLabExamination";
import {PatientService} from "../../../services/patient-service/patient.service";
import {Page} from "../../../models/models";
import {Patient} from "../../../models/patient/Patient";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Prescription} from "../../../models/laboratory/Prescription";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {ExaminationStatus} from "../../../models/laboratory-enums/ExaminationStatus";
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-technician-schedule-lab-examination',
  templateUrl: './technician-schedule-lab-examination.component.html',
  styleUrls: ['./technician-schedule-lab-examination.component.css']
})
export class TechnicianScheduleLabExaminationComponent implements OnInit {

    // Pagination properites
    page = 0
    pageSize = 5
    total = 0
    patientPage: Page<Patient> = new Page<Patient>()
    rawLabaratoryPage: Page<Prescription> = new Page<Prescription>()
    scheduledLabExaminationPage: Page<ScheduledLabExamination> = new Page<ScheduledLabExamination>()

    patientList: Patient[] = []
    public selectedPatient: string = '';
    searchForm: FormGroup
    searchVisitForm: FormGroup
    countForm: FormGroup
    noteForm: FormGroup
    rawLabararatoryPrescriptions: Prescription [] = []
    scheduledLabExaminations: ScheduledLabExamination [] = []
    public numberOfScheduled: number = 0
    lbp: string = ''
    date: Date = new Date()
    dateSearch = new Date()
    note: string = ''
    errorMessage: string = ''
    successMessage: string = ''
    prescriptionPage: Page<Prescription> = new Page<Prescription>()
    prescriptionList: Prescription[] = []



  constructor( private formBuilder: FormBuilder, private labaratoryService: LaboratoryService) {
        this.searchForm = this.formBuilder.group({
            name: ['', [Validators.required]]
        });

        this.countForm = this.formBuilder.group({
            date: ['', [Validators.required]],
        numberOfScheduled: ['', [Validators.required]],
        });

        this.noteForm = this.formBuilder.group({
            note: ''
        });

        this.searchVisitForm = this.formBuilder.group({
            name: '',
            date: ' '
        });
      }


    ngOnInit(): void {
        this.getPatientList()
       // this.listScheduledEexaminations()
    }

    getPatientList(){
      this.labaratoryService.getPatients(this.page, this.pageSize)
        .subscribe((response) => {
          this.patientPage = response
          this.patientList = this.patientPage.content
        })
    }

    countPatientByDay(){
        this.labaratoryService.listScheduledExaminationsByDay(this.countForm.get('date')?.value).subscribe((response) => {
            this.numberOfScheduled = response
        })
    }

    examinationCreate(){
        this.lbp = this.searchForm.get('name')?.value
        this.date = this.countForm.get('date')?.value
        this.note = this.noteForm.get('note')?.value

        this.labaratoryService.createScheduledExamination(this.lbp, this.date, this.note) .subscribe((response) => {
            this.errorMessage = '';
            this.successMessage = 'Uspesno dodat pregled!'
        }, error => {
            console.log("Error " + error.status);
            if(error.status == 409){
                this.errorMessage = 'greska';
            }
        })
    }

    //nerealizovani uputi
    findExaminations() {
      this.lbp = this.searchForm.get('name')?.value

      if(this.page == 0)
        this.page = 1;

      // @ts-ignore
      this.labaratoryService.getdPrescriptionsForPatientNotRealized(this.lbp, this.page-1, this.pageSize)
        .subscribe((response) => {
          this.rawLabaratoryPage = response
          this.rawLabararatoryPrescriptions = this.rawLabaratoryPage.content
          this.total = this.rawLabaratoryPage.totalElements

        })
    }

    //todo da dodaju na beku @RequestParam za datum i pacijenta
    listScheduledEexaminations(){
        if(this.page == 0){
          this.page = 1
        }

        this.lbp = this.searchVisitForm.get('name')?.value
        this.dateSearch = this.searchVisitForm.get('date')?.value

        if(this.searchVisitForm.get('date')?.value == ''){
          this.dateSearch = new Date()
        }
        this.labaratoryService.listScheduledEexaminationsByLbp(this.lbp, new Date(), this.page, this.pageSize).subscribe((response) => {
            this.scheduledLabExaminationPage = response
            this.scheduledLabExaminations = this.scheduledLabExaminationPage.content
            this.total = this.scheduledLabExaminationPage.totalElements
        })

    }
    //todo fali ruta na beku za otkazivanje pregleda
    cancelExamination(idPregleda: number){
    }

    checkStatus(exam: ScheduledLabExamination): boolean{
        if(exam.examinationStatus == ExaminationStatus.ZAKAZANO){
            return true
        }
        return false
    }

    onTableDataChange(event: any): void {
        this.page = event;
        //ili ????? ger Examination
        this.getPatientList();
    }


    onSearch(searchText: string) {
      this.patientList = this.patientList.filter(patient => patient.lbp.toLowerCase().includes(searchText.toLowerCase()));
    }

}
