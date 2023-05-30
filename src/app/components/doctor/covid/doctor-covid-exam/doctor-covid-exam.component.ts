import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ExamForPatient} from "../../../../models/patient/ExamForPatient";


@Component({
  selector: 'app-doctor-covid-exam',
  templateUrl: './doctor-covid-exam.component.html',
  styleUrls: ['./doctor-covid-exam.component.css']
})
export class DoctorCovidExamComponent  implements OnInit {

  examForm: FormGroup;

  /* Patient information */
  patientLBP: string = ""
  patientName: string = "Ime"
  patientSurname: string = "Prezime"
  patientDateOfBirth: Date = new Date();

  currentPatient: ExamForPatient;

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
  
    this.currentPatient = history.state.patient;

    this.examForm = this.formBuilder.group({
      symptoms: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      bodyTemperature: ['', [Validators.required]],
      bloodPressure: ['', [Validators.required]],
      saturation: ['', [Validators.required]],
      lungCondition: ['', [Validators.required]],
      therapy: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {

    this.patientLBP = <string> this.route.snapshot.paramMap.get('lbp')
    
    this.patientName = this.currentPatient.name
    this.patientSurname = this.currentPatient.surname
    this.patientDateOfBirth = this.currentPatient.dateOfBirth

    this.updateData();
  }

  updateData() {
    console.log("updateData()")
  }

  goToUput(): void {
    console.log("goToUput()")
  }

  goToScheduleExam(): void {
    console.log("goToScheduleExam()")
  }

  finishExamination(): void {
    const sendData = this.examForm.value;
    console.log(sendData)
  }

}
