import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-patient-admission',
  templateUrl: './nurse-covid-patient-admission.component.html',
  styleUrls: ['./nurse-covid-patient-admission.component.css']
})
export class NurseCovidPatientAdmissionComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
