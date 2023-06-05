import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CovidExamDto} from "../../../../models/covid/CovidExamDto";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {AuthService} from "../../../../services/auth.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {Page} from "../../../../models/models";
import {DoctorDepartmentDto} from "../../../../models/DoctorDepartmentDto";
import {ExaminationService} from "../../../../services/examination-service/examination.service";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import {CovidExaminationType} from "../../../../models/covid-enums/CovidExaminationType";

@Component({
  selector: 'app-nurse-covid-ambulance',
  templateUrl: './nurse-covid-ambulance.component.html',
  styleUrls: ['./nurse-covid-ambulance.component.css']
})
export class NurseCovidAmbulanceComponent  implements OnInit {

  form: FormGroup;

  page: number = 0
  size: number = 99999999 //infinity
  total: number = 0
  covidExamsPage: Page<CovidExamDto> = new Page<CovidExamDto>()
  covidExams: CovidExamDto[] = []

  nurseDepartmentPbo: string = '';
  doctors: DoctorDepartmentDto[] = [];

  covidExaminationTypes = Object.values(CovidExaminationType).filter(value => typeof value === 'string');

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private covidService: CovidServiceService,
              private authService: AuthService,
              private snackBar: SnackbarServiceService,
              private examinationService: ExaminationService) {

    this.form = this.formBuilder.group({
      textLBP: ['', [Validators.required]],
      examType: ['', [Validators.required]],
      doctorLbz: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.nurseDepartmentPbo = this.authService.getPBO();

    this.getCovidExams();
    this.getDoctors();
  }

  getDoctors(): void {
    this.examinationService.getDoctorsByDepartment(this.nurseDepartmentPbo).subscribe(res => {
      this.doctors = res
    })
  }


  getCovidExams(): void {
    this.covidService.getCovidExaminationForNurse(this.page, this.size).subscribe(
      res => {
        this.covidExamsPage = res
        this.covidExams = this.covidExamsPage.content

        this.total = this.covidExamsPage.totalElements
        if (this.covidExams.length == 0) {
          this.snackBar.openWarningSnackBar("Nema pregleda!")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska!")
      }
    )
  }

  addExamination(): void {

    if (this.form.invalid) {
      this.snackBar.openWarningSnackBar("Popunite sva polja!");
      return;
    }

    const sendData = this.form.value;

    this.covidService.createCovidExam(new Date(), PatientArrival.CEKA, sendData.examType,
      sendData.doctorLbz, sendData.textLBP).subscribe(
      res => {
        this.getCovidExams();
        this.snackBar.openWarningSnackBar("Uspesno sacuvano!");

      }, err => {
        this.snackBar.openErrorSnackBar("Greska!")
      }
    )
  }

}
