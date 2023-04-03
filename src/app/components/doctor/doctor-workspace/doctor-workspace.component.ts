import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {FormBuilder} from "@angular/forms";
import {ExaminationService} from "../../../services/examination-service/examination.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Page} from "../../../models/models";
import {ScheduleExam} from "../../../models/patient/ScheduleExam";
import {ExamForPatient} from "../../../models/patient/ExamForPatient";

@Component({
  selector: 'app-doctor-workspace',
  templateUrl: './doctor-workspace.component.html',
  styleUrls: ['./doctor-workspace.component.css']
})
export class DoctorWorkspaceComponent implements OnInit {

    public patients: Patient[] = [];
    patientPage: Page<Patient> = new Page<Patient>()
    total = 0
    isPopupVisible = false;
    lbz: string = '';
    scheduledExams : ScheduleExam[] = [];
    patients2: ExamForPatient[] = [];

    /*
    //popup se pojavljujem kliktajem na red
    selectedPerson: any;

    onTableRowClicked(event: any) {
        if (event.target.tagName === 'TD') {
        this.selectedPerson = event.target.parentElement.cells[0].textContent;
        this.isPopupVisible = true;
        }
    }
    */

    constructor(private patientService: PatientService, private formBuilder: FormBuilder,
        private examinationService: ExaminationService,  private router: Router) {}

    // showPopup(event: any): void {
    //     const row = event.target.closest('.table-row');
    //     this.isPopupVisible = true;
    // }
    //
    // hidePopup(): void {
    //     this.isPopupVisible = false;
    // }
    //
    // confirmPregled(): void {
    //     //otvori stranicu /doctor-workspace-one-patient
    //     //za selektovanog pacijenta
    //     this.router.navigate(['doctor-workspace-one']);
    // }


    ngOnInit(): void {
        // [TODO] Temporary values for getAllPatients parameters
        this.patientService.getAllPatients('', '', '', '', 0, 5).subscribe((response) => {
            this.patientPage = response
            this.patients = this.patientPage.content
            this.total = this.patientPage.totalElements
        })

        // @ts-ignore
        this.lbz = localStorage.getItem('lbz');
        this.getSheduledExams();
    }

    getPatients(): void {
        // [TODO] Temporary values for getAllPatients parameters
        this.patientService.getAllPatients('', '', '', '', 0, 5).subscribe((response) => {
            this.patientPage = response
            this.patients = this.patientPage.content
            this.total = this.patientPage.totalElements
        })
    }

    getSheduledExams(): void {
      this.examinationService.getScheduledExaminations(this.lbz, new Date())
        .subscribe(res =>{
        this.scheduledExams = res;

        this.scheduledExams.forEach(exam => {
          this.patientService.getPatientByLbp(exam.lbp).subscribe(patient => {

            const examForPatient: ExamForPatient = {
              lbp: exam.lbp,
              name: patient.name,
              surname: patient.surname,
              dateOfBirth: patient.dateOfBirth,
              gender: patient.gender,
              examinationStatus: exam.examinationStatus,
              examDate: exam.dateAndTime
            };

            this.patients2.push(examForPatient);

            });
          });
        });
    }

    startExam(patient: Patient) {
      if (confirm(`Da li ste sigurni da zelite da započnete pregled pacijenta ${patient.name + ' ' +  patient.surname}?`)){
        this.router.navigate(['doctor-workspace-one', patient.lbp]);
      }
    }
}
