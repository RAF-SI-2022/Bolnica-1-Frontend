import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-patients-covid',
  templateUrl: './doctor-patients-covid.component.html',
  styleUrls: ['./doctor-patients-covid.component.css']
})
export class DoctorPatientsCovidComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
