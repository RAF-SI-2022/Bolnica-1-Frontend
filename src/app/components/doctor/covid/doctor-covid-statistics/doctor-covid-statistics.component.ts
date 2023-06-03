import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-statistics',
  templateUrl: './doctor-covid-statistics.component.html',
  styleUrls: ['./doctor-covid-statistics.component.css']
})
export class DoctorCovidStatisticsComponent  implements OnInit {

  numberOfTestedPatients : string;
  numberOfHospitalizedPatients : string;
  numberOfPositivePatients : string;
  numberOfCuredPatients : string;
  numberOfPatientsOnRespirator : string;
  numberOfDeadPatients : string;

  todayDate: Date = new Date();

  constructor(private router: Router) {

    this.numberOfTestedPatients = "";
    this.numberOfHospitalizedPatients = "";
    this.numberOfPositivePatients = "";
    this.numberOfCuredPatients = "";
    this.numberOfPatientsOnRespirator = "";
    this.numberOfDeadPatients = "";

  }

  ngOnInit(): void {
    console.log("radi")
  }

}
