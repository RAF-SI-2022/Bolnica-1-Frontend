import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";

@Component({
  selector: 'app-nurse-covid-statistics',
  templateUrl: './nurse-covid-statistics.component.html',
  styleUrls: ['./nurse-covid-statistics.component.css']
})
export class NurseCovidStatisticsComponent  implements OnInit {

  numberOfTestedPatients : number;
  numberOfHospitalizedPatients : number;
  numberOfPositivePatients : number;
  numberOfCuredPatients : number;
  numberOfPatientsOnRespirator : number;
  numberOfDeadPatients : number;

  todayDate: Date = new Date();

  constructor(private router: Router,
              private covidService: CovidServiceService,
              private snackBar: SnackbarServiceService) {

    this.numberOfTestedPatients = 0;
    this.numberOfHospitalizedPatients = 0;
    this.numberOfPositivePatients = 0;
    this.numberOfCuredPatients = 0;
    this.numberOfPatientsOnRespirator = 0;
    this.numberOfDeadPatients = 0;

  }

  ngOnInit(): void {
    this.fillData();
  }

  fillData(): void{
    this.covidService.getStats(new Date()).subscribe(res=>{
      this.numberOfTestedPatients = res.numberOfTestedPatients;
      this.numberOfHospitalizedPatients = res.numberOfHospitalizedPatients;
      this.numberOfPositivePatients = res.numberOfPositivePatients;
      this.numberOfCuredPatients = res.numberOfCuredPatients;
      this.numberOfPatientsOnRespirator = res.numberOfPatientsOnRespirator;
      this.numberOfDeadPatients = res.numberOfDeadPatients;
    },err => {
      this,this.snackBar.openErrorSnackBar("Greska!")
    })
  }

}
