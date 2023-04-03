import {Component, OnInit} from '@angular/core';
import {ExaminationService} from "../../../services/examination-service/examination.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {ExamForPatient} from "../../../models/patient/ExamForPatient";
import {ScheduleExam} from "../../../models/patient/ScheduleExam";
import {UserService} from "../../../services/user-service/user.service";
import {Zaposleni} from "../../../models/models";
import {PatientExaminationStatus} from "../../../models/patient-enums/PatientExaminationStatus";

@Component({
  selector: 'app-nurse-workspace',
  templateUrl: './nurse-workspace.component.html',
  styleUrls: ['./nurse-workspace.component.css']
})
export class NurseWorkspaceComponent implements OnInit {

  activeStatus: string = ''
  lbz: string = '';
  scheduledExams : ScheduleExam[] = [];
  patients: ExamForPatient[] = [];
  doctorLbz: string = '';
  nurseDepartmentPbo: string = '';
  doctors: Zaposleni[] = [];
  selectedDoctor: Zaposleni = new Zaposleni();

  trenutno: PatientExaminationStatus = PatientExaminationStatus.TRENUTNO;
  zakazano: PatientExaminationStatus = PatientExaminationStatus.ZAKAZANO;
  zavrseno: PatientExaminationStatus = PatientExaminationStatus.ZAVRSENO;
  otkazano: PatientExaminationStatus = PatientExaminationStatus.OTKAZANO;
  ceka: PatientExaminationStatus = PatientExaminationStatus.CEKA;

  constructor(private examinationService: ExaminationService,
              private patientService: PatientService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.lbz = localStorage.getItem('lbz');

    this.getNurseDepartment();
    this.getDoctors();

  }

  searchExams():void{
    this.doctorLbz = this.selectedDoctor.lbz;
    this.getSheduledExams();
  }

  getNurseDepartment(): void{
    this.userService.getUser(this.lbz).subscribe(res=>{
      this.nurseDepartmentPbo = res.department.pbo;
    })
  }

  getDoctors():void{
    this.examinationService.getDoctorsByDepartment(this.nurseDepartmentPbo).subscribe(res=>{
      this.doctors = res;
    })
  }

  getSheduledExams(): void {

    this.examinationService.getScheduledExaminations(this.doctorLbz, new Date())
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

            this.patients.push(examForPatient);

          });
        });
      });
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
