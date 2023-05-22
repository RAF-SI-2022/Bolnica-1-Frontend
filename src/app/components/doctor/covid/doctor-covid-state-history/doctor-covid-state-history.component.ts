import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-state-history',
  templateUrl: './doctor-covid-state-history.component.html',
  styleUrls: ['./doctor-covid-state-history.component.css']
})
export class DoctorCovidStateHistoryComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
