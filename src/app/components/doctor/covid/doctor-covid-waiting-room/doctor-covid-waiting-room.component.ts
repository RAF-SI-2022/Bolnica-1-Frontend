import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {AuthService} from "../../../../services/auth.service";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import {interval, Subscription, switchMap} from "rxjs";
import {CovidExamDto} from "../../../../models/covid/CovidExamDto";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {ExamForPatient} from "../../../../models/patient/ExamForPatient";

@Component({
  selector: 'app-doctor-covid-waiting-room',
  templateUrl: './doctor-covid-waiting-room.component.html',
  styleUrls: ['./doctor-covid-waiting-room.component.css']
})
export class DoctorCovidWaitingRoomComponent  implements OnInit {

  lbz: string = "";
  covidExams: CovidExamDto[] = []

  patientArrivals = Object.values(PatientArrival).filter(value => typeof value === 'string');

  intervalSubscription: Subscription | undefined;

  constructor(private router: Router,
              private covidService: CovidServiceService,
              private authService: AuthService,
              private snackBar: SnackbarServiceService) {
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.lbz = this.authService.getLBZ();

    this.getCovidExams();

    this.intervalSubscription = interval(5000).subscribe(() => {
      this.getCovidExams();
    });
  }

  getCovidExams(): void {
    this.covidService.getCovidExaminationByDoctor(this.lbz).subscribe(res => {
      this.covidExams = res;
      if (this.covidExams.length == 0)
        this.snackBar.openWarningSnackBar("Nema pregleda");
    }, err => {
      this, this.snackBar.openErrorSnackBar("Greska!")
    })
  }

  startExam(covidExam: CovidExamDto): void {

    this.covidService.updatePatientStatus(covidExam.id, PatientArrival.TRENUTNO)
      .subscribe(res => {
        const url = `/doctor-covid-exam/${covidExam.lbp}`;
        this.router.navigateByUrl(url, {state: {covidExam}});

      });

  }

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
