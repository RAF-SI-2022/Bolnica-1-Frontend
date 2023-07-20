import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/patient/Patient";
import {Page} from "../../../../models/models";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import {ScheduleExam} from "../../../../models/patient/ScheduleExam";
import {ExamForPatient} from "../../../../models/patient/ExamForPatient";
import {forkJoin, interval, Subscription, switchMap} from "rxjs";
import {PatientService} from "../../../../services/patient-service/patient.service";
import {FormBuilder} from "@angular/forms";
import {ExaminationService} from "../../../../services/examination-service/examination.service";
import {Router} from "@angular/router";
import {HospitalizationDto} from "../../../../models/infirmary/HospitalizationDto";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {ScheduledVaccinationDto} from "../../../../models/vaccination/ScheduledVaccinationDto";
import {UserService} from "../../../../services/user-service/user.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-nurse-daily-vaccination',
  templateUrl: './nurse-daily-vaccination.component.html',
  styleUrls: ['./nurse-daily-vaccination.component.css']
})
export class NurseDailyVaccinationComponent implements OnInit{


  scheduledVaccinationList: ScheduledVaccinationDto[] = [];
  scheduledVaccinationDtoPage: Page<ScheduledVaccinationDto> = new Page<ScheduledVaccinationDto>();

  size: number = 100;
  page: number = 0;
  total: number = 0;


  patientArrivals = Object.values(PatientArrival).filter(value => typeof value === 'string');

  isPopupVisible = false;
  lbz: string = '';


  trenutno: PatientArrival = PatientArrival.TRENUTNO;
  zakazano: PatientArrival = PatientArrival.ZAKAZANO;
  zavrseno: PatientArrival = PatientArrival.ZAVRSENO;
  otkazano: PatientArrival = PatientArrival.OTKAZANO;
  ceka: PatientArrival = PatientArrival.CEKA;

  intervalSubscription: Subscription | undefined;

  covidBoolean: boolean = false;


  constructor(private patientService: PatientService,
              private formBuilder: FormBuilder,
              private examinationService: ExaminationService,
              private router: Router,
              private snackBar: SnackbarServiceService,
              private userService: UserService,
              private authService: AuthService) {

  }



  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.covidBoolean = this.authService.isCovid()



    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ');
    // this.checkCovid()

    console.log(this.lbz)
    this.getScheduledVaccinations();

    this.intervalSubscription = interval(5000).subscribe(() => {
      this.getScheduledVaccinations();
    });

  }

  getScheduledVaccinations():void{
    this.patientService.findScheduledVaccinationsWithFilter(
      this.page,
      this.size,
      new Date(),
      new Date(),
      '-1',
      this.lbz,
      this.covidBoolean,
      'SVEJEDNO'

    ).subscribe(res=>{
      this.scheduledVaccinationDtoPage = res;
      this.scheduledVaccinationList = this.scheduledVaccinationDtoPage.content;
      this.total = this.scheduledVaccinationDtoPage.totalElements
      if (this.scheduledVaccinationList.length == 0) {
        this.snackBar.openWarningSnackBar("Nema zakazanih vakcinacija")
      }

      this.scheduledVaccinationList.sort((a, b) => {
        return new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime();
      });

    }, err => {
      this.snackBar.openErrorSnackBar("Greska")
    }

    )
  }


  startVaccination(vaccine: ScheduledVaccinationDto): void {

    console.log("id workspace " + vaccine.id)

    this.patientService.updateScheduledVaccination(vaccine.id, PatientArrival.TRENUTNO)
      .subscribe(res => {
      const url = `/nurse-vaccination-admission/${vaccine.id}`;
      this.router.navigateByUrl(url, { state: { vaccine } });

    });


  }

  checkCovid() {
    let lbz = this.lbz
    this.userService.findDepartmentByLbz(lbz!).subscribe(
      res => {
        this.userService.getDepartmentDto(res).subscribe(
          res2 =>{
            if(res2.name == "Covid"){
              this.covidBoolean = true;
            }else{
              this.covidBoolean = false;
            }
          }
        );
      }
    );
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
