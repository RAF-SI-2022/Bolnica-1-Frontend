import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-medical-record',
  templateUrl: './doctor-covid-medical-record.component.html',
  styleUrls: ['./doctor-covid-medical-record.component.css']
})
export class DoctorCovidMedicalRecordComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
