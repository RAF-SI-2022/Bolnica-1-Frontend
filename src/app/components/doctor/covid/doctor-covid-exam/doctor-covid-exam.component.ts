import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ExamForPatient} from "../../../../models/patient/ExamForPatient";
import {SharedService} from "../../../../services/shared.service";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {AuthService} from "../../../../services/auth.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {CovidExamDto} from "../../../../models/covid/CovidExamDto";
import {Patient} from "../../../../models/patient/Patient";
import {PatientService} from "../../../../services/patient-service/patient.service";


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

  lbz: string = ""
  examId: number = 0;

  currentCovidExam: CovidExamDto;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              private covidService: CovidServiceService,
              private authService: AuthService,
              private snackBar: SnackbarServiceService,
              private patientService: PatientService) {

    this.currentCovidExam = history.state.covidExam;

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
    this.getPatientData();
    this.examId = this.currentCovidExam.id
    this.lbz = this.authService.getLBZ();
    this.updateData();
  }

  updateData() {
    console.log("updateData()")

    this.restoreFormData();
  }

  getPatientData(): void{
    this.patientService.getPatientByLbp(this.patientLBP).subscribe(res=>{
      this.patientName = res.name
      this.patientSurname = res.surname
      this.patientDateOfBirth = res.dateOfBirth
    })
  }


  finishExamination(): void {

    if (!this.validateFields()) {
      this.snackBar.openWarningSnackBar("Popunite sva polja!")
      return;
    }

    const sendData = this.examForm.value;

    this.covidService.createCovidExaminationSummary(
      this.examId,
      this.patientLBP,
      new Date(),
      this.lbz,
      sendData.symptoms,
      sendData.duration,
      sendData.bodyTemperature,
      sendData.bloodPressure,
      sendData.saturation,
      sendData.lungCondition,
      sendData.therapy
    ).subscribe(res=>{

      this.snackBar.openSuccessSnackBar("Uspesno sacuvano!")
    },err => {
      this.snackBar.openErrorSnackBar("NIje sacuvano!")
    })


  }


  validateFields(): boolean {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      return false;
    }
    return true;
  }


  goToUput(): void {
    console.log("usao");
    console.log(this.patientLBP);
    this.saveFormData();
    this.router.navigate(['doctor-covid-create-referral', this.patientLBP]);
  }

  goToScheduleExam(): void {
    const url = `/doctor-schedule-exam/${this.patientLBP}`;
    this.router.navigateByUrl(url);
  }

  saveFormData() {
    this.sharedService.formData = { ...this.examForm.value };
    this.sharedService.lbp = this.patientLBP;
  }

  restoreFormData() {
    if (this.sharedService.formData && this.sharedService.lbp == this.patientLBP) {
      this.examForm.patchValue(this.sharedService.formData);
    }
  }

  disableFields() {
    this.examForm.disable();
  }

}
