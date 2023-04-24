import { Component, OnInit } from '@angular/core';
import { Patient } from "../../../models/patient/Patient";
import { PatientService } from "../../../services/patient-service/patient.service";
import { FormBuilder } from "@angular/forms";
import { ExaminationService } from "../../../services/examination-service/examination.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Page } from "../../../models/models";
import { ScheduleExam } from "../../../models/patient/ScheduleExam";
import { ExamForPatient } from "../../../models/patient/ExamForPatient";
import { PatientArrival } from "../../../models/laboratory-enums/PatientArrival";
import { forkJoin, interval, switchMap } from "rxjs";

@Component({
  selector: 'app-doctor-workspace',
  templateUrl: './doctor-workspace.component.html',
  styleUrls: ['./doctor-workspace.component.css']
})
export class DoctorWorkspaceComponent implements OnInit {

  public patients: Patient[] = [];
  patientPage: Page<Patient> = new Page<Patient>()

  patientArrivals = Object.values(PatientArrival).filter(value => typeof value === 'string');

  isPopupVisible = false;
  lbz: string = '';
  scheduledExams: ScheduleExam[] = [];
  patients2: ExamForPatient[] = [];

  page = 0
  pageSize = 99999999 //infinity
  total = 0
  schedulePage: Page<ScheduleExam> = new Page<ScheduleExam>()

  trenutno: PatientArrival = PatientArrival.TRENUTNO;
  zakazano: PatientArrival = PatientArrival.ZAKAZANO;
  zavrseno: PatientArrival = PatientArrival.ZAVRSENO;
  otkazano: PatientArrival = PatientArrival.OTKAZANO;
  ceka: PatientArrival = PatientArrival.CEKA;


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
    private examinationService: ExaminationService, private router: Router) { }

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
    // // [TODO] Temporary values for getAllPatients parameters
    // this.patientService.getAllPatients('', '', '', '', 0, 5).subscribe((response) => {
    //     this.patientPage = response
    //     this.patients = this.patientPage.content
    //     this.total = this.patientPage.totalElements
    // })

    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ');

    console.log(this.lbz)
    this.getSheduledExams();

    interval(5000).subscribe(() => {
      this.getSheduledExams();
      });
    //setInterval(this.getSheduledExams, 5000);
  }

  // getPatients(): void {
  //     // [TODO] Temporary values for getAllPatients parameters
  //     this.patientService.getAllPatients('', '', '', '', 0, 5).subscribe((response) => {
  //         this.patientPage = response
  //         this.patients = this.patientPage.content
  //         this.total = this.patientPage.totalElements
  //     })
  // }

  getSheduledExams(): void {

    this.patients2 = []

    this.examinationService.getScheduledExaminationByDoctor(
      this.lbz
    ).subscribe(res => {
      console.log("usao sam u metodu")
      console.log(res)
      this.scheduledExams = res;


      const patientObservables = this.scheduledExams.map(exam => {
        return this.patientService.getPatientByLbp(exam.lbp);
      });

      forkJoin(patientObservables).subscribe(patients => {
        patients.forEach((patient, i) => {
          const examForPatient: ExamForPatient = {

            id: this.scheduledExams[i].id,
            lbp: this.scheduledExams[i].lbp,
            name: patient.name,
            surname: patient.surname,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            patientArrival: this.scheduledExams[i].patientArrival,
            examDate: this.scheduledExams[i].dateAndTime
          };

          console.log(examForPatient.patientArrival)
          console.log()
          console.log("radim fork join")

          const today = new Date();
          const examDate = new Date(examForPatient.examDate);

          if (
            examDate.getDate() === today.getDate() &&
            examDate.getMonth() === today.getMonth() &&
            examDate.getFullYear() === today.getFullYear()
          ) {
            this.patients2.push(examForPatient);
            // examDate is today
          }



        });

        // sort patients array by examDate
        this.patients2.sort((a, b) => {
          return new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
        });


        /* this.scheduledExams.forEach(exam => {
           this.patientService.getPatientByLbp(exam.lbp).subscribe(patient => {

             const examForPatient: ExamForPatient = {
               id: exam.id,
               lbp: exam.lbp,
               name: patient.name,
               surname: patient.surname,
               dateOfBirth: patient.dateOfBirth,
               gender: patient.gender,
               patientArrival: exam.patientArrival,
               examDate: exam.dateAndTime
             };

             console.log("exam")


             const today = new Date();
             const examDate = new Date(exam.dateAndTime);

             if (
               examDate.getDate() === today.getDate() &&
               examDate.getMonth() === today.getMonth() &&
               examDate.getFullYear() === today.getFullYear()
             ) {
               this.patients2.push(examForPatient);
               // examDate is today
             }

             });

           });*/
      });
    });
  }



  // startExam(patient: Patient) {
  //   if (confirm(`Da li ste sigurni da zelite da započnete pregled pacijenta ${patient.name + ' ' +  patient.surname}?`)){
  //     this.router.navigate(['doctor-workspace-one', patient.lbp]);
  //   }
  // }

  startExam(patient: ExamForPatient): void {

    // if (!confirm('Da li ste sigurni da želite da započnete pregled?')) {
    //   return;
    // }

    console.log("id workspace " + patient.id)


    this.examinationService.updatePatientStatus(patient.id, PatientArrival.TRENUTNO).pipe(
      switchMap(res => {
        console.log(res);
        return this.patientService.getPatientByLbp(patient.lbp);
      })
    ).subscribe(res => {
      console.log("NANANANANANANANANNANANANANA" + patient.name);
      //this.router.navigate(['doctor-workspace-one', lbp])
      // const encodedUser = encodeURIComponent(JSON.stringify(patient));

      const url = `/doctor-workspace-one/${patient.lbp}`;
      this.router.navigateByUrl(url, { state: { patient } });
    });

  }

  // goToChart(examForPatient: ExamForPatient): void {
  //   const url = `/doctor-medical-chart/${examForPatient.lbp}`;
  //   this.router.navigateByUrl(url, { state: { examForPatient } });
  //   // this.router.navigate(['doctor-medical-chart', patient.lbp])
  // }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ZAKAZANO':
        return 'badge-primary';
      case 'OTKAZANO':
        return 'badge-warning';
      case 'CEKA':
        return 'badge-info';
      case 'TRENUTNO':
        return 'badge-success';
      case 'ZAVRSENO':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }
  



}
