import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CovidExamDto} from "../../../../models/covid/CovidExamDto";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {AuthService} from "../../../../services/auth.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {Page} from "../../../../models/models";
import {ScheduleExam} from "../../../../models/patient/ScheduleExam";

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

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private covidService: CovidServiceService,
              private authService: AuthService,
              private snackBar: SnackbarServiceService) {

    this.form = this.formBuilder.group({
      textLBP: ['', [Validators.required]],
      examinationType: ['Prvi', [Validators.required]],
      textDoctor: ['', [Validators.required]],
    });

  }

  // TODO KREIRANJE PREGLEDA

  ngOnInit(): void {
    this.getCovidExams()
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

    const sendData = this.form.value;
    console.log(sendData)
    // TODO: .
  }

}
