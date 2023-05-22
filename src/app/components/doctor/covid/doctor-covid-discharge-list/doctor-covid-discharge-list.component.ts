import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-discharge-list',
  templateUrl: './doctor-covid-discharge-list.component.html',
  styleUrls: ['./doctor-covid-discharge-list.component.css']
})
export class DoctorCovidDischargeListComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
