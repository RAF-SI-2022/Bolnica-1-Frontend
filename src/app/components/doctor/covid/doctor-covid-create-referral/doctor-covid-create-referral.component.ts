import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-create-referral',
  templateUrl: './doctor-covid-create-referral.component.html',
  styleUrls: ['./doctor-covid-create-referral.component.css']
})
export class DoctorCovidCreateReferralComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
