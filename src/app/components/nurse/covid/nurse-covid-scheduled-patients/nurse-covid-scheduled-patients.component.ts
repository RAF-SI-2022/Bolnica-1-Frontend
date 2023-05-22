import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-scheduled-patients',
  templateUrl: './nurse-covid-scheduled-patients.component.html',
  styleUrls: ['./nurse-covid-scheduled-patients.component.css']
})
export class NurseCovidScheduledPatientsComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
