import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-statistics',
  templateUrl: './nurse-covid-statistics.component.html',
  styleUrls: ['./nurse-covid-statistics.component.css']
})
export class NurseCovidStatisticsComponent  implements OnInit {

  numberOfTestedPatients : string;
  numberOfHospitalizedPatients : string;
  numberOfPositivePatients : string;
  numberOfCuredPatients : string;
  numberOfPatientsOnRespirator : string;
  numberOfDeadPatients : string;

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
