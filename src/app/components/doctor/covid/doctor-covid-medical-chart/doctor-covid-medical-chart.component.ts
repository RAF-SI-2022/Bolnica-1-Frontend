import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-medical-chart',
  templateUrl: './doctor-covid-medical-chart.component.html',
  styleUrls: ['./doctor-covid-medical-chart.component.css']
})
export class DoctorCovidMedicalChartComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
