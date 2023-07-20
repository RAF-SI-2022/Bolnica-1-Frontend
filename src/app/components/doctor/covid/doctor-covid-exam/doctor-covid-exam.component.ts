import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ExamForPatient} from "../../../../models/patient/ExamForPatient";
import {SharedService} from "../../../../services/shared.service";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {AuthService} from "../../../../services/auth.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {CovidExamDto} from "../../../../models/covid/CovidExamDto";
import {PatientService} from "../../../../services/patient-service/patient.service";
import {GeneralMedicalData} from "../../../../models/patient/GeneralMedicalData";
import {Vaccination} from "../../../../models/patient/Vaccination";
import {Allergy} from "../../../../models/patient/Allergy";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import {switchMap} from "rxjs";
import {ExaminationService} from "../../../../services/examination-service/examination.service";


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
  initialFormValues: any;

  generalMedical: GeneralMedicalData;
  vaccinationsList: Vaccination[] = [];
  allergiesList: Allergy[] = [];

  currentCovidExam: ExamForPatient;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              private covidService: CovidServiceService,
              private authService: AuthService,
              private snackBar: SnackbarServiceService,
              private patientService: PatientService,
              private examinationService: ExaminationService) {

    this.currentCovidExam = history.state.patient;

    this.examForm = this.formBuilder.group({
      symptoms: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      bodyTemperature: ['', [Validators.required]],
      bloodPressure: ['', [Validators.required]],
      saturation: ['', [Validators.required]],
      lungCondition: ['', [Validators.required]],
      therapy: ['', [Validators.required]],
    });

    this.generalMedical = {
      id: 0,
      bloodType: '',
      rh: '',
      vaccinationDtos: [],
      allergyDtos: []
    };

  }

  ngOnInit(): void {
    this.patientLBP = <string> this.route.snapshot.paramMap.get('lbp')
    this.getPatientData();
    this.examId = this.currentCovidExam.id
    this.lbz = this.authService.getLBZ();
    this.updateData();
    this.initialFormValues = this.examForm.getRawValue();

    this.getGeneralMedicalData(this.patientLBP);

  }

  getGeneralMedicalData(lbp: string): void {
    this.patientService.getGeneralMedicalDataByLbp(lbp).subscribe(result => {
      if (!result) {
        this.generalMedical.vaccinationDtos = []
        this.generalMedical.allergyDtos = []

      } else {
        this.generalMedical = result
        this.vaccinationsList = result.vaccinationDtos
        this.allergiesList = result.allergyDtos
      }
    })
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
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    if (!this.validateFields()) {
      this.snackBar.openWarningSnackBar("Popunite sva polja!")
      return;
    }

    const sendData = this.examForm.value;

    this.patientService.createCovidExaminationHistory(
      new Date(),
      this.lbz,
      this.generalMedical.id,
      this.patientLBP,

      sendData.symptoms,
      sendData.duration,
      sendData.bodyTemperature,
      sendData.bloodPressure,
      sendData.saturation,
      sendData.lungCondition,
      sendData.therapy

    ).subscribe(res=> {

      this.examForm.reset();

      // Update form controls with initial values
      Object.keys(this.examForm.controls).forEach((controlName) => {
        const control = this.examForm.get(controlName);
        const initialValue = this.initialFormValues[controlName];
        // @ts-ignore
        control.setValue(initialValue);
        // @ts-ignore
        control.markAsPristine();
        // @ts-ignore
        control.markAsUntouched(); // Dodajte ovu liniju
        // @ts-ignore
        control.updateValueAndValidity();

      });

      form.classList.remove('was-validated');

      this.examinationService.updatePatientStatus(this.currentCovidExam.id, PatientArrival.ZAVRSENO)
        .subscribe(res => {
          this.snackBar.openSuccessSnackBar("Uspesno sacuvano!")
        }, err => {
          this.snackBar.openErrorSnackBar("Nije sacuvano!")
        })
    })


  }

  gotoone(): void {
    const url = `/doctor-workspace`;
    this.router.navigateByUrl(url);
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

  goToMedicalRecord(): void {
    this.saveFormData();
    this.router.navigate(['doctor-medical-chart', this.patientLBP]);
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
