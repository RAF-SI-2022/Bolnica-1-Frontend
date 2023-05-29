import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-statistics',
  templateUrl: './doctor-covid-statistics.component.html',
  styleUrls: ['./doctor-covid-statistics.component.css']
})
export class DoctorCovidStatisticsComponent  implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }

}
