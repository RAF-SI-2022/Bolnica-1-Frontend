import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-schedule-admission',
  templateUrl: './nurse-covid-schedule-admission.component.html',
  styleUrls: ['./nurse-covid-schedule-admission.component.css']
})
export class NurseCovidScheduleAdmissionComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
