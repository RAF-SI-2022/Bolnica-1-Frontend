import { Component, OnInit } from '@angular/core';
import { ExaminationService } from "../../../services/examination-service/examination.service";
import { PatientService } from "../../../services/patient-service/patient.service";
import { ExamForPatient } from "../../../models/patient/ExamForPatient";
import { ScheduleExam } from "../../../models/patient/ScheduleExam";
import { UserService } from "../../../services/user-service/user.service";
import { Page } from "../../../models/models";
import { PatientArrival } from "../../../models/laboratory-enums/PatientArrival";
import { forkJoin, interval } from "rxjs";
import { DoctorDepartmentDto } from "../../../models/DoctorDepartmentDto";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';

@Component({
  selector: 'app-nurse-workspace',
  templateUrl: './nurse-workspace.component.html',
  styleUrls: ['./nurse-workspace.component.css']
})
export class NurseWorkspaceComponent implements OnInit {
  patientArrivals = Object.values(PatientArrival).filter(value => typeof value === 'string');

  selectedStatus: PatientArrival
  activeStatus: string = ''
  lbz: string = '';
  scheduledExams: ScheduleExam[] = [];
  patients: ExamForPatient[] = [];
  doctorLbz: string = '';
  nurseDepartmentPbo: string = '';
  doctors: DoctorDepartmentDto[] = [];
  selectedDoctor: DoctorDepartmentDto = new DoctorDepartmentDto();

  page = 0
  pageSize = 99999999 // infinity
  total = 0
  schedulePage: Page<ScheduleExam> = new Page<ScheduleExam>()

  trenutno: PatientArrival = PatientArrival.TRENUTNO;
  zakazano: PatientArrival = PatientArrival.ZAKAZANO;
  zavrseno: PatientArrival = PatientArrival.ZAVRSENO;
  otkazano: PatientArrival = PatientArrival.OTKAZANO;
  ceka: PatientArrival = PatientArrival.CEKA;

  constructor(private examinationService: ExaminationService,
    private patientService: PatientService,
    private snackBar: SnackbarServiceService,
    private userService: UserService) {
    this.selectedStatus = PatientArrival.ZAKAZANO;


  }

  ngOnInit(): void {
    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ');
    console.log(this.lbz)


    // this.getDoctors();
    // this.userService.findDepartmentByLbz(this.lbz).subscribe(res=>{
    //   console.log(res)
    // })

    // this.getDoctors();
    //nterval(5000).subscribe(() => {
      this.updateData();
//    });
  }

  updateData(){
    this.getNurseDepartment();
  }
  searchExams(): void {
    this.doctorLbz = this.selectedDoctor.lbz;
    console.log("izabrani doktor je " + this.doctorLbz)
    if(this.doctorLbz.length == 0){
      this.snackBar.openErrorSnackBar("Izaberite doktora")
    }
    else
      this.getSheduledExams();
  }

  getNurseDepartment(): void {

    this.userService.getEmployee(this.lbz).subscribe(res => { },
      err => {
        if (err.status == 302) { // found!
          this.nurseDepartmentPbo = err.error.department.pbo;
          console.log("department " + this.nurseDepartmentPbo)
          this.getDoctors()
        }
      })
  }

  getDoctors(): void {
    this.examinationService.getDoctorsByDepartment(this.nurseDepartmentPbo).subscribe(res => {
      this.doctors = res
      console.log(this.doctors)
    })
  }

  // getDoctors(): void {
  //   this.userService.findDepartmentByLbz(this.lbz).pipe(
  //     switchMap((res) => {
  //       this.nurseDepartmentPbo = res;
  //       return this.examinationService.getDoctorsByDepartment(this.nurseDepartmentPbo);
  //     })
  //   ).subscribe((res) => {
  //     this.doctors = res;
  //   });
  // }



  getSheduledExams(): void {

    this.patients = []

    // this.examinationService.getScheduledExaminationsPagedNurse(this.page, this.pageSize).subscribe((response) => {
    //   this.schedulePage = response
    //   this.scheduledExams = this.schedulePage.content
    //   this.total = this.schedulePage.totalElements



    //   this.scheduledExams.forEach(exam => {
    //     this.patientService.getPatientByLbp(exam.lbp).subscribe(patient => {



    //       const examForPatient: ExamForPatient = {
    //         id: exam.id,
    //         lbp: exam.lbp,
    //         name: patient.name,
    //         surname: patient.surname,
    //         dateOfBirth: patient.dateOfBirth,
    //         gender: patient.gender,
    //         patientArrival: exam.patientArrival,
    //         examDate: exam.dateAndTime
    //       };

    //       this.patients.push(examForPatient);

    //     });
    //   });

    // })

    // this.examinationService.getScheduledExaminations(this.doctorLbz, new Date())
    //   .subscribe(res =>{
    //     this.scheduledExams = res;


    //   });



    this.examinationService.getScheduledExaminationsPagedNurse(this.page, this.pageSize).subscribe((response) => {
      this.schedulePage = response
      this.scheduledExams = this.schedulePage.content
      this.total = this.schedulePage.totalElements



      const patientObservables = this.scheduledExams.map(exam => {
        return this.patientService.getPatientByLbp(exam.lbp);
      });
      console.log("Usaoo " + response.content)
      forkJoin(patientObservables).subscribe(patients => {
        patients.forEach((patient, i) => {
          // Svi pacijenti su kod E0006 a nemamo tog doktora
          console.log("moj " + this.scheduledExams[i].doctorLbz + " I " + this.doctorLbz)
          if (this.scheduledExams[i].lbz == this.doctorLbz) {

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
            console.log("radim fork join " + examForPatient.lbp)
            this.patients.push(examForPatient);
          }
        });
        if(this.patients.length == 0){
          this.snackBar.openWarningSnackBar("Nema pacijenata")
        }
        // sort patients array by examDate
        this.patients.sort((a, b) => {
          return new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
        });

      });
    });

  }

  changeStatus(patient: ExamForPatient) {

    if (!confirm('Da li ste sigurni da želite da izmenite status?')) {
      return;
    }

    console.log("arrival " + patient.patientArrival)
    console.log(patient.id);

    // if(this.selectedStatus ==0 ){
    //   this.examinationService.updatePatientStatus(patient.id, PatientArrival.ZAKAZANO).subscribe({
    //   })
    // }
    // if(this.selectedStatus == 1){
    //   this.examinationService.updatePatientStatus(patient.id, PatientArrival.OTKAZANO).subscribe({
    //   })
    // } if(this.selectedStatus == 2){
    //   this.examinationService.updatePatientStatus(patient.id, PatientArrival.CEKA).subscribe({
    //   })
    // }
    // if(this.selectedStatus == 3){
    //   this.examinationService.updatePatientStatus(patient.id, PatientArrival.TRENUTNO).subscribe({
    //   })
    // }
    // if(this.selectedStatus == 4){
    //   this.examinationService.updatePatientStatus(patient.id, PatientArrival.ZAVRSENO).subscribe({
    //   })
    // }

    this.examinationService.updatePatientStatus(patient.id, patient.patientArrival).subscribe(res => {
      console.log(res)
      this.snackBar.openSuccessSnackBar("Uspesno!")
    }, err => {
      this.snackBar.openErrorSnackBar("Greska!")
    })

    console.log("status " + this.selectedStatus)
    console.log("id " + patient.id)


    this.getSheduledExams();
  }


  // promeniStatus(status: string){
  //   if(status == "Ceka"){
  //     this.activeStatus = "Ceka"
  //   }
  //   if(status == "Trenutno"){
  //     this.activeStatus = "Trenutno"
  //   }
  //   if(status == "Otkazano"){
  //     this.activeStatus = "Otkazano"
  //   }
  //   if(status == "Zavrseno"){
  //     this.activeStatus = "Zavrseno"
  //   }
  // }


}
